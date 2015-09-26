killall mongod
mkdir -p mongodb/log
mkdir -p mongodb/data
rm -rf mongodb/data/*
mongod --config mongodb.conf
node setup.js
