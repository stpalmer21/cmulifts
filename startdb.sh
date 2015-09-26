killall mongod
mkdir -p log
mkdir -p data/db
rm -rf data/db/*
mongod --dbpath data/db --fork --logpath log/mongodb.log
node setup.js
