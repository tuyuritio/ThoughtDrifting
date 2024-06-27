export namespace Time {
	/* 全局变量 */
	type unit = "year" | "month" | "date" | "hour" | "minute" | "second" | "millisecond";

	/**
	 * 将时间文本转换为时间整型 | 将Date对象转换为时间整型
	 * @param time 时间文本 | Date对象
	 * @returns 时间整型
	 */
	export function parse(time: string | Date): number {
		return new Date(time).getTime();
	}

	/**
	 * 将Date对象转换为时间文本 | 将时间整型转换为时间文本
	 * @param time Date对象 | 时间整型
	 * @param time_unit 时间精确单位 - **默认:** "second"
	 * @returns 时间文本
	 */
	export function format(time: Date | number, time_unit: unit = "second"): string {
		if (typeof time == "number") time = new Date(time);

		let time_text: string = "";

		switch (time_unit) {
			case "millisecond":
				time_text = "." + time.getMilliseconds() + time_text;

			case "second":
				time_text = ":" + time.getSeconds().toString().padStart(2, "0") + time_text;

			case "minute":
				time_text = ":" + time.getMinutes().toString().padStart(2, "0") + time_text;

			case "hour":
				time_text = "-" + time.getHours().toString().padStart(2, "0") + time_text;

			case "date":
				time_text = "/" + time.getDate().toString().padStart(2, "0") + time_text;

			case "month":
				time_text = "/" + (time.getMonth() + 1).toString().padStart(2, "0") + time_text;

			case "year":
				time_text = time.getFullYear() + time_text;
				break;

			default:
				time_text = time.getFullYear() + "/" + (time.getMonth() + 1).toString().padStart(2, "0") + "/" + time.getDate().toString().padStart(2, "0") + "-" + time.getHours().toString().padStart(2, "0") + ":" + time.getMinutes().toString().padStart(2, "0");
				break;
		}

		return time_text;
	}

	/**
	 * 计算间隔天数
	 * @param end 截止日期
	 * @param start 起始日期
	 * @returns 间隔天数
	 */
	export function gapDay(end: Date | string | number, start: Date | string | number): number {
		let end_date: Date = new Date(end);
		let start_date: Date = new Date(start);

		return (end_date.getTime() - start_date.getTime()) / (24 * 60 * 60 * 1000);
	}
}
export default Time;