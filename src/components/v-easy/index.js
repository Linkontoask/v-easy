import Message from './lib/message/index'
import Button from './lib/button/index'
import Ip from './lib/input/index'
import Subnet from './lib/subnet/index'
import VEPlainInput from './lib/plainInput/index'
import VESwitch from './lib/switch/index'
import locale from './local/index'
import vTip from './lib/tooltip/index'

const components = [
    Message,
    Button,
    Ip,
    Subnet,
    VEPlainInput,
    VESwitch,
];

const install = function (Vue, opts = {}) {
    locale.use(opts.locale);
    locale.i18n(opts.i18n);

    components.forEach(component => {
       Vue.component(component.name, component)
    });

    Vue.use(vTip.directive);

    Vue.prototype.$msg = Message;

};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
}
