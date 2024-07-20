import FileSystem from "fs";
import path from "path";
import { error } from "@sveltejs/kit";
import { BLOG_ASSET_PATH } from "$env/static/private";
import Mongo from "$lib/server/mongo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	let result = await Mongo.chronicle.find().sort({ date: -1 }).toArray();

	let chronicle: any[] = [];
	for (const item of result) {
		let day = chronicle.find(day => day.date == item.date);
		if (day) {
			day.content.push(item.event);
		} else {
			chronicle.push({ date: item.date, content: [item.event] });
		}
	}

	let introduction;
	try {
		introduction = FileSystem.readFileSync(path.join(BLOG_ASSET_PATH, "introduction.html")).toString();
	} catch (_) {
		throw error(500, "紹介読取失敗");
	}

	let claim;
	try {
		claim = FileSystem.readFileSync(path.join(BLOG_ASSET_PATH, "claim.html")).toString();
	} catch (_) {
		throw error(500, "声明読取失敗");
	}

	return { chronicle, introduction, claim };
};
