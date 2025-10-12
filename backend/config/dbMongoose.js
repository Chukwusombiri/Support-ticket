const mongoose = require('mongoose')
const uri = process.env.MONGO_URI
const connectDB = async () => {
    try {
        console.log("Attempting mongoDB conn through mongoose");
        await mongoose.connect(uri, {
            dbName: "support_desk"
        });
        console.log('Mongo connected through mongoose');
    } catch (err) {
        console.error('Mongo connection failed', err);
        process.exit(1);
    }
}

module.exports = {
    connectDB
}