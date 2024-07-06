import type { PageServerLoad } from "./$types";
import Mongo from "$lib/server/mongo";

export const load: PageServerLoad = async () => {
	let result = await Mongo.note.find().project({ content: 0 }).toArray();

	let notes = [];
	let series: any = {};

	for (let note of result) {
		if (note.series == true) {
			let set = series[note.ID] = { content: [], title: note.title, timestamp: note.timestamp };
			notes.push(set);
		} else if (typeof note.series == "string") {
			series[note.series].content.push({ content: note.ID, title: note.title, timestamp: note.timestamp, tags: note.tags });
		} else {
			notes.push({ content: note.ID, title: note.title, timestamp: note.timestamp, tags: note.tags });
		}
	}

	return { notes };
};
