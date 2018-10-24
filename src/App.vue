<template>
  <div id="app">
    <Message ref="message" />
  </div>
</template>

<script>
import Message from './components/message/message.vue' // 开发中 调试文件

export default {
  name: 'app',
  components: {
      Message
  },
    methods: {
      send() {
          var vm = this.$msg({
              type: 'info',
              message: '信息',
              duration: 2000,
              onClose: () => {
              }
          });
      }
    }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
