<template>
	<div id="room">
		<div class="header">header</div>
		<div class="chat">
			<ul class="chat-list">
				<li class="chat-item system">
					<span>测试测试</span>
				</li>
				<li class="chat-item user self">
					<div class="avatar"></div>
					<div class="content">哈哈哈哈哈哈哈哈哈或或或或哈哈</div>
				</li>
				<li class="chat-item user other">
					<div class="avatar"></div>
					<div class="content">嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿</div>
				</li>
			</ul>
		</div>
		<div class="footer">
			<textarea placeholder="说点什么..."></textarea>
		</div>
	</div>
</template>

<script>
	
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
		.chat-list {
			height: 40rem;
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
					background-color: red;
				}
				.content {
					position: relative;
					padding: .2rem .4rem;
					max-width: 15rem;
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