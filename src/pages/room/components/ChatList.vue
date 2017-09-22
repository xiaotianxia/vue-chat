<template>
	<ul class="chat-list js-list">
		<template v-for="item in chatList">
			<li v-if="item.type == 'system'" class="chat-item system">
				<div class="content">{{item.msg}}</div>
			</li>
			<li v-else class="chat-item user" 
				:class="[item.userId == userInfo.userId ? 'self' : 'other']">
				<div class="avatar" :style="{'background-color': item.avatar}">{{item.name.substr(-1)}}</div>
				<div class="content">{{item.msg}}</div>
			</li>
		</template>
		<li class="toView"></li>
	</ul>
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
		chatList: {
			default: []
		}
	},

	watch: {
		chatList () {
			let $toView = document.querySelector('.toView');
			$toView.scrollIntoView();
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
			.toView {
				margin-top: 1rem;
			}
		}
		.user {
			.avatar {
				width: 1rem;
				height: 1rem;
				text-align: center;
				line-height: 1rem;
				font-size: .5rem;
				color: #fff;
				background-color: #000;
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