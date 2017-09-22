<template>
	<div id="room">
		<div class="header">
			<div v-if="showRoomInfo" class="arrow" @click="onBack">←</div>
			<p class="room-name">{{roomName}}({{userCount}})</p>
			<div class="icon-group" @click="onShowRoomInfo">人员</div>
		</div>
		<div class="chat">
			<chat-list v-if="!modalShow"
				:userInfo="userInfo"
				:chatList="chatList">
			</chat-list>
		</div>
		<div class="footer">
			<chat-input :userInfo="userInfo"></chat-input>
		</div>

		<user-modal v-if="modalShow" 
			:userInfo="userInfo" 
			@usernameInput="onUsernameInput">
		</user-modal>
		
		<transition name="slide">
			<room-info v-show="showRoomInfo"
				:roomInfo="roomInfo"
				@hideRoomInfo="onHideRoomInfo"
				:userInfo="userInfo">
			</room-info>
		</transition>
	</div>
</template>

<script>
import ChatList from './components/ChatList';
import UserModal from './components/UserModal';
import ChatInput from './components/ChatInput';
import RoomInfo from './components/RoomInfo';
import Tool from '@/utils/tools';

export default {
	data () {
		return {
			roomName: '群聊',
			userCount: 0,
			userInfo: {},
			chatList: [],
			roomInfo: {},
			modalShow: true,
			showRoomInfo: false
		}
	},

	components: {
		ChatList,
		ChatInput,
		UserModal,
		RoomInfo
	},

	methods: {
		onUsernameInput (data) {
			this.userInfo = {
				name: data.name,
				userId: Tool.genUserId(),
				avatar: Tool.randomColor(),
				roomName: this.roomName
			};
			localStorage.setItem('chat_user', JSON.stringify(this.userInfo));
			socket.emit('login', this.userInfo);
		},

		onUpdateChatList (data) {
			this.chatList.push(data);
		},

		onShowRoomInfo () {
			socket.emit('getRoomInfo');
			this.showRoomInfo = true;
		},

		onHideRoomInfo () {
			this.showRoomInfo = false;
		},

		onBack () {
			this.onHideRoomInfo();
		}
	},

	mounted () {
		let chatData = localStorage.getItem('chat_user');
		if(chatData && chatData != '[object Object]') {
			this.userInfo = JSON.parse(chatData);
			socket.emit('login', this.userInfo);
		}

		socket.on('login', data => {
			if(data.userId == this.userInfo.userId) {
				this.modalShow = false;
				data.msg = '你加入了群聊';
			}
			this.onUpdateChatList(data);
		});

		socket.on('chat', data => {
			this.onUpdateChatList(data);
		});

		socket.on('updateUserCount', data => {
			this.userCount = data.userCount;
		});

		socket.on('logout', data => {
			if(data.userId == this.userInfo.userId) {
				this.modalShow = false;
				data.msg = '你退出了群聊';
			}
			this.onUpdateChatList(data);
		});

		socket.on('getRoomInfo', data => {
			console.log(data);
			this.roomInfo = data;
		});

		socket.on('editRoomName', data => {
			if(data.userId == this.userInfo.userId) {
				data.msg = '你修改了群名为' + '“' + data.roomName + '"';
			}
			this.roomName = data.roomName;
			this.onUpdateChatList(data);
		});
	}
}
</script>

<style lang="less" scoped>
	#room {
		height: 100%;
		padding-top: 1rem;
	}
	.header,
	.chat,
	.footer {
		left: 0;
		right: 0;
	}
	.header {
		position: absolute;
		top: 0;
		height: 2rem;
		padding-left: .3rem;
		background: rgb(41, 37, 37);
		color: #fff;
		font-size: .6rem;
		z-index: 99;
		.arrow {
			position: absolute;
			left: .5rem;
			top: 50%;
			transform: translate(0, -50%);
			width: 1rem;
			height: 1rem;
			line-height: 1rem;
			font-weight: bold;
			text-align: center;
			font-size: .5rem;
		}
		.room-name {
			width: 50%;
			height: 100%;
			margin: 0 auto;
			line-height: 2rem;
			text-align: center;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.icon-group {
			position: absolute;
			top: 50%;
			transform: translate(0, -50%);
			right: .5rem;
			width: 1rem;
			height: 1rem;
			background-color: #fff;
			font-size: .3rem;
			line-height: 1rem;
			text-align: center;
			color: #000;
		}
	}
	.chat {
		position: absolute;
		top: 2rem;
		bottom: 5rem;
		overflow: auto;
		border-bottom: 1px solid #ccc;
		background-color: #eee;
	}
	.footer {
		position: absolute;
		bottom: 0;
		height: 5rem;
	}
</style>