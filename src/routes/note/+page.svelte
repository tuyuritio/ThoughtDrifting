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

					top: 55%;
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
						margin-left: 10px;
					}
				}

				i {
					margin-top: 5px;

					font-family: @monospace, @serif;
					font-size: 0.65rem;
					font-style: normal;
					color: @remark;
					line-height: 1.2;
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
					height: 55%;
				}
			}

			details {
				summary {
					list-style: none;
					cursor: pointer;

					p {
						font-weight: bolder;
					}
				}

				section {
					margin-left: 45px;

					&:nth-child(2) {
						margin-top: 10px;
						padding-top: 10px;
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
		<input type="text" placeholder="input.split(' ').match(/(?=#)tag/g)" bind:value={search} on:input={filter} />
	</header>

	<article>
		{#each list as note}
			{#if typeof note.content == "string"}
				<section>
					<p><a href="/note/{note.content}">{note.title}</a></p>
					<i>{Time(note.timestamp)}</i>
				</section>
			{:else}
				<details>
					<summary>
						<p>{note.title}</p>
						<i>{Time(note.timestamp)}</i>
					</summary>
					{#each note.content as entry}
						<section>
							<p><a href="/note/{entry.content}">{entry.title}</a></p>
							<i>{Time(entry.timestamp)}</i>
						</section>
					{/each}
				</details>
			{/if}
		{/each}
	</article>
</main>

<svelte:head>
	<title>記緒計画 | 文記</title>
</svelte:head>

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
