<h1 align="center">V-easy</h1>

<p align="center">
	<a href="https://github.com/Linkontoask/v-easy"><img src="https://img.shields.io/badge/v--easy-v0.2.24-blue.svg" alt=""></a>
	<a href="https://github.com/Linkontoask/v-easy"><img src="https://img.shields.io/badge/size-239kb-green.svg" alt=""></a>
	<a href="https://github.com/Linkontoask/v-easy"><img src="https://img.shields.io/badge/vue-2.x-orange.svg" alt=""></a>
	<a href="https://github.com/Linkontoask/v-easy"><img src="https://img.shields.io/badge/license-MIT-red.svg" alt=""></a>
</p>

### Demo
[OnlineDemo](https://linkontoask.github.io/demo/v-easy/index.html)

### Document
[Official website](http://linkorg.club)

### Install
```
npm install v-easy-message -s
```

### Quick Start
``` javascript
import vEasy from 'v-easy-message'

Vue.use(vEasy);
```

### use I18n
```javascript
import vEasy from 'v-easy-message'
import locale from 'v-easy-message/local/en'

Vue.use(vEasy, { locale });
```

### use babel
``` javascript
module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('/node_modules/v-easy-message')]
      }
    ]
  },
```

### Demo
``` javascript
<template>
    <VEButton @click="send('info')" class="center" type="primary" icon="chrome" :rotate="true" :circle="true"></VEButton>
    <VEPlainInput v-model="str" message="字符超出范围" 
        :options="{min: 20,max: 30}" 
        @input="plainInput"></VEPlainInput>
</template>

<script>
export default {
    data() {
        return: {
            str: ''
        }
    },
    methods: {
        plainInput(val) {
            console.log(`%c input ${this.str}`, 'color: blue');
        },
        send(type) {
            this.$msg({
                type: type, //'success', 'error','info','warning'
                message: 'infomation',
                duration: 3000,
                onClose: () => {
                    console.log('callback');
                }
            });
        }
    }
}
</script>
```

### Update
+ 0.2.25
    + ve-ip和ve-subnet发生错误不会自动对焦到下一位
    + 新增v-tip信息框
+ 0.1.48
    + 新增ve-plain-input触发接收类型，支持多种类型触发检测
+ 0.1.18
    + ve-ip和ve-subnet类似于windows输入框，可使用鼠标操作，小数点偏移
+ 0.1.16
    + 修复ve-ip、ve-plain-input、ve-subnet绑定数据的问题
+ 0.1.13
    + 新增ve-plain-input组件
+ 0.1.12
    + 优化ve-ip和ve-subnet组件
+ 0.0.8
    + 新增ve-subnet组件，优化样式代码
+ 0.0.5
    + 新增ve-ip组件
+ 0.0.4
    + 新增ve-button组件
+ 0.1.0
    + 支持使用this.$msg呼叫message信息

### LICENSE
[MIT](https://github.com/Linkontoask/v-easy/blob/master/src/components/message/LICENSE)
