<template>
	<ul class="chat-list">
		<li v-for="item in chatList" class="chat-item" 
			:class="[(item.type == 'system' &&  !item.userId) ? 'system' : 'user', {'self': item.userId == userInfo.userId, 'other': item.type != 'system' && item.userId != userInfo.userId}]">
			<div v-if="item.type != 'system'" class="avatar">{{item.username.substr(-1)}}</div>
			<div class="content">{{item.msg}}</div>
		</li>
	</ul>
</template>

<script>
export default {
	data () {
		return {
			userInfo: {
				username: '张三',
				userId: '123456'
			},
			chatList: [
				{
					type: 'system',
					msg: '欢迎光临',
				},
				{
					type: 'user',
					username: '张三',
					userId: '123456',
					msg: '哈哈哈哈哈哈哈哈哈或或或哈哈哈哈哈哈或或或哈哈哈哈哈哈或或或哈哈哈哈哈哈或或或哈哈哈哈哈哈或或或哈哈哈哈哈哈或或或哈哈哈哈哈哈或或或哈哈哈哈哈哈或或或哈哈哈哈哈哈或或或哈哈哈哈哈哈或或或哈哈哈哈哈哈或或或或哈哈',
				},
				{
					type: 'user',
					username: '李四',
					userId: '2343213',
					msg: '哦',
				},
				{
					type: 'user',
					username: '李四',
					userId: '2343213',
					msg: '嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿',
				}
			]
		}
	}
}
</script>

<style lang="less" scoped>
	.chat-list {
		.chat-item {
			margin: .5rem 0;
			padding: 0 .3rem;
			font-size: .5rem;
			overflow: hidden;
		}
		.user {
			.avatar {
				width: 1rem;
				height: 1rem;
				text-align: center;
				line-height: 1rem;
				font-size: .5rem;
				background-color: red;
				color: #fff;
			}
			.content {
				position: relative;
				padding: .2rem .4rem;
				max-width: 15rem;
				min-width: 1.5rem;
				min-height: 1rem;
				&:before {
					position: absolute;
					content: '';
					display: inline-block;
					width: 0;
					height: 0;
					border-style: solid;
					border-width: .2rem;
				}
			}
		}
		.self {
			.avatar,
			.content {
				float: right;
			}
			.content {
				margin: -.03rem .4rem 0 0;
				background-color: rgba(107, 197, 107, 0.85);
				&:before {
					right: -.35rem;
					border-color: transparent transparent transparent rgba(107, 197, 107, 0.85);
				}
			}
		}
		.other {
			.avatar,
			.content {
				float: left;
			}
			.content {
				margin: -.03rem 0 0 .4rem;
				background-color: #fff;
				&:before {
					left: -.4rem;
					border-color: transparent #fff transparent transparent;
				}
			}
		}
		.system {
			color: rgba(0, 0, 0, .8);
			text-align: center;
		}
	}
</style>