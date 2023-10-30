import { MongoClient } from "mongodb";

const url = "mongodb://127.0.0.1:27017/ecomdb";
// If the above url gives error (error may be caused due to IPv4/IPv6 configuration conflict), then try the url given below
// const url = "mongodb://127.0.0.1:27017/ecomdb";

// to the store the databse in the client variable
let client;
export const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then((clientInstance) => {
      client = clientInstance;
      console.log("Mongodb is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
//exporting the stored database
export const getDB = () => {
  return client.db();
};
