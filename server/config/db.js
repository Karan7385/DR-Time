const mongoose = require('mongoose');

async function connectionMongoDB(MONGO_URI) {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log("Mongo Connection ERROR: ", error);
        throw error; // Propagate the error to handle it in the calling code
    }
}

// Export as an object
module.exports = {
    connectionMongoDB
};
