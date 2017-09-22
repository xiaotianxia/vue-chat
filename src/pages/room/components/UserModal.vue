<template>
	<div class="modal user">
        <div class="body">
            <div class="content">
                <input type="text" placeholder="输入昵称" v-model="name" @keyup.enter="onSubmit">
            </div>
            <div class="actions">
                <a @click="onSubmit">确定</a>
            </div>
        </div>
        <div class="mask"></div>
	</div>
</template>

<script>
export default {
    data () {
        return {
            name: ''
        }
    },

    methods: {
        onSubmit () {
            if(this.name == '') {
                return;
            }
            this.$emit('usernameInput', {
                name: this.name
            });
        }
    }
}
</script>

<style scoped lang="less">
	.modal.user {
        border-radius: .2rem;
        .content {
            padding-top: .3rem;
            input {
                font-size: 1rem;
                width: 100%;
                border: 0;
                outline: none;
                text-align: center;
                border-bottom: 1px solid #aaa;
                &:focus {
                    border-color: #68cc8b;
                }
            }
        }
        .actions {
            margin-top: 1rem;
            text-align: center;
            a {
                display: inline-block;
                width: 100%;
                height: 1.8rem;
                line-height: 1.8rem;
                background-color: #68cc8b;
            }
        }
    }
</style>