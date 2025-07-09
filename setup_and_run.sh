#!/bin/bash

echo "🚀 Strapi Fix Setup Script"
echo "=========================="

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ Please run as root"
    exit 1
fi

# Install required packages
echo "📦 Installing required packages..."
apt update
apt install -y python3 python3-pip postgresql-client

# Install Python dependencies
echo "🐍 Installing Python dependencies..."
pip3 install psycopg2-binary

# Make the Python script executable
chmod +x fix_strapi_website_analytics.py

# Run the fix script
echo "🔧 Running the fix script..."
python3 fix_strapi_website_analytics.py

echo "✅ Setup and fix completed!"
