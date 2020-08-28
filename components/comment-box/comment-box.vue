<template>
	<view class="comment-box">
		<view class="comment-box-header">
			<view class="comment-box-header__logo">
				<image :src="comment.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="comment-box-header__info">
				<view class="comment-box-header__info-title">{{ comment.author.author_name }}</view>
				<view>{{ comment.create_time }}</view>
			</view>
		</view>
		<view class="comment-box-content">
			<view>{{ comment.comment_content }}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			comment: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				
			};
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
			}
		}
	}
  &-content {
		margin-top: 10px;
		font-size: 14px;
		color: #000000;
	}
}
</style>
