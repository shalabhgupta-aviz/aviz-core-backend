#!/bin/bash
echo "🗑️ Deleting website-analytics content-type..."
pm2 stop aviz-backend
rm -rf src/api/website-analytics
rm -rf .cache build node_modules/.cache
echo "dfiocnwp" | psql -h localhost -U aviz_user -d aviz_core_backend -c "DELETE FROM strapi_database_schema WHERE schema::text LIKE '%website%' OR schema::text LIKE '%analytics%';"
npm run build
pm2 start aviz-backend
echo "✅ Website-analytics content-type deleted!"
pm2 logs aviz-backend --lines 10
