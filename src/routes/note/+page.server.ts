import type { PageServerLoad } from "./$types";
import Mongo from "$lib/server/mongo";

export const load: PageServerLoad = async () => {
	let result = await Mongo.note.find({ visibility: true }).project({ _id: 0, content: 0 }).sort({ timestamp: 1 }).toArray();
	return { notes: result };
};
