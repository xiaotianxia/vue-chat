<template>
	<div id="room">
		<div class="header">header</div>
		<div class="chat">
			<chat-list></chat-list>
		</div>
		<div class="footer">
			<textarea placeholder="说点什么..."></textarea>
		</div>

		<user-modal :user="user"></user-modal>
	</div>
</template>

<script>
import ChatList from './components/ChatList';
import UserModal from './components/UserModal';
import Tool from '@/utils/tools';

let socket = IO.connect("ws://127.0.0.1:7000");

export default {
	data () {
		return {
			user: {}
		}
	},

	components: {
		ChatList,
		UserModal
	},

	mounted () {

		socket.emit('login', {name:'张三', id: Tool.genUserId()});
	}
}
</script>

<style lang="less" scoped>
	#room {
		padding-top: 1rem;
	}
	.header,
	.chat,
	.footer {
		left: 0;
		right: 0;
	}
	.header {
		position: fixed;
		top: 0;
		height: 2rem;
		line-height: 2rem;
		padding-left: .3rem;
		background: rgb(41, 37, 37);
		color: #fff;
		font-size: .6rem;
		z-index: 999;
	}
	.chat {
		position: absolute;
		top: 2rem;
		bottom: 3rem;
		overflow: auto;
		border-bottom: 1px solid #ccc;
		background-color: #eee;
	}
	.footer {
		position: fixed;
		bottom: 0;
		height: 3rem;
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