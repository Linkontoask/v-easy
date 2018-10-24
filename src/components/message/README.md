<h1 align="center">v-easy-message</h1>

<p align="center">
	<img src="https://img.shields.io/badge/v--easy-v0.0.2-blue.svg" alt="">
	<img src="https://img.shields.io/badge/size-541kb-green.svg" alt="">
	<img src="https://img.shields.io/badge/vue-2.x-orange.svg" alt="">
</p>

<p align="center">
	<img src="./img/success.png" alt="">
	<img src="./img/error.png" alt="">
	<img src="./img/warning.png" alt="">
	<img src="./img/info.png" alt="">
</p>

### Install
```
npm install v-easy-message -s
```

### Quick Start
``` javascript
import msg from 'v-easy-message'

Vue.use(msg);
```

### Code Start
``` javascript
this.$msg({
    type: 'success', // 'error','info','warning'
    message: 'infomation',
    duration: 3000,
    onClose: () => {
        console.log('callback');
    }
});
```

### LICENSE
[MIT](https://github.com/Linkontoask/v-easy/blob/master/src/components/message/LICENSE)