import Vue from 'vue'
import Tip from './tip'
import { addClass, getStyle } from '../../../utils/dom'

const tipDom = Vue.extend(Tip);

const tipDirective = {};
let index = 233;

tipDirective.install = Vue => {
    const toggleTip = (el, binding) => {
        Vue.nextTick(() => {
            el.originalPosition = getStyle(el, 'position');

            let rectDom = el.getBoundingClientRect(),
                offset = binding.value.offset || 0;

            ['top', 'left'].forEach(property => {
                const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
                el.tipStyle[property] = rectDom[property] +
                    document.body[scroll] +
                    document.documentElement[scroll]
            });

            switch (el.instance.placement) {
                case 'top':
                    el.tipStyle['top'] -= (rectDom['height'] / 2 + offset);
                    el.tipStyle['left'] += (rectDom['width'] / 2);
                    break;
                case 'bottom':
                    el.tipStyle['top'] += (rectDom['height'] / 2 + offset);
                    el.tipStyle['left'] += (rectDom['width'] / 2);
                    break;
                case 'left':
                    el.tipStyle['top'] += (rectDom['height'] / 2);
                    el.tipStyle['left'] -= (6 + offset); // 支持IE
                    break;
                case 'right':
                    el.tipStyle['top'] += (rectDom['height'] / 2);
                    el.tipStyle['left'] += (rectDom['width'] + offset);
                    break;
            }

            insertDom(el, binding);
        })

    };

    const insertDom = (el, binding) => {
        if (getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
            Object.keys(el.tipStyle).forEach(property => {
                el.tip.style[property] = el.tipStyle[property] + 'px';
            });

            if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
                addClass(el, 've-tip-parent--relative');
            }

            !el.tip.isConnected && document.body.appendChild(el.tip);

        }
    };

    const addEvent = (el, binding) => {
        Vue.nextTick(() => {
            el.addEventListener('mouseenter', e => {
                if (el._uuid_tip_) {
                    el.instance.domVisible = true;
                } else {
                    el._uuid_tip_ = index;
                    let value = binding.value;
                    const tip = new tipDom({
                        el: document.createElement('div'),
                        data: {
                            ...value,
                            placement: value.placement || 'top',
                            vNode: typeof value.vNode === 'function' && value.vNode(),
                            domVisible: true
                        }
                    });
                    el.instance = tip;
                    el.tip = tip.$el;
                    el.tipStyle = {};

                }

                binding.value && toggleTip(el, binding);
            });
            el.addEventListener('mouseleave', e => {

                el.instance.leave();

            })
        });
    };

    Vue.directive('tip', {
        bind: function(el, binding, vnode) {

            el._uuid_tip_ = 0;
            if (typeof binding.value === 'string') {
                eval(`binding.value = ${binding.value}`);
            }
            addEvent(el, binding);

        },

        update: function(el, binding) {
        },

        unbind: function(el, binding) {
        }
    });
};

export default tipDirective
