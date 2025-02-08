import { createClient } from 'redis';
import dotenv from 'dotenv';


dotenv.config();

const client = createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD
});

client.on('error', (err) => console.log('Redis Client Error:', err));

const connectRedis = async () => {
    try {
        await client.connect();
        console.log('✅ Connected to Redis Cloud');
    } catch (error) {
        console.error('❌ Redis Connection Error:', error);
        process.exit(1);
    }
};

export { client, connectRedis };
