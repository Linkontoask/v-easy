<template>
  <div id="app">
    <!--<Message />-->
      <div class="target success" @click="send('success')">success</div>
      <div class="target warning" @click="send('warning')">warning</div>
      <div class="target info" @click="send('info')">info</div>
      <div class="target error" @click="send('error')">error</div>
  </div>
</template>

<script>
// import Message from './components/message/lib/message.vue' // 开发中 调试文件

export default {
  name: 'app',
  components: {
      // Message
  },
    methods: {
        send(type) {
            switch (type) {
                case 'success': this.message(type); break;
                case 'warning': this.message(type); break;
                case 'info': this.message(type); break;
                case 'error': this.message(type); break;
            }
        },
        message(type) {
            this.$msg({
                type: type,
                message: '信息',
                duration: 2000,
                onClose: () => {
                    console.log(type);
                }
            });
        }
    }
}
</script>

<style lang="less">
    @success: #67c23a;
    @warning: #e6a23c;
    @error: #f56c6c;
    @info: #909399;
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .target {
        margin-top: 80px;
        float: left;
        padding: 12px;
        border-radius: 6px;
        cursor: pointer;
        width: 100px;
        border: 1px solid #eeeeee;
    }
    .success {
        color: @success;
    }
    .warning {
        color: @warning;
    }
    .info {
        color: @info;
    }
    .error {
        color: @error;
    }
}
</style>
