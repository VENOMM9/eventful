import mongoose, { Connection } from "mongoose";
import config from "../config";

function connectionToMongodb(): void {
    mongoose.connect(config.MONGODB_URL);

    const dbConnection: Connection = mongoose.connection;

    dbConnection.on("connected", () => {
        console.log("mongodb connection successful ");
    });

    dbConnection.on("error", (err) => {
        console.error(err);
        console.log("mongodb connection unsuccessful");
    });
}

export { connectionToMongodb };
