import { MongoClient } from "mongodb";

let client = new MongoClient("mongodb://localhost:27017/?replicaSet=rs0");

try {
	await client.connect();
} catch (_) {
	throw new Error("数拠庫接続失敗");
}

let database = client.db("Blog");
const Mongo = {
	client,
	note: database.collection("note"),
	profile: database.collection("profile"),
	chronicle: database.collection("chronicle")
}

Mongo.profile.createIndex({ key: 1 }, { unique: true });
Mongo.note.createIndex({ ID: 1 }, { unique: true });

export default Mongo;
