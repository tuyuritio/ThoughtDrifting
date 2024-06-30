import FileSystem from "fs";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	let meta = JSON.parse(FileSystem.readFileSync("assets/note/note-meta.json").toString());

	let notes = [];
	let series: any = {};

	for (let hash in meta) {
		let note = meta[hash];

		if (note.series === true) {
			series[hash] = { content: [], ...note };
			notes.push(series[hash]);
		} else if (typeof note.series == "string") {
			series[note.series].content.push({ content: hash, ...note });
		} else {
			notes.push({ content: hash, ...note });
		}
	}

	return { notes };
};
