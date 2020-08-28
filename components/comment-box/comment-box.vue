<template>
	<view class="comment-box">
		<view class="comment-box-header">
			<view class="comment-box-header__logo">
				<image :src="comment.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-box-header__info">
				<view v-if="!isReply" class="comment-box-header__info-title">{{ comment.author.author_name }}</view>
				<view v-else class="comment-box-header__info-title">
					{{comment.author.author_name}}
					<text class="reply-text">回复</text>
					{{comment.to}}
				</view>
				<view>{{ comment.create_time }}</view>
			</view>
		</view>
		<view class="comment-box-content">
			<view>{{ comment.comment_content }}</view>
			<view class="comments-info">
				<view class="comments-button" @click="commentReply({comment, is_reply: isReply})">回复</view>
			</view>
			<view
			  class="comments-reply"
			  v-for="item in comment.replys"
				:key="item.comment_id"
			>
				<comment-box :isReply="true" :comment="item" @reply="commentReply"></comment-box>
			</view>
		</view>
	</view>
</template>

<script>
	import commentBox from '@/components/comment-box/comment-box.vue'
	export default {
		name: 'commentBox',
		components: {
			commentBox
		},
		props: {
			comment: {
				type: Object,
				default: () => ({})
			},
			isReply: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			commentReply(commentObj) {
				const { comment_id } = commentObj.comment
				
				let replyComment = {
					comment_id: comment_id
				}

				if (commentObj.is_reply) { // 子回复 不是文章评论
				  // commentObj.comment 回复的那条评论
					// 回复的那条消息的文章评论id
					replyComment.comment_id = this.comment.comment_id
				  // 回复的那条消息的comment_id 
					replyComment.reply_id = comment_id
				}
				
				this.$emit('reply', {
					comment: replyComment,
					is_reply: commentObj.is_reply
				})
			}
		}
	}
</script>

<style lang="scss">
.comment-box {
	margin: 15px 0;
	
	&-header {
		display: flex;
		&__logo {
			flex-shrink: 0;
			width: 30px;
			height: 30px;
			border-radius: 5%;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		&__info {
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			color: #999999;
			font-size: 12px;
			&-title {
				font-size: 14px;
				color: #333333;
				.reply-text {
					margin: 0 10px;
					font-weight: bold;
					color: #000000;
				}
			}
		}
	}
  &-content {
		margin-top: 10px;
		font-size: 14px;
		color: #000000;
		.comments-info {
			display: flex;
			margin-top: 15px;
		  .comments-button {
				padding: 2px 10px;
				font-size: 12px;
				color: #999999;
				border-radius: 20px;
				border: 1px solid #cccccc;
			}
		}
		.comments-reply {
			display: flex;
			margin: 15px 0;
			padding: 0 10px;
			border: 1px solid #eeeeee;
		}
	}
}
</style>
