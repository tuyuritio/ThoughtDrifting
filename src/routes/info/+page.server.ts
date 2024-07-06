import type { PageServerLoad } from "./$types";
import Mongo from "$lib/server/mongo";

export const load: PageServerLoad = async () => {
	let result = await Mongo.chronicle.find().toArray();

	let chronicle: any[] = [];
	for (const item of result) {
		let day = chronicle.find(day => day.date == item.date);
		if (day) {
			day.content.push(item.event);
		} else {
			chronicle.push({ date: item.date, content: [item.event] });
		}
	}

	return { chronicle };
};
