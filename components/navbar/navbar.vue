<template>
	<view class="navbar" @click.stop="open">
		<view class="navbar-fixed">
			<view :style="{height: `${statusBarHeight}px`}"></view>
			<view
			  class="navbar-content"
				:class="{search: isSearch}"
			  :style="{height: `${navbarHeight}px`, width: `${windowWidth}px`}"
			>
				<view v-if="isSearch" class="navbar-content__search-icon" @click.stop="back">
					<uni-icons type="back" color="#fff" size="22"></uni-icons>
				</view>
				<view v-if="isSearch" class="navbar-search">
					<input class="navbar-search_text" v-model="val" @input="searchInput" type="text" placeholder="请输入你要搜索的内容">
				</view>
				<view v-else class="navbar-search">
					<view class="navbar-search_icon">
						<uni-icons type="search" size="16" color="#999999"></uni-icons>
					</view>
					<view class="navbar-search_text">uni-app vue react</view>
				</view>
			</view>
		</view>
		<view :style="{height: `${statusBarHeight + navbarHeight}px`}"></view>
	</view>
</template>

<script>
export default {
	props: {
		isSearch: {
			type: Boolean,
			default: false
		},
		value: {
			type: [String, Number],
			default: ''
		}
	},
	watch: {
		value(newVal) {
			this.val = newVal
		}
	},
	data() {
		return {
			statusBarHeight: 20,
			navbarHeight: 45,
			windowWidth: 375,
			val: ''
		}
	},
	methods: {
		open() {
      this.$emit('open')
		},
		back() {
			uni.switchTab({
				url: '/pages/tabbar/index/index'
			})
		},
		searchInput() {
			this.$emit('input', this.val)
		}
	},
	created() {
		const info = uni.getSystemInfoSync()
		this.windowWidth = info.windowWidth
		this.statusBarHeight = info.statusBarHeight
		
		// #ifndef H5 || APP-PLUS || MP-ALIPAY
		// 导航栏高度
    const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
	  this.windowWidth = menuButtonInfo.left
		this.navbarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
		// #endif
	}
};
</script>

<style lang="scss">
.navbar {
	&-fixed {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		background-color: $mk-base-color;
		z-index: 99;
		.navbar-content {
			height: 45px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 15px;
			box-sizing: border-box;
			.navbar-search {
				display: flex;
				align-items: center;
				width: 100%;
				height: 30px;
				padding: 0 10px;
				border-radius: 30px;
				background-color: #ffffff;
				&_icon {
					margin-right: 10px;
				}

				&_text {
					width: 100%;
					font-size: 14px;
					color: #999999;
				}
			}
		
		  // 搜索页面
			&.search {
				padding-left: 0;
				.navbar-content__search-icon {
					margin: 0 10px;
				}
				.navbar-search {
					border-radius: 5px;
				}
			}
		}
	}
}
</style>
