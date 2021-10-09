import dotenv from "dotenv";

dotenv.config();

const MONGO_TEST_CLUSTER = `mongodb+srv://${process.env.MONGO_TEST_USER}:${process.env.MONGO_TEST_PSW}@cluster0.jaqxs.mongodb.net/${process.env.MONGODB_TEST}?retryWrites=true&w=majority`;

const MONGO_DEVELOPMENT_CLUSTER = `mongodb://127.0.0.1:27017/${process.env.MONGODB_DEV}`;

const MONGO_PRODUCTION_CLUSTER = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PSW}@cluster0.3y0bt.mongodb.net/${process.env.MONGODB_PRODUCTION}?retryWrites=true&w=majority`;

const setMongoUri = () => {
  if (process.env.NODE_ENV === "development") {
    return MONGO_DEVELOPMENT_CLUSTER
  } else if (process.env.NODE_ENV === "test"){
    return MONGO_TEST_CLUSTER
  } else if (process.env.NODE_ENV === "production") {
    return MONGO_PRODUCTION_CLUSTER 
  }
};

export const MONGODB_URI:any = setMongoUri()