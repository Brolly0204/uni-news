<template>
		<scroll-view
		  class="list-scroll"
			scroll-y
			@scrolltolower="loadMore"
			lower-threshold="80"
		>
			<view class="list-wrapper">
				<slot></slot>
			</view>
		</scroll-view>
</template>

<script>
	export default {
		methods: {
			loadMore() {
				this.$emit('loadMore')
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		box-sizing: border-box;
	}
	.list-wrapper {
		padding: 10px 0;
		box-sizing: border-box;
	}
</style>
