<style lang="less">
	main {
		h1 {
			margin-bottom: 20px;
		}

		ul {
			list-style: none;

			li {
				hr {
					margin: 50px 0px;
					border-bottom: 1px solid @foreground;
				}

				h2 {
					font-size: 20px;
					margin-bottom: 20px;
				}
			}
		}
	}
</style>

<main>
	<h1>序文歴史</h1>
	<ul>
		{#each $page.data.prefaces as preface}
			<li>
				<hr />
				<h2>{Time.format(preface.timestamp)}</h2>
				<Markdown>{@html preface.content}</Markdown>
			</li>
		{/each}
	</ul>
</main>

<script>
	import { page } from "$app/stores";
	import Markdown from "$lib/markdown/markdown.svelte";
	import Time from "$lib/time";
</script>
