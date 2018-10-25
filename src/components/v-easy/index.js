import Message from './lib/message/index'
import Button from './lib/button/index'

const components = [
    Message,
    Button
];

const install = function (Vue) {

    components.forEach(component => {
       Vue.component(component.name, component)
    });

    Vue.prototype.$msg = Message;

};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
}
