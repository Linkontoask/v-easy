<template>
  <div id="app">
    <!--<Message />-->
      <h1><i class="fa fa-hand-o-right" aria-hidden="true" style="margin-right: 10px;"></i>V-easy<i class="fa fa-hand-o-left" aria-hidden="true" style="margin-left: 10px;"></i></h1>
      <div class="group">
          <h4><i class="fa fa-tag"></i>按钮</h4>
          <div class="car btn">
              <VEButton @click="send('info')" class="center" :plain="true" icon="snowflake-o">info</VEButton>
              <VEButton @click="send('success')" class="center" :plain="true" type="success" icon="bath">success</VEButton>
              <VEButton @click="send('info')" class="center" :plain="true" type="primary" icon="telegram">primary</VEButton>
              <VEButton @click="send('warning')" class="center" :plain="true" type="warning" icon="etsy">warning</VEButton>
              <VEButton @click="send('error')" class="center" :plain="true" type="error" icon="superpowers">error</VEButton>
          </div>
          <div class="car btn">
              <VEButton @click="send('info')" class="center" icon="quote-right">普通按钮</VEButton>
              <VEButton @click="send('success')" class="center" type="success" :mask="true">成功按钮</VEButton>
              <VEButton @click="send('info')" @mouseenter="enter" class="center" type="primary" :disabled="true">主要按钮</VEButton>
              <VEButton @click="send('warning')" class="center" type="warning">警告按钮</VEButton>
              <VEButton @click="send('error')" class="center" type="error" icon="times-circle">危险按钮</VEButton>
          </div>
          <div class="car btn">
              <VEButton @click="send('info')" class="center" icon="spinner" :circle="true" :rotate="true"></VEButton>
              <VEButton @click="send('success')" class="center" type="success" icon="grav" :circle="true" :disabled="true"></VEButton>
              <VEButton @click="send('info')" class="center" type="primary" icon="chrome" :rotate="true" :circle="true"></VEButton>
              <VEButton @click="send('warning')" class="center" type="warning" icon="exclamation-triangle" :circle="true"  ></VEButton>
              <VEButton @click="send('error')" class="center" type="error" icon="user-circle" :circle="true" :mask="true"></VEButton>
          </div>
      </div>
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
        enter() {
            this.send('success');
        },
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
                    // console.log(type);
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
    .group {
        margin: 24px 0;
        padding: 24px;
        border: 1px solid #eee;
        h4 {
            text-align: left;
        }
    }
    .car {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        border: 1px solid #eee;
        padding: 12px 0;
        div {
            margin: 12px;
        }
    }
    .car+.car {
        margin-top: 12px;
    }
    .btn {
        justify-content: flex-start;
    }
    .target {
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
    .center {
        display: block;
    }
}
    .group i {
        margin-right: 12px;
    }
</style>
