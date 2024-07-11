import mongoose from 'mongoose';
import { createConnection } from 'mysql2/promise';
import { env } from './env';

// MongoDB connection configuration
export const connectToMongo = async () => {
  try {
    await mongoose.connect(env.mongo.uri as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

// MySQL connection configuration
export const connectToMySQL = async () => {
    try {
        const connection = await createConnection({
            host: env.mysql.host,
            user: env.mysql.user,
            password: env.mysql.password,
            database: env.mysql.database
        });
        console.log('Connected to MySQL');
        return connection;
    } catch (error) {
        console.error('Error connecting to MySQL', error);
        process.exit(1);
    }
};



