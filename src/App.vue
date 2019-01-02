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
      <div class="group">
          <h4><i class="fa fa-tag"></i>输入框</h4>
          <div class="car">
              <div class="car-item">
                  <h5>IPV4(禁用)</h5>
                  <VEIp v-model="ipv4" @status="statusSay" format="ipv4" maxWidth="140" message="请输入正确的IPV4地址" @error="error" @input="input" :disabled="true"></VEIp>
              </div>
              <div class="car-item">
                  <h5>IPV4</h5>
                  <VEIp v-model="ipv4" @status="statusSay" format="ipv4" maxWidth="140" message="请输入正确的IPV4地址" @error="error" @input="inputTest"></VEIp>
              </div>
              <div class="car-item">
                  <h5>IPV4(只读)</h5>
                  <VEIp v-model="ipv4Model" format="ipv4" maxWidth="140" message="请输入正确的IPV4地址" @error="error" @input="input" :readonly="true"></VEIp>
              </div>
              <div class="car-item">
                  <h5>子网掩码(禁用)</h5>
                  <VESubnet v-model="subMask" @status="statusSay" maxWidth="140" style="color: red" :disabled="true"></VESubnet>
              </div>
              <div class="car-item">
                  <h5>子网掩码(只读)</h5>
                  <VESubnet v-model="subMask" @status="statusSay" maxWidth="140" style="color: red" readonly="true"></VESubnet>
              </div>
              <div class="car-item">
                  <h5>子网掩码</h5>
                  <VESubnet v-model="subMaskTest" @status="statusSay" maxWidth="140" style="color: red" @input="subTest"></VESubnet>
              </div>
          </div>
          <div class="car" style="display: none;">
              <div class="car-item">
                  <h5>IPV6</h5>
                  <VEIp v-model="ipv6" format="ipv6" message="请输入正确的IPV6地址" width="530"></VEIp>
              </div>
          </div>
          <div class="car box input">
              <div class="car-item remove-margin">
                  <h5>校验框(长度校验,失去焦点触发)</h5>
                  <VEPlainInput v-model="plain.q" message="字符超出范围" :options="{
                    min: 20,
                    max: 30
                  }" @input="plainInput"></VEPlainInput>
              </div>
              <div class="car-item remove-margin">
                  <h5>校验框(正则校验手机号,失去焦点触发)</h5>
                  <VEPlainInput v-model="plain.w" message="请输入正确的手机号" type="reg" inspect="^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$" @input="plainInput"></VEPlainInput>
              </div>
              <div class="car-item remove-margin">
                  <h5>校验框(输入时触发)</h5>
                  <VEPlainInput v-model="plain.e" message="名字中必须包含link" type="reg" inspect="link" target="input" @input="plainInput"></VEPlainInput>
              </div>
              <div class="car-item remove-margin">
                  <h5>禁用</h5>
                  <VEPlainInput v-model="plain.r" disabled="true"></VEPlainInput>
              </div>
              <div class="car-item remove-margin">
                  <h5>只读</h5>
                  <VEPlainInput v-model="plain.t" readonly="true"></VEPlainInput>
              </div>
          </div>
      </div>
      <div class="group">
          <h4><i class="fa fa-tag"></i>Switch 开关</h4>
          <div class="car">
              <VESwitch v-model="veSwitch.one"
                        active-color="#13ce66"
                        inactive-color="#ff4949"></VESwitch>
              <VESwitch
                      style="display: block"
                      v-model="veSwitch.two"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-text="按月数"
                      inactive-text="按年份">
              </VESwitch>
              <VESwitch
                      v-model="veSwitch.three"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                      active-value="100"
                      inactive-value="0">
              </VESwitch>
              <span>{{ veSwitch.three }}</span>
          </div>
      </div>
  </div>

</template>

<script>

export default {
  name: 'app',
  components: {
      // Message
  },
    data() {
      return {
          ipv4: '',
          ipv4Model: '',
          ipv6: [],
          subMask: [252,255,0,0],
          subMaskTest: '',
          plain: {},
          veSwitch: {}
      }
    },
    watch: {
      'plain.q'(val) {
          console.log(val);
      }
    },
    methods: {
        subTest() {
            this.subMask = this.subMaskTest;
            console.log(this.subMaskTest)
        },
        inputTest() {
            this.ipv4Model = this.ipv4;
            console.log(this.ipv4);
        },
        plainInput() {
            this.$set(this.plain, 'w', this.plain.q);
            console.log(this.plain)
        },
        statusSay(val) {
            // console.log(val);
        },
        input(val) {
            console.log(val);
        },
        error(ip) {
            // console.log('error', ip)
        },
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
    },
    mounted() {
      this.$set(this.plain, 't' ,'只读信息');
      // this.ipv4 = '127.0.0.1';
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
        position: relative;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        border: 1px solid #eee;
        padding: 12px 0;
        min-height: 64px;
        > div {
            margin: 12px;
        }
        h5 {
            width: 100%;
            text-align: left;
            margin-top: 0;
            padding-left: .5rem;
            margin-bottom: 0.4rem;
        }
        .car-item {
            width: 220px;
            span {
                display: block;
                margin-top: -60px;
            }
        }
        @left: 260px;
        .remove-margin:nth-child(2) {
            left: @left * 1;
            width: 236px;
        }
        .remove-margin:nth-child(3) {
            left: @left * 2;
        }
        .remove-margin:nth-child(4) {
            left: @left * 3;
        }
        .remove-margin:nth-child(5) {
            left: @left * 4;
        }
    }
    .input {
        align-items: flex-start;
    }
    .car+.car {
        margin-top: 12px;
    }
    .box {
        min-height: 84px;
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
