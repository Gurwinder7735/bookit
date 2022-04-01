'use strict';

let mongoURI = "";

if (process.env.NODE_ENV === "test") {
    mongoURI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`;
  
} else if (process.env.NODE_ENV === "development") {
    mongoURI = `mongodb://localhost:27017/${process.env.MONGO_DB_NAME}`;
  
} else if (process.env.NODE_ENV === "production") {
    mongoURI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_HOST}/${process.env.MONGO_DB_NAME}`;
}

console.log("DB URL ------->", mongoURI)
console.log("NODE ENV -------->", process.env.NODE_ENV)

module.exports = {
    mongo: mongoURI
};

