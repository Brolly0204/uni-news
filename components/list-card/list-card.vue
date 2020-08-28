<template>
	<view @click="open">
		<!-- 左图右文 -->
		<view v-if="mode === 'base'" class="listcard">
			<view class="listcard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content__title">
					<text>{{item.title}}</text>
					<likes @updateLike="updateLike" :isLike="item.is_like"></likes>
				</view>
				<view class="listcard-content__desc">
					<view class="listcard-content__desc-label">
						<view class="listcard-content__desc-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="listcard-content__desc-browse">
						{{item.browse_count}}浏览量
					</view>
				</view>
			</view>
		</view>
		
		<!-- 多图模式 -->
		<view v-if="mode === 'column'" class="listcard model-column">
			<view class="listcard-content">
				<view class="listcard-content__title">
					<text>{{item.title}}</text>
					<likes @updateLike="updateLike" :isLike="item.is_like"></likes>
				</view>
				<view class="listcard-image">
					<view v-if="index < 3" v-for="(img, index) in item.cover" :key="index" class="listcard-image__item">
						<image :src="img" mode="aspectFill"></image>
					</view>
				</view>
				<view class="listcard-content__desc">
					<view class="listcard-content__desc-label">
						<view class="listcard-content__desc-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="listcard-content__desc-browse">
						{{item.browse_count}}浏览量
					</view>
				</view>
			</view>
		</view>
		
		<!-- 大图模式 -->
		<view v-if="mode === 'image'" class="listcard model-image">
			<view class="listcard-image">
				<image :src="item.cover[0]" mode="aspectFill"></image>
			</view>
			<view class="listcard-content">
				<view class="listcard-content__title">
					<text>{{item.title}}</text>
					<likes @updateLike="updateLike" :isLike="item.is_like"></likes>
				</view>
				<view class="listcard-content__desc">
					<view class="listcard-content__desc-label">
						<view class="listcard-content__desc-label-item">
							{{item.classify}}
						</view>
					</view>
					<view class="listcard-content__desc-browse">
						{{item.browse_count}}浏览量
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			mode: {
				type: String,
				default: 'base'
			},
			item: {
				type: Object,
				default: () => ({})
			}
		},
		data () {
			return {
				like: false
			}
		},
		methods: {
			open() {
				this.$emit('click', this.item)
			},
			updateLike(like) {
				this.like = like
				uni.showLoading()
				const data = {
					article_id: this.item._id
				}
			  this.$api.update_like(data).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: like ? '收藏成功' : '取消收藏',
						icon: 'none'
					})
				}).catch(() => {
					uni.hideLoading()
				})
			}
 		}
	}
</script>

<style lang="scss">
.listcard {
	display: flex;
	padding: 10px;
	margin: 0 10px 10px 10px;
	border-radius: 5px;
	box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: .1);
	box-sizing: border-box;
	.listcard-image {
		flex-shrink: 0;
		width: 60px;
		height: 60px;
		border-radius: 5px;
		overflow: hidden;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.listcard-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-left: 10px;
		width: 100%;
		&__title {
			position: relative;
			font-size: 14px;
			color: #333333;
			font-weight: 400;
			line-height: 1.2;
			padding-right: 30px;
			text {
				display: -webkit-box;
				text-overflow: ellipsis;
				overflow: hidden;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}
		}
		&__desc {
			display: flex;
			justify-content: space-between;
			font-size: 12px;
			&-label {
				display: flex;
				&-item {
					padding: 0 5px;
					margin-right: 5px;
					color: $mk-base-color;
					border: 1px solid $mk-base-color;
					border-radius: 10px;
				}
			}
			&-browse {
				color: #999999;
				line-height: 1.5;
			}
		}
	}

  &.model-column {
		.listcard-content {
			padding-left: 0;
			&__desc {
				margin-top: 10px;
			}
		}
		.listcard-image {
		  display: flex;
			width: 100%;
			height: 70px;
			margin-top: 10px;
			&__item {
				margin-left: 10px;
				width: 100%;
				border-radius: 5px;
				overflow: hidden;
				&:first-child {
					margin-left: 0;
				}
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	&.model-image {
		flex-direction: column;
		.listcard-image {
			width: 100%;
			height: 100px;
		}
		.listcard-content {
			margin-top: 10px;
			padding-left: 0;
			&__desc {
				display: flex;
				align-items: center;
				margin-top: 10px;
			}
		}
	}
}
</style>

<el-tab-pane>
	<span slot="label">
		<span class="tab-text">API</span>
		<span>(6)</span>
	</span>
</el-tab-pane>

<el-tab-pane>
	<span slot="label">
		<span class="tab-text">产品</span>
		<span>(6)</span>
	</span>
</el-tab-pane>
