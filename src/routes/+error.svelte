<style lang="less">
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 50%;
	}

	h2 {
		font-size: 25px;
	}

	h3 {
		font-size: 20px;
	}
</style>

<main>
	<h2>{error_code_text.join("·")}</h2>
	<h3>{$page.error?.message}</h3>
</main>

<script lang="ts">
	import { page } from "$app/stores";

	let error_code: string = $page.status.toString();
	let error_code_text: string[] = [];

	const digits: string[] = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];

	for (let index = 0; index < error_code.length; index++) {
		const digit = error_code[index];
		error_code_text.push(digits[Number(digit)]);
	}
</script>
