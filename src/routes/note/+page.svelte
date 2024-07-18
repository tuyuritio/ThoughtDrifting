<style lang="less">
	main {
		header {
			display: flex;
			flex-direction: row;
			align-items: center;

			margin-bottom: 15px;

			input {
				margin-left: 35px;
				border-bottom: 2px dashed @foreground;
				padding: 5px 0px;

				width: 300px;

				background: transparent;
				outline: none;

				&::placeholder {
					font-family: @monospace;
				}
			}
		}

		details {
			position: relative;

			margin-left: 10px;
			border-left: 2px solid @foreground;

			&:last-child {
				border-left: 2px solid transparent;

				&::before {
					content: "";
					position: absolute;

					top: 0px;
					left: -2px;

					border-left: 2px solid black;
					height: 25px;
				}
			}

			summary {
				display: flex;

				position: relative;
				list-style: none;

				padding: 10px 40px;

				&::before {
					content: "";
					position: absolute;

					top: 23px;
					left: 0px;

					border-bottom: 2px solid black;
					width: 15px;
				}

				&:not(:only-child) {
					cursor: pointer;
				}

				section {
					a:hover {
						border-bottom: 2px solid @foreground;
					}

					i {
						display: block;
						margin-top: 8px;

						font-family: @monospace;
						font-size: 10px;
						font-style: normal;
						color: @remark;
					}
				}

				aside {
					display: flex;
					margin-left: auto;

					button {
						margin-left: 10px;
						padding: 0px;

						font-size: 12px;
						color: @remark;

						cursor: pointer;
					}
				}
			}

			> details {
				margin-left: 45px;
			}
		}
	}
</style>

<main>
	<header>
		<span><Icon name="search" size={20} /></span>
		<input type="text" placeholder="input.split(' ').match(/(?=#)tag/g)" bind:value={search} on:input={filter} />
	</header>

	{#each list as note}
		<details>
			{#if typeof note.content == "string"}
				<summary>
					<section>
						<a href="/note/{note.content}">{note.title}</a>
						<i>{Time.format(note.timestamp)}</i>
					</section>
					<aside>
						{#each note.tags as tag}
							<button on:click={() => ((search += `#${tag}`), filter())}>#{tag}</button>
						{/each}
					</aside>
				</summary>
			{:else}
				<summary>
					<section>
						<strong>{note.title}</strong>
						<i>{Time.format(note.timestamp)}</i>
					</section>
					<aside>
						{#each note.tags as tag}
							<button on:click={() => ((search += `#${tag}`), filter())}>#{tag}</button>
						{/each}
					</aside>
				</summary>
				{#each note.content as subnote}
					<details>
						<summary>
							<section>
								<a href="/note/{subnote.content}">{subnote.title}</a>
								<i>{Time.format(subnote.timestamp)}</i>
							</section>
							<aside>
								{#each subnote.tags as tag}
									<button on:click={() => ((search += `#${tag}`), filter())}>#{tag}</button>
								{/each}
							</aside>
						</summary>
					</details>
				{/each}
			{/if}
		</details>
	{/each}
</main>

<script lang="ts">
	import { page } from "$app/stores";
	import Icon from "$lib/icon.svelte";
	import Time from "$lib/time";

	let notes: any[] = $page.data.notes;
	$: list = ((list: any[]) => {
		let notes: any[] = [];
		for (const data of list) {
			data.content = data.ID;

			if (data.series) {
				let series = notes.find(note => note.title == data.series);
				if (series) {
					series.content.push(data);
					series.tags = [...new Set([...series.tags, ...data.tags])];
				} else {
					notes.push({ title: data.series, timestamp: data.timestamp, tags: [...data.tags], content: [data] });
				}
			} else {
				notes.push(data);
			}
		}

		return notes.reverse();
	})(notes);

	let search: string = "";
	function filter() {
		notes = $page.data.notes;

		let keywords = search.split(" ").filter(keyword => keyword.length > 0);
		for (const keyword of keywords) {
			if (keyword.startsWith("#")) {
				notes = notes.filter(note => note.tags.some((tag: string) => keyword.replaceAll("#", "") == tag));
			} else {
				notes = notes.filter(note => note.title.toLowerCase().includes(keyword.toLowerCase()) || note.series?.toLowerCase().includes(keyword.toLowerCase()));
			}
		}
	}
</script>
