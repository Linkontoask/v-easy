import Message from './lib/message/index'
import Button from './lib/button/index'
import Ip from './lib/input/index'
import Subnet from './lib/subnet/index'
import VEPlainInput from './lib/plainInput/index'

const components = [
    Message,
    Button,
    Ip,
    Subnet,
    VEPlainInput
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
