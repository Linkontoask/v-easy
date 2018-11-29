<template>
    <div :class="['v-easy-input', 'input', 'input-ip']"
        :style="{
                'max-width': maxWidth + 'px',
                'width': width + 'px'
         }">
        <ul ref="box" :class="disabled
                              ? 'disabled'
                              : ''">
            <li v-for="(item, index) in vHtml" :key="index" :class="format">
                <input type="text"
                       :maxlength="maxlength"
                       :value="result[index]"
                       :readonly="readonly"
                       :class="inputRed[index]"
                       :disabled="disabled"
                       v-bind="$attrs"
                       @keydown="keyDown"
                       @input="handleInput(index, $event)"
                       @focus="handleFocus(index, $event)"
                       @blur="handelBlur(index, $event)">
                <span v-if="index !== (vHtml.length - 1)">{{ splitChar }}</span>
            </li>
        </ul>
        <transition name="v-easy-error">
            <div class="error inspection" v-show="isIP">{{ message }}</div>
        </transition>
    </div>
</template>

<script>
    export default {
        model: {
            event: 'changeResult'
        },
        name: 'VEIp',

        data() {
          return {
              inputRed: [],
              currentIndex: 0,
              maxlength: '3',
              isIP: false,
              isString: false
          }
        },

        props: {
            maxWidth: {type: String},
            width: [String],
            disabled: {type: [Boolean, String], default: false},
            spliceChar: {type: String, default: '.'},
            readonly: {type: [Boolean, String], default: false},
            message: {type: String, default: '请输入正确的IP地址'},
            value: [String, Array],
            format: {type: String, default: 'ipv4'}
        },

        watch: {
            isIP(val) {
                this.$emit('status', !val);
            },
            result(val) {
                let statusSuccess = true;
                for (let i = 0; i < 4; i++) {
                    if (typeof val[i] === 'undefined') {
                        statusSuccess = false;
                    }
                }
                if (statusSuccess && val.length > 3) this.$emit('status', this.isIpv4Reg(val.join('.')));
            }
        },

        computed: {
            result() {
                let data = [];
                data = this.value === undefined || this.value === null
                    ? []
                    : this.value;
                if (!Array.isArray(this.value)) {
                    this.isString = true;
                    data = data.split('.');
                }
                return data;
            },
            splitChar() {
                if (this.spliceChar !== '.') {
                    return this.spliceChar;
                }
                return this.format === 'ipv4' ? '.' : ':';
            },
            vHtml() {
                let len = [];
                if (this.format === 'ipv4') {
                    this.maxlength = '3';
                    for(let i = 0; i < 4; i++) {
                        len.push('')
                    }
                } else if (this.format === 'ipv6' ){
                    this.maxlength = '4';
                    for(let i = 0; i < 8; i++) {
                        len.push('')
                    }
                }
                return len;
            }
        },

        methods: {
            handleInput(index, $event) {

                this.setCurrentValue($event.target.value, index);

                this.format === 'ipv4' ? this.isIpv4(index) : this.isIpv6(index, $event);

                // 自动对焦
                if (this.result[index] && this.result[index].length === Number(this.maxlength) && index < (this.vHtml.length - 1)) {
                    this.$refs.box.getElementsByTagName('input')[index + 1].focus();
                }

                this.$emit('input', {$event, index});

            },

            isIpv4(index) {
                // 只允许数字
                let regNumber = /[^0-9]|^0+(?!$)/g;
                this.result[index] = this.result[index] && this.result[index].replace(regNumber, '');
                // 结束

                // 正则检验

                if (this.result[index] && this.result[index].length > 3 && index === 3) {
                    this.result[index] = this.result[index].substring(4, 1);
                }

                if (this.result[index] > 255 && (!this.isIpv4Reg(this.result.join('.'))) && this.result[index] && this.result[index].toString().length !== 0) {
                    this.inputRed[index] = 'red';
                    this.isIP = true;
                    this.$emit('error', this.isString ? this.result.join('.') : this.result);
                } else {
                    this.inputRed[index] = 'none';
                    this.isIP = false;
                    this.inputRed.forEach(item => {
                        if (item === 'red') {
                            this.isIP = true;
                            this.$emit('error', this.isString ? this.result.join('.') : this.result);
                            this.$emit('error', this.isString ? this.result.join('.') : this.result);
                        }
                    });
                }
            },

            isIpv4Reg(ip) {
                let regexp = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-4][0-9])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/;
                return regexp.test(ip);
            },

            isIpv6(index, $event) {
                let regexp = /^[0-9a-fA-F]{0,}$/g;
                if (!regexp.test(this.result[index])) {
                    this.result[index] = this.result[index] && this.result[index].substring(0, this.result[index].length - 1);
                }
            },

            handleFocus(index, $event) {
                this.currentIndex = index;
                this.$emit('focus', {$event, index});
            },

            handelBlur(index, $event) {
                if (index === 7) {
                    let regexp = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
                    if (regexp.test(this.result.join(':'))) {
                        this.isIP = false
                    } else {
                        this.isIP = true;
                        this.$emit('error', this.result);
                    }
                }
                this.$emit('blur', {$event, index});
            },

            keyDown(evt) {
                if (evt.keyCode === 8 && this.currentIndex !== 0 && (!this.result[this.currentIndex] || this.result[this.currentIndex].length === 0)) {
                    this.$refs.box.getElementsByTagName('input')[this.currentIndex - 1].focus();
                }
            },

            setCurrentValue (value, index) {
                if (value.toString() === this.result.join('.')) return;
                typeof index !== 'undefined' ? this.$set(this.result, index, value) : this.result = value;
                this.$emit('changeResult', this.isString ? this.result.join('.') : this.result);
            },

        }
    }
</script>

<style scoped lang="less">
    @import "../../../style/input/input";
</style>
