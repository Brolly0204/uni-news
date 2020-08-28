<template>
	<view class="home">
		<navbar :isSearch="true" v-model="value" @input="change"></navbar>
		<view class="home-list">
			<view v-if="isHistory" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view v-if="historyLists.length > 0" class="label-content">
					<view @click="openHistory(item)" class="label-content__item" v-for="(item, index) in historyLists" :key="index">
						{{item.name}}
					</view>
				</view>
				<view v-else class="no-data">
					暂无搜索历史
				</view>
		  </view>
			<view v-else class="search-list">
				<list-scroll class="list-scroll">
          <uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
					<view v-if="searchList.length && !loading" >
						<list-card
							v-for="item in searchList"
							:key="item._id"
							:mode="item.mode"
							:item="item"
							@click="setHistory"
						>
						</list-card>
					</view>
					<view v-if="searchList.length === 0 && !loading" class="no-data">
						暂无搜索内容
					</view>
				</list-scroll>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState, mapActions } from 'vuex'
	export default {
		data() {
			return {
				searchList: [],
				isHistory: true,
				value: '',
				loading: false
			}
		},
		computed: {
			...mapState(['historyLists'])
		},
		watch: {
			value(newVal) {
				if (!newVal) this.isHistory = true
			}
		},
		methods: {
			...mapActions(['set_history_lists', 'clear_history_lists']),
			change(value) {
				if (!value) {
					this.isHistory = true
					return
				}
				this.timer && clearTimeout(this.timer)
				this.isHistory = false
				this.timer = setTimeout(() => {
					this.getSearch(value)
				}, 300)
			},
			clear() {
				this.clear_history_lists()
				uni.showToast({
					title: '清空完成'
				})
			},
			getSearch(value) {
				this.loading = true
				this.$api.get_search({ value }).then(res => {
					console.log('res', res)
					this.loading = false
				  this.searchList = res.data
				}).catch(() => {
					this.loading = false
				})
			},
			setHistory() {
				this.set_history_lists({
					name: this.value
				})
			},
			openHistory(item) {
				this.isHistory = false
				this.value = item.name
				this.getSearch(this.value)
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		overflow: hidden;
		background-color: #F5F5F5;
	}
	.home { 
		display: flex;
		flex-direction: column;
		height: 100%;
		.home-list {
			flex: 1;
			.label-box {
				background-color: #FFFFFF;
				margin-bottom: 10px;
				.label-header {
					display: flex;
					justify-content: space-between;
					font-size: 14px;
					color: #666;
					padding: 10px 15px;
					border-bottom: 1px solid #F5F5F5;
					.label-title {
						color: $mk-base-color;
					}
					.label-clear {
						color: #30b33a;
						font-weight: bold;
					}
				}
			  .label-content {
					display: flex;
					flex-wrap: wrap;
					justify-content: flex-start;
					padding: 0 15px 15px 15px;
					&__item {
						padding: 2px 10px;
            margin-top: 12px;
						margin: 12px 5px 0 5px;
						border-radius: 5px;
						border: 1px solid #666;
						font-size: 14px;
						color: #666;
					}
				}
			}
		  .no-data {
				width: 100%;
				height: 200px;
				line-height: 200px;
				text-align: center;
				color: #666;
				font-size: 14px;
				background-color: #FFFFFF;
			}
		}
	}
</style>
