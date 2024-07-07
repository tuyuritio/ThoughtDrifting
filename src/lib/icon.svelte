<style lang="less">
	i {
		position: relative;
		display: flex;

		top: 1.5px;
	}
</style>

<i>{@html icons[name].toSVG({ width: size })}</i>

<script lang="ts">
	import icons from "@primer/octicons";
	import "@primer/octicons/build/build.css";

	export let name: keyof typeof icons;
	export let size: number = 16;
</script>
