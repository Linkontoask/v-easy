import Vue from 'vue'
import './style/webFont.css'
import Message from './message'

let MessageConstructor = Vue.extend(Message);

const Msg = {};

let instances = [];
let id = 0;

const MessageFn = function(options) {

    let _uid = 'message_' + id++;
    let userOnClose = options.onClose;

    options.onClose = function () {
        MessageFn.close(_uid, userOnClose);
    };

    const instance = new MessageConstructor({
        data: options
    });


    instance.id = _uid;
    instance.vm = instance.$mount();
    instance.vm.visible = true;
    instance.don = instance.$el;
    document.body.appendChild(instance.vm.$el);
    instances.push(instance);

    return instance.vm;
};

MessageFn.close = function(id, userOnClose) {
    for (let i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
};

Msg.install = function (Vue) {
    Vue.prototype.$msg = MessageFn;
};

export default Msg
