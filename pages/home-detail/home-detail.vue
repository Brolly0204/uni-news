<template>
	<view class="home-detail">
    <view class="home-detail-title">
      {{formData.title}}
		</view>
    <view class="home-detail-header">
			<view class="home-detail-header__logo">
				<image :src="formData.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="home-detail-header__content">
				<view class="home-detail-header__content-title">
					{{formData.author.author_name}}
				</view>
				<view class="home-detail-header__content-info">
					<text>{{formData.create_time}}</text>
					<text>{{formData.browse_count}} 浏览</text>
					<text>{{formData.thumbs_up_count}} 赞</text>
				</view>
			</view>
		</view>
    <view class="home-detail-content">
			<view class="home-detail-content-html">
				<!-- <rich-text :nodes="formData.content"></rich-text> -->
				<!-- <u-parse :content="formData.content" :noData="noData"></u-parse> -->
			  <!-- <jyf-parser :html="formData.content"></jyf-parser> -->
				<!-- <gaoyia-parse :content="formData.content" :noData="noData"></gaoyia-parse> -->
			  内容
			</view>
			<view class="home-detail-content-comment">
				<view class="home-detail-content-comment__title">最新评论</view>
				<view
				  class="home-detail-content-comment__content"
					v-for="comment in comments"
					:key="comment.comment_id"
				>
          <comment-box :comment="comment" @reply="reply"></comment-box>
				</view>
			</view>
		</view>
    <view class="home-detail-bottom">
			<view class="home-detail-bottom__input" @click="openComment">
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="22" color="#F07373"></uni-icons>
			</view>
			<view class="home-detail-bottom__icons">
				<view class="home-detail-bottom__icons-box">
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="home-detail-bottom__icons-box">
					<uni-icons type="heart" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="home-detail-bottom__icons-box">
					<uni-icons type="hand-thumbsup" size="22" color="#F07373"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<view class="popup-header__item" @click="closeComment">取消</view>
					<view class="popup-header__item" @click="submitComment">发布</view>
				</view>
				<view class="popup-content">
					<textarea
					  class="popup-content__textarea"
						v-model="commentValues"
						fixed
						placeholder="请输入评论内容"
						maxlength="200"
					/>
				  <text class="popup-content__count">{{commentValues.length}}/200</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comments: [],
				commentValues: '',
				formData: {},
				noData: "<p style='text-align: center; color: #666'>详情加载中...</p>",
				replyFormData: {}
			}
		},
    onLoad(options) {
			this.formData = JSON.parse(decodeURIComponent(options.params) || '{}')
   //  	const eventChannel = this.getOpenerEventChannel()
			// eventChannel.on('detail', (data) => {
			// 	console.log(data)
			// })
			this.getDetail()
			this.getComments()
    },
		methods: {
			openComment() {
				this.$refs.popup.open()
			},
			closeComment() {
				this.$refs.popup.close()
				this.replyFormData = {}
			},
			submitComment(obj) {
				const value = this.commentValues.trim()
				if (value.length === 0) {
					uni.showToast({
						title: '请输入内容',
						icon: 'none'
					})
					return
				}
				
				this.setUpdateComment({
					content: this.commentValues,
					...this.replyFormData
				})
			},
			setUpdateComment(data) {
				const formData = {
					article_id: this.formData._id,
					...data
				}
				console.log(formData)
				uni.showLoading()
				this.$api.update_comment(formData).then(res => {
					this.commentValues = ''
					uni.hideLoading()
					uni.showToast({
						title: '提交成功'
					})
					this.getComments()
					this.closeComment()
					this.replyFormData = {}
				}).catch(() => {
					uni.hideLoading()
				})
			},
			getComments() {
				this.$api.get_comments({
					article_id: this.formData._id
				}).then(res => {
					console.log('data', res.data)
					this.comments = res.data
				})
			},
			getDetail() {
				this.$api.get_detail({
					article_id: this.formData._id
				}).then(res => {
					this.formData = res.data[0]
				})
			},
			reply(e) {
				const { comment_id, reply_id } = e.comment
				this.replyFormData = {
					comment_id: comment_id,
					is_reply: e.is_reply
				}
				if (reply_id) {
					this.replyFormData.reply_id = reply_id
				}
				this.openComment()
				console.log('reply-e', this.replyFormData)
			}
		}
	}
</script>

<style lang="scss">
.home-detail {
	padding: 15px 0 55px;
	&-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333333;
	}
	&-header {
		display: flex;
		padding: 0 15px;
		margin-top: 10px;
		&__logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		&__content {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 10px;
			&-title {
				font-size: 14px;
				color: #333333;
			}
			&-info {
				font-size: 12px;
				color: #999999;
				text {
					margin-right: 10px;
				}
			}
		}
	}
  &-content {
	  min-height: 500px;
		margin-top: 20px;
		&-html {
			padding: 0 15px;
		}
		&-comment {
      margin-top: 30px;
			&__title {
        padding: 10px 15px;
				font-size: 14px;
				color: #666666;
				border-bottom: 1px solid #eeeeee;
			}
			&__content {
				padding: 0 15px;
				border-top: 1px solid #eeeeee;
			}
		}
	}
  &-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 44px;
		display: flex;
		align-items: center;
		border-top: 1px solid #F5F5F5;
		box-sizing: border-box;
		background-color: #FFFFFF;
		&__input {
			width: 100%;
			height: 30px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
			margin-left: 10px;
			border: 1px solid #ddd;
			border-radius: 5px;
			text {
				font-size: 14px;
				color: #999999;
			}
		}
		&__icons {
			flex-shrink: 0;
			display: flex;
			padding: 0 10px;
      &-box {
				width: 44px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
  .popup-wrap {
		width: 100%;
		background-color: #FFFFFF;
		.popup-header {
			display: flex;
			justify-content: space-between;
			color: #666666;
			font-size: 14px;
      border: 1px solid #F5F5F5;
			&__item {
				height: 50px;
				padding: 0 15px;
				line-height: 50px;
			}
		}
		.popup-content {
			padding: 15px;
			box-sizing: border-box;
			&__textarea {
				width: 100%;
				height: 200px;
			}
			&__count {
				display: flex;
				justify-content: flex-end;
				font-size: 12px;
				color: #999999;
			}
		}
	}
}
</style>
