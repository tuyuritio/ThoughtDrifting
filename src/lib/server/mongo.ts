import { MongoClient } from "mongodb";
import { DATABASE_URL } from "$env/static/private";

let client = new MongoClient(DATABASE_URL);

try {
	await client.connect();
} catch (_) {
	throw new Error("数據庫接続失敗");
}

let database = client.db();
const Mongo = {
	note: database.collection("note"),
	profile: database.collection("profile"),
	preface: database.collection("preface"),
	chronicle: database.collection("chronicle"),
	visit: database.collection("visit")
}

export default Mongo;
