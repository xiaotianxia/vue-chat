<template>
	<div class="modal user">
		<div class="header">
            提示      
        </div>
        <div class="content">
            <input type="text" placeholder="输入昵称" v-model="name">
        </div>
        <div class="actions">
            <a @click="onSubmit">确定</a>
        </div>
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
            })
        }
    }
}
</script>

<style scoped lang="less">
	.modal.user {
        input {
            font-size: 1rem;
        }
    }
</style>