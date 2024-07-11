export const env = {
    port: process.env.PORT,
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    },
    mongo: {
        uri: process.env.MONGO_URI
    },
    s3: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
        sessionToken: process.env.AWS_SESSION_TOKEN,
        bucketName: process.env.AWS_S3_BUCKET_NAME
    },
}