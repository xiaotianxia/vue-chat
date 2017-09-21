<template>
	<div class="room-info">
		<div class="members"></div>
		<div class="seetings"></div>
		<div class="logout">
			<a @click="onLogout">退出</a>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			
		}
	},

	props: {
		
	},

	methods: {
		onLogout () {
			socket.disconnect();
		}
	}
}
</script>

<style lang="less" scoped>
	.room-info {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 10000;

		.logout {
			a {
				display: block;
				margin: 0 auto;
				width: 80%;
				height: 1.5rem;
				line-height: 1.5rem;
				text-align: center;
				background-color: red;
				color: #fff;
				font-size: .5rem;
			}
		}
	}
</style>