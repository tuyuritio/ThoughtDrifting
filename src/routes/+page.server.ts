import FileSystem from "fs";
import Mongo from "$lib/server/mongo";
import type { PageServerLoad } from "./$types";
import { BLOG_ASSET_PATH } from "$env/static/private";
import Path from "path";

export const load: PageServerLoad = async () => {
	let result = await Mongo.preface.find().project({ _id: 0 }).sort({ timestamp: -1 }).limit(1).toArray();
	if (result.length) {
		let html = FileSystem.readFileSync(Path.join(BLOG_ASSET_PATH, "preface", `${result[0].timestamp}.html`)).toString();

		return { time: result[0].timestamp, content: html };
	}
};
