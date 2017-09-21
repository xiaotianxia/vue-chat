<template>
	<div class="chat-input">
		<textarea placeholder="说点什么..." 
			@keyup.enter.prevent="onSubmit" 
			v-model="msg">
		</textarea>
	</div>
</template>

<script>
export default {
	data () {
		return {
			msg: ''
		}
	},

	props: {
		userInfo: {
			default: {}
		}
	},

	methods: {
		onSubmit () {
			if(this.msg == '') { return; }
			let chatMsg = {
				...this.userInfo,
				msg: this.msg
			};
			socket.emit('chat', chatMsg);
			this.msg = '';
		}
	}
}
</script>

<style lang="less" scoped>
	.chat-input {
		width: 100%;
		height: 100%;
		textarea {
			width: 100%;
			height: 100%;
			padding: .2rem;
			font-size: .5rem;
			resize: none;
			border: none;
			outline: none;
			background-color: #ddd;
		}
	}
</style>