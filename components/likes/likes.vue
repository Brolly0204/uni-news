<template>
	<view class="like" @click.stop="likeTap">
		<uni-icons size="20" :type="like ? 'heart-filled' : 'heart'" color="#F07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			isLike: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				like: false
			};
		},
		watch: {
			isLike(newVal) {
				this.like = newVal
			}
		},
		created() {
			this.like = this.isLike
		},
		methods: {
			likeTap() {
				this.like = !this.like
				this.$emit('updateLike', this.like)
			}
		}
	}
</script>

<style lang="scss">
	.like {
		position: absolute;
		right: 0;
		top: 0;
		width: 30px;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
