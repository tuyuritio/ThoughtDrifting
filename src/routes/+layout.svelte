<style lang="less">
	#frame {
		display: flex;
		flex-direction: column;

		position: relative;

		height: 100vh;
		width: 100vw;

		padding: 15px;

		background-color: @background;
		z-index: 0;

		&::after {
			content: "";
			position: absolute;

			top: 0px;
			left: 0px;

			width: 100%;
			height: 100%;

			background-image: url("/paper.png");

			opacity: @back-opacity;

			z-index: -1;
		}

		header {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			height: 60px;

			> * {
				display: flex;
				align-items: center;

				height: 100%;
			}

			h1 {
				border-width: 0px 0px 2px 2px;
				padding: 0px 20px 0px 15px;

				a {
					font-family: "Hiragino Gyosyo W4 JIS2004";
					font-size: 30px;
					font-weight: 100;

					text-shadow: @text-shadow;
				}
			}

			address {
				border-width: 0px 2px 2px 0px;
				padding: 0px 15px;

				> * {
					margin: 0px 10px;
				}

				button {
					padding: 0px;
				}

				#menu {
					display: none;
				}
			}
		}

		main {
			display: flex;

			flex-grow: 1;
			border-width: 0px 0px 0px 2px;

			#main {
				display: flex;
				flex-direction: row;

				width: min(100%, 1500px);

				margin: 20px auto 0px;

				#responsive {
					display: none;
				}

				nav {
					ul {
						list-style: none;
						border-width: 0px 2px 0px 0px;
						padding-right: 40px;
						padding-bottom: 50px;

						li {
							position: relative;

							padding: 10px 0px 10px 40px;

							&.location {
								::before {
									content: "";
									position: absolute;

									top: 50%;
									left: 0px;

									border-bottom: 2px solid @foreground;
									width: 15px;
								}

								::after {
									content: "";
									position: absolute;

									top: calc(50% + 7px);
									left: 7px;

									border-bottom: 2px solid @shadow;
									width: 15px;
								}
							}

							a {
								font-size: 20px;

								text-shadow: @text-shadow;
							}
						}
					}
				}

				article {
					flex-grow: 1;
					width: 0px;

					margin: 0px 50px;
				}
			}
		}

		footer {
			display: flex;
			align-items: center;
			justify-content: space-between;

			height: 40px;

			border-width: 2px 0px 0px 2px;
			padding-top: 10px;

			font-size: 13px;
			font-weight: bold;
			text-shadow: @text-shadow;

			* {
				font-family: @monostyle;
			}

			cite {
				display: flex;
				align-items: center;

				margin-left: 20px;

				font-style: normal;

				> * {
					margin-right: 5px;
				}

				a {
					display: flex;
					align-items: center;

					img {
						width: 15px;

						margin-right: 5px;
						border-radius: 50%;
						box-shadow: @text-shadow;
					}
				}
			}

			code {
				display: flex;
				align-items: center;

				> * {
					margin-right: 8px;
				}

				a {
					display: flex;
					align-items: center;

					padding-right: 10px;

					font-family: @monostyle;
					font-size: 15px;
					font-weight: lighter;
				}
			}
		}
	}

	@media screen and (max-width: @responsive) {
		#frame {
			header {
				height: 40px;

				h1 {
					a {
						font-size: 25px;
					}
				}

				address {
					padding: 0px 10px;

					#menu {
						display: block;
						margin-right: 5px;
					}
				}
			}

			main {
				#main {
					position: relative;
					margin: 0px;

					#responsive:checked + nav {
						display: flex;
					}

					nav {
						position: absolute;
						display: none;
						justify-content: center;

						background-color: @background;
						background-image: url("/paper.png");

						z-index: 2;

						width: 100%;

						ul {
							width: 100%;

							border-width: 0px 0px 2px;
							padding: 10px 0px;

							li {
								display: flex;
								justify-content: center;

								padding-left: 0px;

								a {
									width: 100%;
									text-align: center;
								}
							}
						}
					}

					article {
						margin: 20px 0px 0px 15px;
					}
				}
			}

			footer {
				display: none;
			}
		}
	}
</style>

<!--
+- body -----------------------------------------+
| padding: 15px;                                 |
|                                                |
| +- header -----------------------------------+ |
| | height: 60px;                              | |
| |                                            | |   
| +--------------------------------------------+ |
|                                                |
| +- #main ------------------------------------+ |
| | margin: 20px auto 0px;                     | |
| |                                            | |
| | +- nav -+ +- article --------------------+ | |
| | |       | | height: calc(100vh - 150px); | | |
| | |       | |                              | | |
| | +-------+ +------------------------------+ | |
| +--------------------------------------------+ |
|                                                |
| +- footer -----------------------------------+ |
| | height: 40px;                              | |
| |                                            | |
| +--------------------------------------------+ |
+------------------------------------------------+
-->

<!-- 禁用预加载 -->
<div id="frame" data-sveltekit-preload-data="false">
	<header>
		<h1 class="shadow"><a href="/">五月七日千緒</a></h1>
		<address class="shadow">
			<a target="_blank" href="https://github.com/tuyuritio"><Icon name="mark-github" size={20} /></a>
			<a href="mailto:tuyuritio@gmail.com"><Icon name="mail" size={20} /></a>
			{#if theme}
				<button on:click={toggle_dark}>
					{#if theme == "dark"}<Icon name="moon" />{:else}<Icon name="sun" />{/if}
				</button>
			{/if}
			<label id="menu" for="responsive"><Icon name="three-bars" size={20} /></label>
		</address>
	</header>

	<!-- 提供左边框 -->
	<main class="shadow">
		<div id="main">
			<input id="responsive" type="checkbox" />
			<nav>
				<ul class="shadow">
					<li class:location={$page.url.pathname == "/" || $page.url.pathname.startsWith("/preface")}><a href="/">玄関</a></li>
					<li class:location={$page.url.pathname.startsWith("/note")}><a href="/note">文記</a></li>
					<li class:location={$page.url.pathname.startsWith("/info")}><a href="/info">情報</a></li>
				</ul>
			</nav>
			<article><slot /></article>
		</div>
	</main>

	<footer class="shadow">
		<cite>
			<span>&emsp;2024</span>
			<a target="_blank" href="https://blog.tuur.cc">TuyuriTio</a>
			<span> | </span>
			<a target="_blank" href="https://creativecommons.org/licenses/by-nc-nd/4.0/deed.zh-hans">
				<img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt="CC" />
				<img src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt="BY" />
				<img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1" alt="NC" />
				<img src="https://mirrors.creativecommons.org/presskit/icons/nd.svg?ref=chooser-v1" alt="ND" />
			</a>
		</cite>
		<code>
			<p>Powered by</p>
			<a href="https://kit.svelte.dev/" target="_blank"></a>
		</code>
	</footer>
</div>

<svelte:head>
	<script>
		document.documentElement.dataset.theme = localStorage.getItem("theme") ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
	</script>
</svelte:head>

<script lang="ts">
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import Icon from "$lib/icon.svelte";
	import "$lib/style.less";

	let theme: string;
	function toggle_dark() {
		theme = document.documentElement.dataset.theme = theme == "dark" ? "light" : "dark";
		localStorage.setItem("theme", theme);
	}

	onMount(() => {
		theme = document.documentElement.dataset.theme!;
	});
</script>
