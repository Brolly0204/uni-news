<template>
	<swiper :current="activeIndex" class="home-swiper" @change="change">
		<swiper-item
		  v-for="(item, index) in tab"
			:key="index"
			class="home-swiper-item"
		>
			<list-item :list="listCacheData[index]" :pageSize="pageSize" :loading="load[index] && load[index].loading" @loadMore="loadMore"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import ListItem from './list-item.vue'
	export default {
		components: {
			ListItem
		},
		props: {
			tab: {
				type: Array,
				default: () => ([])
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				listCacheData: {},
				// page: 1,
				pageSize: 5,
				load: {} // 记录每个tab页 分页页码page数
			};
		},
		watch: {
			tab(newVal) {
				if (newVal.length === 0) return
				this.load = {}
				this.listCacheData = {}
				this.getList(this.activeIndex)
			}
		},
		methods: {
			getList(current) {
				if (!this.load[current]) {
					this.$set(this.load, current, {
						page: 1,
						loading: 'loading'
					})
				}
				const { page } = this.load[current]
				const {name = ''} = this.tab[current]
				this.$api.get_list({
					name,
					page,
					pageSize: this.pageSize
				}).then(res => {
					console.log(res)
					// 加载icon处理
					if (res.data.length === 0) {
						console.log(this.load[current])
						this.load[current].loading = 'noMore'
					} else {
						const oldList = this.listCacheData[current] || []
						oldList.push(...res.data)
						this.$set(this.listCacheData, current, oldList)
					}
				})
			},
			change(e) {
				const { current } = e.detail
				this.$emit('change', current)
				if (!this.listCacheData[current] || this.listCacheData[current].length === 0) {
					this.getList(current)
				}
			},
			loadMore() {
				if (this.load[this.activeIndex] && this.load[this.activeIndex].loading === 'noMore') {
					return
				}
				if (this.load[this.activeIndex]) {
					this.load[this.activeIndex].page++
				}
				this.getList(this.activeIndex)
				console.log('下拉触底')
			}
		}
	}
</script>

<style lang="scss">
.home-swiper {
	height: 100%;
	box-sizing: border-box;
	overflow: hidden;
	&-item {
		height: 100%;
		box-sizing: border-box;
		overflow: hidden;
	}
}
</style>
