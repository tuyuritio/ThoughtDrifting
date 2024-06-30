<style lang="less">
	i {
		display: inline-flex;
		padding: 2px 5px 0px;
	}
</style>

<i>{@html icons[name].toSVG({ width: size })}</i>

<script lang="ts">
	import icons from "@primer/octicons";
	import "@primer/octicons/build/build.css";

	export let name: keyof typeof icons;
	export let size: number = 16;
</script>
