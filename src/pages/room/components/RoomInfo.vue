<template>
	<div class="room-info">
		<div class="members">
			<ul>
				<li v-for="item in roomInfo.userList" 
					:style="{'background-color': item.avatar}">
					{{item.name.substr(-1)}}
				</li>
			</ul>
		</div>
		<div class="setings">
			<label>修改群聊名称</label>
			<input type="text" placeholder="修改群名" v-model="roomInfo.roomName">
			<a @click="onSubmit">确定</a>
		</div>
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
		userInfo: {
			default: {}
		},

		roomInfo: {
			default: {}
		}
	},

	methods: {
		onLogout () {
			socket.emit('logout', this.userInfo);
			this.$emit('hideRoomInfo');
		},

		onSubmit () {
			if(this.roomInfo.roomName == '') {
                return;
            }
            socket.emit('editRoomName', {
            	...this.userInfo,
                roomName: this.roomInfo.roomName
            });
		}
	}
}
</script>

<style lang="less" scoped>
	.room-info {
		position: absolute;
		top: 2rem;
		left: 0;
		width: 100%;
		bottom: 0;
		z-index: 10000;
		background-color: #eee;
		padding: 1rem;
		.members {
			padding: .3rem;
			li {
				display: inline-block;
				width: 1.5rem;
				height: 1.5rem;
				line-height: 1.5rem;
				font-size: 1rem;
				color: #fff; 
				margin: .2rem .2rem 0 0;
				text-align: center;
			}
		}
		.setings {
			margin-top: 1rem;
			text-align: center;
            font-size: .5rem;
			label {
				font-size: .6rem;
				color: #aaa;
			}
			input {
                width: 80%;
                height: 1.5rem;
                line-height: 1.5rem;
                border: 0;
                outline: none;
                text-align: center;
                font-size: .5rem;
                background-color: transparent;
                border-bottom: 1px solid #aaa;
                &:focus {
                    border-color: #68cc8b;
                }
            }
        	a {
            	margin-top: 1rem;
				background-color: green;
				color: #fff;
        	}
		}
		.setings,
		.logout {
			a {
				display: block;
				width: 100%;
				height: 1.5rem;
				line-height: 1.5rem;
				text-align: center;
				font-size: .5rem;
			}
		}
		.logout {
			position: absolute;
			bottom: 1rem;
			left: 1rem;
			right: 1rem;
			padding: .2rem 0;
			a {
				background-color: red;
				color: #fff;
			}
		}
	}
</style>