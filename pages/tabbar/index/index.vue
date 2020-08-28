<template>
	<view class="home">
		<navbar @open="open"></navbar>
		<tab :activeIndex="activeIndex" :list="tabList" @tab="tab"></tab>
		<view class="home-list">
      <list :activeIndex="activeIndex" :tab="tabList" @change="change"></list>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [],
				activeIndex: 0
			}
		},
		onLoad() {
			uni.$on('updateLabel', () => {
				this.getLabel()
				this.activeIndex = 0
			})
			this.getLabel()
		},
		methods: {
			open() {
				uni.navigateTo({
					url: '/pages/home-search/home-search'
				})
			},
			getLabel() {
				this.$api.get_label().then(res => {
					const { data } = res
					data.unshift({
						name: '全部'
					})
					this.tabList = data
				})
			},
		  tab({data, index}) {
				this.activeIndex = index
			},
			change(index) {
				this.activeIndex = index
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;
	}
	.home {
		display: flex;
		flex: 1;
		flex-direction: column;
		overflow: hidden;
		height: 100%;
		&-list {
			flex: 1;
			height: 100%;
			overflow: hidden;
			box-sizing: border-box;
		}
	}
</style>
