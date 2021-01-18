import mongoose from 'mongoose';
import logger from './logger'

mongoose.Promise = global.Promise;

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds215910.mlab.com:15910/contact`
const uri = 'mongodb://localhost:27017/contact'
console.log(uri)
const dev = "dev"
const connection = mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});

connection
    .then(db => {
        logger.info(
            `Successfully connected to ${uri} MongoDB cluster in ${
                dev
            } mode.`,
        );
        return db;
    })
    .catch(err => {
        if (err.message.code === 'ETIMEDOUT') {
            logger.info('Attempting to re-establish database connection.');
            mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true});
        } else {
            logger.error('Error while attempting to connect to database:');
            logger.error(err);
        }
    });

export default connection;
