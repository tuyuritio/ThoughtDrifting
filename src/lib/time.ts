import moment from "moment-timezone";

function Time(time?: Date | number, timezone: string = Time.default_timezone) {
	return moment(time).tz(timezone).format("YYYY/MM/DD-HH:mm:ss");
}

namespace Time {
	export const default_timezone = import.meta.env.VITE_TIMEZONE;
	export const user_timezone = moment.tz.guess();

	export function date(time?: Date | number, timezone: string = default_timezone) {
		return moment(time).tz(timezone).format("YYYY/MM/DD");
	}

	export function full(time?: Date | number, timezone: string = default_timezone) {
		return moment(time).tz(timezone).format("YYYY/MM/DD-HH:mm:ss [UTC]Z");
	}
}

export default Time;
