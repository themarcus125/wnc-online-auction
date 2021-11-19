# Setup database and restore data:

Install [Mongodb](https://docs.mongodb.com/manual/installation/) for local cluters and [Database Tools](https://docs.mongodb.com/database-tools/installation/installation/) for restore database from dump data.

- Add the `<MONGODB_PATH>\bin` and `<MONGODB_TOOLS_PATH>\bin` directory to the system variable `PATH`
- Open command line as administrator
- Check installed successfully `mongod --version` and `mongo --version` and `mongorestore --version`

Make sure everything are fine, then create a database cluster:

1. Mongodb Atlas: https://docs.atlas.mongodb.com/getting-started/

   - Follow docs to created a cluster, then get connection string and set `DBURL=mongodb+srv://${DBUSER}:${DBPASS}@${DBHOST}/${DBNAME}?retryWrites=true&w=majority` in environment variable

2. Create a local cluster: https://docs.mongodb.com/manual/tutorial/convert-standalone-to-replica-set/

   - Open command line as administrator
   - Stop current `mongod` instance: https://stackoverflow.com/questions/11774887/how-to-stop-mongo-db-in-one-command/47420923
   - Create `mongodb` directory `mkdir mongodb`
   - Run `mongod --dbpath ./mongodb --port 27017 --replSet rs0 --bind_ip localhost`
   - Open another command line and connect to `mongod` instance by `mongo`
   - Initiate the new replica set: `rs.initiate()`
   - Set `DBURL=mongodb://localhost:27017/{DB_NAME}?replicaSet=rs0` in environment variable

Finally, restore database from dump data: https://docs.mongodb.com/manual/tutorial/backup-and-restore-tools/#basic-mongorestore-operations

- Run `mongorestore --uri mongodb://{DBHOST}:{DBPORT} ./dump` or `mongorestore --uri mongodb+srv://${DBUSER}:${DBPASS}@${DBHOST} ./dump`
