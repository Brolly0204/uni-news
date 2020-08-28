<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit">
					<text v-if="!isEdit" @click="setEdit">编辑</text>
					<text v-else @click="setEdit">完成</text>
				</view>
			</view>
			<view class="loading" v-if="loading">
				<uni-load-more status="loading" iconType="snow"></uni-load-more>
			</view>
			<view v-if="labelList.length" class="label-content">
				<view
				  class="label-content__item"
					v-for="(item, index) in labelList"
					:key="item._id"
				>
				  {{ item.name }}
					<uni-icons @click.stop="delLabel(index)" v-if="isEdit" class="icons-close" type="clear" size="20" color="red"></uni-icons>
				</view>
			</view>
			<view v-if="labelList.length === 0 && !loading" class="no-data">
				暂无标签
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">标签推荐</view>
			</view>
			<view v-if="recommendList.length" class="label-content">
				<view
				  class="label-content__item"
					v-for="(item, index) in recommendList"
					:key="item._id"
					@click.stop="addLabel(index)"
				>
				  {{ item.name }}
				</view>
			</view>
			<view class="loading" v-if="loading">
				<uni-load-more status="loading" iconType="snow"></uni-load-more>
			</view>
      <view v-if="recommendList.length === 0 && !loading" class="no-data">
				暂无标签
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEdit: false,
				recommendList: [],
				labelList: [],
				loading: false
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			setEdit() {
				this.isEdit = !this.isEdit
				if (!this.isEdit) {
					this.setUpdateLabel()
				}
			},
			setUpdateLabel() {
				uni.showLoading()
				const updateIds = this.labelList.map(item => item._id)
        this.$api.update_label({
					label: updateIds
				}).then(res => {
					uni.$emit('updateLabel')
					uni.hideLoading()
					uni.showToast({
						title: '更新成功',
						icon: 'none'
					})
				}).catch(() => {
					uni.hideLoading()
				})
			},
			getLabel() {
				this.loading = true
				this.$api.get_label({
					type: 'all'
				}).then(res => {
					this.loading = false
					const { data } = res
					this.recommendList = data.filter(item => !item.current)
				  this.labelList = data.filter(item => item.current)
				}).catch(() => {
					this.loading = false
				})
			},
			addLabel(index) {
				if (!this.isEdit) return
				const label = this.recommendList.splice(index, 1)[0]
				this.labelList.push(label)
			},
			delLabel(index) {
				if (!this.isEdit) return
				const label = this.labelList.splice(index, 1)[0]
				this.recommendList.push(label)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F5F5;
	}
.label {
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
			}
			.label-edit {
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
				position: relative;
				padding: 2px 10px;
	      margin-top: 12px;
				margin: 12px 5px 0 5px;
				border-radius: 5px;
				border: 1px solid #666;
				font-size: 14px;
				color: #666;
				.icons-close {
					position: absolute;
					right: -8px;
					top: -8px;
					z-index: 10;
					background-color: #FFFFFF;
					border-radius: 50%;
					overflow: hidden;
				}
			}
		}
	}
	.loading {
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.no-data {
		height: 150px;
		line-height: 150px;
		text-align: center;
		font-size: 14px;
		color: #999999;
	}
}
</style>
