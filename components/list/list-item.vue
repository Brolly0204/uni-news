<template>
	<list-scroll class="list-scroll" @loadMore="loadMore">
		<list-card
		  v-for="item in list"
			:key="item._id"
			:mode="item.mode"
			:item="item"
			@click="open"
		>
		</list-card>
		<uni-load-more iconType="snow" :status="loadStatus"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => ([])
			},
			loading: {
				type: String,
				default: 'loading'
			},
			pageSize: {
				type: Number,
				default: 5
			}
		},
		data() {
			return {
				loadStatus: 'loading'
			}
		},
		watch: {
			loading(newVal) {
				this.loadStatus = newVal
			},
			list(newVal) {
			  if (newVal.length > 0 && newVal.length < this.pageSize) {
					this.loadStatus = 'noMore'
				}	
			}
		},
		methods: {
			loadMore() {
				this.$emit('loadMore')
			},
			open(item) {
				const {
					_id,
					author,
					title,
					create_time,
					browse_count,
					thumbs_up_count,
				} = item
				const params = encodeURIComponent(JSON.stringify({
					_id,
					author,
					title,
					create_time,
					browse_count,
					thumbs_up_count,
				}))
				
				uni.navigateTo({
					url: `/pages/home-detail/home-detail?params=${params}`,
					// success(res) {
					// 	res.eventChannel.emit('detail', { data })
					// }
				})
			}
		}
	}
</script>

<style lang="scss">
	.list-scroll {
		height: 100%;
		overflow: hidden;
	}
</style>
