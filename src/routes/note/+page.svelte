<style lang="less">
	main {
		display: flex;
		flex-direction: column;

		height: calc(100vh - 100px);

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

				color: @foreground;
				background: transparent;
				outline: none;

				&::placeholder {
					font-family: @monospace;
				}
			}
		}

		article {
			display: flex;
			flex-direction: column;

			padding-left: 50px;

			overflow-y: auto;

			section,
			summary {
				position: relative;
				display: flex;
				flex-direction: column;

				padding-top: 20px;

				&::after {
					content: "";
					position: absolute;

					top: 30px;
					left: -40px;

					width: 15px;

					border-bottom: 2px solid @foreground;
				}

				p {
					display: flex;
					flex-direction: row;

					a:hover {
						text-decoration: underline;
					}

					span {
						display: flex;
						align-items: center;

						margin-left: auto;

						color: @remark;

						button {
							padding: 0px 0px 0px 10px;
						}
					}
				}

				i {
					margin-top: 5px;

					font-family: @monospace, @serif;
					font-size: 0.65rem;
					font-style: normal;
					color: @remark;
					line-height: normal;
				}
			}

			section,
			details {
				position: relative;

				&::before {
					content: "";
					position: absolute;

					top: 0px;
					left: -40px;

					height: 100%;

					border-left: 2px solid @foreground;
				}

				&:last-child::before {
					height: 30px;
				}
			}

			details {
				summary {
					list-style: none;
					cursor: pointer;
				}

				section {
					margin-left: 45px;

					&:nth-child(2) {
						margin-top: 10px;
					}
				}
			}
		}
	}

	@media screen and (max-width: @responsive) {
		main {
			height: calc(100vh - 100px);
		}
	}
</style>

<main>
	<header>
		<span><Icon name="search" size={20} /></span>
		<input type="text" placeholder="input.split(' ').match(/(?=#)tag/g)" bind:value={search} oninput={filter} />
	</header>

	<article>
		{#each list as note}
			{#if typeof note.content == "string"}
				<section>
					<p>
						<a href="/note/{note.content}">{note.title}</a>
						<span>
							{#each note.tags as tag}
								<button onclick={() => ((search += ` #${tag}`), filter())}>#{tag}</button>
							{/each}
						</span>
					</p>
					<i title={Time.full(note.timestamp, Time.user_timezone)}>{Time(note.timestamp)}</i>
				</section>
			{:else}
				<details>
					<summary>
						<p>
							<strong>{note.title}</strong>
							<span>
								{#each note.tags as tag}
									<button onclick={() => ((search += ` #${tag}`), filter())}>#{tag}</button>
								{/each}
							</span>
						</p>
						<i title={Time.full(note.timestamp, Time.user_timezone)}>{Time(note.timestamp)}</i>
					</summary>
					{#each note.content as entry}
						<section>
							<p>
								<a href="/note/{entry.content}">{entry.title}</a>
								<span>
									{#each entry.tags as tag}
										<button onclick={() => ((search += ` #${tag}`), filter())}>#{tag}</button>
									{/each}
								</span>
							</p>
							<i title={Time.full(entry.timestamp, Time.user_timezone)}>{Time(entry.timestamp)}</i>
						</section>
					{/each}
				</details>
			{/if}
		{/each}
	</article>
</main>

<svelte:head>
	<title>記緒漂流 | 文記</title>
</svelte:head>

<script lang="ts">
	import { page } from "$app/state";
	import Icon from "$lib/icon.svelte";
	import Time from "$lib/time";

	let notes: any[] = $state(page.data.notes);
	let list = $derived(((list: any[]) => {
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
	})(notes));

	let search: string = $state("");
	function filter() {
		notes = page.data.notes;

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
