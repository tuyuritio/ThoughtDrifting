<style lang="less">
	#frame {
		display: flex;
		flex-direction: column;

		position: relative;

		height: 100vh;
		width: 100vw;

		padding: 15px;

		background-color: @background;
		background-image: url("/paper.png");

		z-index: 0;

		section {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			height: 60px;

			> * {
				display: flex;
				align-items: center;

				height: 100%;
				padding: 0px 20px;
			}

			h1 {
				border-width: 0px 0px 2px 2px;

				font-family: "Hiragino";
				font-size: 30px;
				font-weight: 100;

				text-shadow: @text-shadow;
			}

			span {
				border-width: 0px 2px 2px 0px;

				a {
					padding: 0px 5px;
				}
			}
		}

		div {
			flex-grow: 1;
			border-width: 0px 0px 0px 2px;

			main {
				display: flex;
				flex-direction: row;

				width: 100%;
				max-width: 1500px;

				margin: 50px auto 20px;

				nav {
					ul {
						list-style: none;
						border-width: 0px 2px 0px 0px;
						padding-right: 40px;
						padding-bottom: 50px;

						li {
							position: relative;

							padding: 5px 0px 5px 40px;

							&.location {
								::before {
									content: "";
									position: absolute;

									top: 50%;
									left: 0px;

									border-bottom: 2px solid black;
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

			border-width: 2px 0px 0px 2px;
			padding: 20px 20px 10px;

			span {
				font-size: 13px;
				font-weight: bold;
				font-family: "Maple";

				text-shadow: @text-shadow;
			}
		}
	}
</style>

<div id="frame">
	<section>
		<h1 class="shadow">五月七日千緒</h1>
		<span class="shadow">
			<a target="_blank" href="https://github.com/tuyuritio"><Icon name="mark-github" size={20} /></a>
			<a href="mailto:tuyuritio@gmail.com"><Icon name="mail" size={20} /></a>
		</span>
	</section>
	<div class="shadow">
		<main>
			<nav>
				<ul class="shadow">
					<li class:location={$page.url.pathname == "/"}><a href="/">玄関</a></li>
					<li class:location={$page.url.pathname.startsWith("/note")}><a href="/note">文記</a></li>
					<li class:location={$page.url.pathname.startsWith("/info")}><a href="/info">情報</a></li>
				</ul>
			</nav>
			<article><slot /></article>
		</main>
	</div>
	<footer class="shadow">
		<span>&emsp;2024 TuyuriTio</span>
	</footer>
</div>

<script lang="ts">
	import { page } from "$app/stores";
	import Icon from "$lib/icon.svelte";
	import "./+layout.less";
</script>
