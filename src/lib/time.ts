import moment from "moment-timezone";

const default_timezone = import.meta.env.VITE_TIMEZONE;

export function Time(time?: Date | number, timezone: string = default_timezone) {
	return moment(time).tz(timezone).format("YYYY/MM/DD-HH:mm:ss");
}

export namespace Time {
	export function date(time?: Date | number, timezone: string = default_timezone) {
		return moment(time).tz(timezone).format("YYYY/MM/DD");
	}

	export function full(time?: Date | number, timezone: string = default_timezone) {
		return moment(time).tz(timezone).format("YYYY/MM/DD-HH:mm:ss [UTC]Z");
	}
}
export default Time;
