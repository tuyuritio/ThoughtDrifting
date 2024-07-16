<style lang="less">
	main {
		h1,
		h2 {
			font-family: "Playwrite MX";
			font-weight: 200;
			line-height: 2;
		}

		hr {
			margin: 50px 0px;
			border-bottom: 1px solid @foreground;
		}

		h3 {
			font-size: 23px;
			margin-bottom: 20px;
		}

		section {
			display: inline-flex;
			flex-direction: column;

			max-width: 50%;

			a {
				align-self: flex-end;

				margin-top: 10px;
				font-size: 14px;
				color: @foreground;
			}
		}
	}
</style>

<main>
	<h1>Hello!</h1>
	<h2>And enjoy it.</h2>
	{#if $page.data.time}
		<hr />
		<h3>序文</h3>
		<section>
			<Markdown>{@html $page.data.content}</Markdown>
			<a href="/preface">&emsp;&emsp;—— {date}</a>
		</section>
	{/if}
</main>

<script lang="ts">
	import { page } from "$app/stores";
	import Markdown from "$lib/markdown/markdown.svelte";

	let time = new Date($page.data.time);
	let date = `${time.getFullYear()} 年 ${time.getMonth() + 1} 月 ${time.getDate()} 日`;
</script>
