<style lang="less">
	main {
		display: flex;
		justify-content: center;

		width: 100%;
		max-width: 1500px;
		height: calc(100vh - 175px); // 暂时想不到更好的办法

		margin: 0px auto;

		q {
			flex-grow: 1;

			quotes: none;
			overflow-y: auto;
		}
	}
</style>

<main>
	<q><Markdown>{@html data.content}</Markdown></q>
</main>

<script lang="ts">
	import Markdown from "$lib/markdown/markdown.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>
