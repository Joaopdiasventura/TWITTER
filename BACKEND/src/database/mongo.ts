import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
    client: null as Mongo | null,
    db: null as (() => Db) | null,

    async connect(): Promise<void> {
        const url = process.env.MONGO_URL;
        const username = process.env.MONGO_USER;
        const password = process.env.MONGO_PASSWORD;

        const client = new Mongo(url, { auth: { username, password } });
        await client.connect();

        this.client = client;
        this.db = () => client.db("twitter");
    }
};
