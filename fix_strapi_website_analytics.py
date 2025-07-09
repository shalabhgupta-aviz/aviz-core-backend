#!/usr/bin/env python3
"""
Strapi Website Analytics Content-Type Fix Script
This script fixes the duplicate content-type issue for website-analytics in Strapi
"""

import subprocess
import psycopg2
import json
import os
import sys
import time

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'database': 'aviz_core_backend',
    'user': 'aviz_user',
    'password': 'dfiocnwp'
}

def run_command(command, cwd='/var/www/aviz-core-backend'):
    """Run a shell command and return the result"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, capture_output=True, text=True)
        print(f"Command: {command}")
        print(f"Return code: {result.returncode}")
        if result.stdout:
            print(f"Output: {result.stdout}")
        if result.stderr:
            print(f"Error: {result.stderr}")
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        print(f"Error running command {command}: {e}")
        return False, "", str(e)

def connect_to_db():
    """Connect to PostgreSQL database"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

def check_schema_conflicts(conn):
    """Check for website-analytics conflicts in the database schema"""
    try:
        cursor = conn.cursor()
        
        # Check strapi_database_schema for conflicts
        cursor.execute("""
            SELECT id, schema 
            FROM strapi_database_schema 
            WHERE schema::text LIKE '%website%' OR schema::text LIKE '%analytics%';
        """)
        
        conflicts = cursor.fetchall()
        cursor.close()
        
        return conflicts
    except Exception as e:
        print(f"Error checking schema conflicts: {e}")
        return []

def remove_schema_conflicts(conn, conflict_ids):
    """Remove conflicting schema entries"""
    try:
        cursor = conn.cursor()
        
        for conflict_id in conflict_ids:
            cursor.execute("DELETE FROM strapi_database_schema WHERE id = %s;", (conflict_id,))
            print(f"Removed schema conflict with ID: {conflict_id}")
        
        conn.commit()
        cursor.close()
        return True
    except Exception as e:
        print(f"Error removing schema conflicts: {e}")
        return False

def backup_content_type():
    """Backup the website-analytics content-type"""
    success, _, _ = run_command("cp -r src/api/website-analytics src/api/website-analytics-backup")
    return success

def remove_content_type():
    """Remove the website-analytics content-type"""
    success, _, _ = run_command("rm -rf src/api/website-analytics")
    return success

def restore_content_type():
    """Restore the website-analytics content-type"""
    success, _, _ = run_command("cp -r src/api/website-analytics-backup src/api/website-analytics")
    return success

def clear_cache():
    """Clear Strapi cache and build files"""
    success, _, _ = run_command("rm -rf .cache build node_modules/.cache")
    return success

def rebuild_strapi():
    """Rebuild Strapi"""
    success, _, _ = run_command("npm run build")
    return success

def stop_pm2():
    """Stop PM2 process"""
    success, _, _ = run_command("pm2 stop aviz-backend")
    return success

def start_pm2():
    """Start PM2 process"""
    success, _, _ = run_command("pm2 start aviz-backend")
    return success

def restart_pm2():
    """Restart PM2 process"""
    success, _, _ = run_command("pm2 restart aviz-backend")
    return success

def check_pm2_logs():
    """Check PM2 logs for errors"""
    success, logs, _ = run_command("pm2 logs aviz-backend --lines 20")
    return success, logs

def main():
    """Main function to fix the Strapi issue"""
    print("🚀 Starting Strapi Website Analytics Fix Script")
    print("=" * 50)
    
    # Step 1: Stop PM2
    print("\n📛 Step 1: Stopping PM2...")
    if not stop_pm2():
        print("❌ Failed to stop PM2")
        return
    
    # Step 2: Clear cache
    print("\n🧹 Step 2: Clearing cache...")
    if not clear_cache():
        print("❌ Failed to clear cache")
        return
    
    # Step 3: Connect to database
    print("\n🔌 Step 3: Connecting to database...")
    conn = connect_to_db()
    if not conn:
        print("❌ Failed to connect to database")
        return
    
    # Step 4: Check for schema conflicts
    print("\n🔍 Step 4: Checking for schema conflicts...")
    conflicts = check_schema_conflicts(conn)
    
    if conflicts:
        print(f"Found {len(conflicts)} schema conflicts:")
        for conflict in conflicts:
            print(f"  - ID: {conflict[0]}")
            print(f"    Schema: {conflict[1]}")
        
        # Step 5: Remove conflicts
        print("\n🗑️  Step 5: Removing schema conflicts...")
        conflict_ids = [conflict[0] for conflict in conflicts]
        if not remove_schema_conflicts(conn, conflict_ids):
            print("❌ Failed to remove schema conflicts")
            conn.close()
            return
    else:
        print("✅ No schema conflicts found")
    
    conn.close()
    
    # Step 6: Backup content-type
    print("\n💾 Step 6: Backing up content-type...")
    if not backup_content_type():
        print("❌ Failed to backup content-type")
        return
    
    # Step 7: Remove content-type temporarily
    print("\n🗑️  Step 7: Temporarily removing content-type...")
    if not remove_content_type():
        print("❌ Failed to remove content-type")
        return
    
    # Step 8: Rebuild Strapi
    print("\n🔨 Step 8: Rebuilding Strapi...")
    if not rebuild_strapi():
        print("❌ Failed to rebuild Strapi")
        return
    
    # Step 9: Start PM2
    print("\n▶️  Step 9: Starting PM2...")
    if not start_pm2():
        print("❌ Failed to start PM2")
        return
    
    # Step 10: Wait and check logs
    print("\n⏳ Step 10: Waiting for Strapi to start...")
    time.sleep(10)
    
    success, logs = check_pm2_logs()
    if "Error:" in logs or "ERROR" in logs:
        print("❌ Still seeing errors in logs")
        print(f"Logs: {logs}")
        return
    
    print("✅ Strapi started successfully without website-analytics")
    
    # Step 11: Restore content-type
    print("\n🔄 Step 11: Restoring content-type...")
    if not restore_content_type():
        print("❌ Failed to restore content-type")
        return
    
    # Step 12: Restart PM2
    print("\n🔄 Step 12: Restarting PM2...")
    if not restart_pm2():
        print("❌ Failed to restart PM2")
        return
    
    # Step 13: Final check
    print("\n🏁 Step 13: Final health check...")
    time.sleep(10)
    
    success, logs = check_pm2_logs()
    if "Error:" in logs or "ERROR" in logs:
        print("❌ Still seeing errors after restore")
        print(f"Logs: {logs}")
        
        # Rollback: remove the content-type again
        print("\n🔙 Rolling back: removing content-type again...")
        remove_content_type()
        restart_pm2()
        
        print("⚠️  Content-type removed. You may need to recreate it manually through Strapi admin.")
    else:
        print("🎉 SUCCESS! Strapi is running without errors!")
        print("✅ Website analytics content-type is working properly")
    
    # Cleanup backup
    run_command("rm -rf src/api/website-analytics-backup")
    
    print("\n🔗 Check your API at: https://api.aviznetworks.com")
    print("=" * 50)
    print("✅ Script completed!")

if __name__ == "__main__":
    # Check if running as root and in correct directory
    if os.geteuid() != 0:
        print("❌ This script must be run as root")
        sys.exit(1)
    
    if not os.path.exists('/var/www/aviz-core-backend'):
        print("❌ Strapi directory not found. Make sure you're on the correct server.")
        sys.exit(1)
    
    main()
EOFcat > fix_strapi_website_analytics.py << 'EOF'
#!/usr/bin/env python3
"""
Strapi Website Analytics Content-Type Fix Script
This script fixes the duplicate content-type issue for website-analytics in Strapi
"""

import subprocess
import psycopg2
import json
import os
import sys
import time

# Database configuration
DB_CONFIG = {
    'host': 'localhost',
    'database': 'aviz_core_backend',
    'user': 'aviz_user',
    'password': 'dfiocnwp'
}

def run_command(command, cwd='/var/www/aviz-core-backend'):
    """Run a shell command and return the result"""
    try:
        result = subprocess.run(command, shell=True, cwd=cwd, capture_output=True, text=True)
        print(f"Command: {command}")
        print(f"Return code: {result.returncode}")
        if result.stdout:
            print(f"Output: {result.stdout}")
        if result.stderr:
            print(f"Error: {result.stderr}")
        return result.returncode == 0, result.stdout, result.stderr
    except Exception as e:
        print(f"Error running command {command}: {e}")
        return False, "", str(e)

def connect_to_db():
    """Connect to PostgreSQL database"""
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        return conn
    except Exception as e:
        print(f"Error connecting to database: {e}")
        return None

def check_schema_conflicts(conn):
    """Check for website-analytics conflicts in the database schema"""
    try:
        cursor = conn.cursor()
        
        # Check strapi_database_schema for conflicts
        cursor.execute("""
            SELECT id, schema 
            FROM strapi_database_schema 
            WHERE schema::text LIKE '%website%' OR schema::text LIKE '%analytics%';
        """)
        
        conflicts = cursor.fetchall()
        cursor.close()
        
        return conflicts
    except Exception as e:
        print(f"Error checking schema conflicts: {e}")
        return []

def remove_schema_conflicts(conn, conflict_ids):
    """Remove conflicting schema entries"""
    try:
        cursor = conn.cursor()
        
        for conflict_id in conflict_ids:
            cursor.execute("DELETE FROM strapi_database_schema WHERE id = %s;", (conflict_id,))
            print(f"Removed schema conflict with ID: {conflict_id}")
        
        conn.commit()
        cursor.close()
        return True
    except Exception as e:
        print(f"Error removing schema conflicts: {e}")
        return False

def backup_content_type():
    """Backup the website-analytics content-type"""
    success, _, _ = run_command("cp -r src/api/website-analytics src/api/website-analytics-backup")
    return success

def remove_content_type():
    """Remove the website-analytics content-type"""
    success, _, _ = run_command("rm -rf src/api/website-analytics")
    return success

def restore_content_type():
    """Restore the website-analytics content-type"""
    success, _, _ = run_command("cp -r src/api/website-analytics-backup src/api/website-analytics")
    return success

def clear_cache():
    """Clear Strapi cache and build files"""
    success, _, _ = run_command("rm -rf .cache build node_modules/.cache")
    return success

def rebuild_strapi():
    """Rebuild Strapi"""
    success, _, _ = run_command("npm run build")
    return success

def stop_pm2():
    """Stop PM2 process"""
    success, _, _ = run_command("pm2 stop aviz-backend")
    return success

def start_pm2():
    """Start PM2 process"""
    success, _, _ = run_command("pm2 start aviz-backend")
    return success

def restart_pm2():
    """Restart PM2 process"""
    success, _, _ = run_command("pm2 restart aviz-backend")
    return success

def check_pm2_logs():
    """Check PM2 logs for errors"""
    success, logs, _ = run_command("pm2 logs aviz-backend --lines 20")
    return success, logs

def main():
    """Main function to fix the Strapi issue"""
    print("🚀 Starting Strapi Website Analytics Fix Script")
    print("=" * 50)
    
    # Step 1: Stop PM2
    print("\n📛 Step 1: Stopping PM2...")
    if not stop_pm2():
        print("❌ Failed to stop PM2")
        return
    
    # Step 2: Clear cache
    print("\n🧹 Step 2: Clearing cache...")
    if not clear_cache():
        print("❌ Failed to clear cache")
        return
    
    # Step 3: Connect to database
    print("\n🔌 Step 3: Connecting to database...")
    conn = connect_to_db()
    if not conn:
        print("❌ Failed to connect to database")
        return
    
    # Step 4: Check for schema conflicts
    print("\n🔍 Step 4: Checking for schema conflicts...")
    conflicts = check_schema_conflicts(conn)
    
    if conflicts:
        print(f"Found {len(conflicts)} schema conflicts:")
        for conflict in conflicts:
            print(f"  - ID: {conflict[0]}")
            print(f"    Schema: {conflict[1]}")
        
        # Step 5: Remove conflicts
        print("\n🗑️  Step 5: Removing schema conflicts...")
        conflict_ids = [conflict[0] for conflict in conflicts]
        if not remove_schema_conflicts(conn, conflict_ids):
            print("❌ Failed to remove schema conflicts")
            conn.close()
            return
    else:
        print("✅ No schema conflicts found")
    
    conn.close()
    
    # Step 6: Backup content-type
    print("\n💾 Step 6: Backing up content-type...")
    if not backup_content_type():
        print("❌ Failed to backup content-type")
        return
    
    # Step 7: Remove content-type temporarily
    print("\n🗑️  Step 7: Temporarily removing content-type...")
    if not remove_content_type():
        print("❌ Failed to remove content-type")
        return
    
    # Step 8: Rebuild Strapi
    print("\n🔨 Step 8: Rebuilding Strapi...")
    if not rebuild_strapi():
        print("❌ Failed to rebuild Strapi")
        return
    
    # Step 9: Start PM2
    print("\n▶️  Step 9: Starting PM2...")
    if not start_pm2():
        print("❌ Failed to start PM2")
        return
    
    # Step 10: Wait and check logs
    print("\n⏳ Step 10: Waiting for Strapi to start...")
    time.sleep(10)
    
    success, logs = check_pm2_logs()
    if "Error:" in logs or "ERROR" in logs:
        print("❌ Still seeing errors in logs")
        print(f"Logs: {logs}")
        return
    
    print("✅ Strapi started successfully without website-analytics")
    
    # Step 11: Restore content-type
    print("\n🔄 Step 11: Restoring content-type...")
    if not restore_content_type():
        print("❌ Failed to restore content-type")
        return
    
    # Step 12: Restart PM2
    print("\n🔄 Step 12: Restarting PM2...")
    if not restart_pm2():
        print("❌ Failed to restart PM2")
        return
    
    # Step 13: Final check
    print("\n🏁 Step 13: Final health check...")
    time.sleep(10)
    
    success, logs = check_pm2_logs()
    if "Error:" in logs or "ERROR" in logs:
        print("❌ Still seeing errors after restore")
        print(f"Logs: {logs}")
        
        # Rollback: remove the content-type again
        print("\n🔙 Rolling back: removing content-type again...")
        remove_content_type()
        restart_pm2()
        
        print("⚠️  Content-type removed. You may need to recreate it manually through Strapi admin.")
    else:
        print("🎉 SUCCESS! Strapi is running without errors!")
        print("✅ Website analytics content-type is working properly")
    
    # Cleanup backup
    run_command("rm -rf src/api/website-analytics-backup")
    
    print("\n🔗 Check your API at: https://api.aviznetworks.com")
    print("=" * 50)
    print("✅ Script completed!")

if __name__ == "__main__":
    # Check if running as root and in correct directory
    if os.geteuid() != 0:
        print("❌ This script must be run as root")
        sys.exit(1)
    
    if not os.path.exists('/var/www/aviz-core-backend'):
        print("❌ Strapi directory not found. Make sure you're on the correct server.")
        sys.exit(1)
    
    main()
