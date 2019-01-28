<h1 align="center">V-easy</h1>

<p align="center">
	<a href="https://github.com/Linkontoask/v-easy"><img src="https://img.shields.io/badge/v--easy-v0.2.23-blue.svg" alt=""></a>
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

### LICENSE
[MIT](https://github.com/Linkontoask/v-easy/blob/master/src/components/message/LICENSE)
