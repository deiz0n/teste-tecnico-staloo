set -e

sleep 5

npm run seed:$APP_NAME

npm run start:dev -- $APP_NAME