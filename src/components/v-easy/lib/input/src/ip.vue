<template>
    <div class="v-easy-input input input-ip"
        :class="">
        <ul ref="box">
            <li v-for="(item, index) in vHtml" :key="index" :class="format">
                <input type="text"
                       :maxlength="maxlength"
                       v-model="result[index]"
                       :readonly="readonly"
                       :class="inputRed[index]"
                       @keydown="keyDown"
                       @input="checkResult(index, $event)"
                       @focus="next(index)"
                       @blur="handelBlur(index)">
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
            spliceChar: {type: String, default: '.'},
            readonly: {type: Boolean, default: false},
            message: {type: String, default: '请输入正确的IP地址'},
            value: [String, Array],
            format: {type: String, default: 'ipv4'}
        },

        watch: {
            result(val) {
                this.$emit('changeResult', this.isString ? val.join('.') : val);
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
            checkResult(index, $event) {

                // 传入value为string
                if (this.isString) {
                    this.$emit('changeResult', this.result.join('.'));
                }

                this.format === 'ipv4' ? this.isIpv4(index) : this.isIpv6(index, $event);

                // 自动对焦
                if (this.result[index] && this.result[index].length === Number(this.maxlength) && index < (this.vHtml.length - 1)) {
                    this.$refs.box.getElementsByTagName('input')[index + 1].focus();
                }

                this.$emit('input', this.isString ? this.result.join('.') : this.result);

            },

            isIpv4(index) {
                // 只允许数字
                let regNumber = /[^0-9]|^0+(?!$)/g;
                this.result[index] = this.result[index] && this.result[index].replace(regNumber, '');
                // 结束

                // 正则检验
                let regexp = /^(?:(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:1[0-9][0-9]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:2[0-4][0-9])|(?:25[0-5])|(?:1[0-9][0-9])|(?:[1-9][0-9])|(?:[0-9]))$/;

                if (this.result[index] && this.result[index].length > 3 && index === 3) {
                    this.result[index] = this.result[index].substring(4, 1);
                }

                if (this.result[index] > 255 && (!regexp.test(this.result.join('.'))) && this.result[index] && this.result[index].toString().length !== 0) {
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
                        }
                    });
                }
            },

            isIpv6(index, $event) {
                let regexp = /^[0-9a-fA-F]{0,}$/g;
                if (!regexp.test(this.result[index])) {
                    this.result[index] = this.result[index] && this.result[index].substring(0, this.result[index].length - 1);
                }
            },

            next(index) {
                this.currentIndex = index;
                this.$emit('focus', index);
            },

            handelBlur(index) {
                if (index === 7) {
                    let regexp = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
                    if (regexp.test(this.result.join(':'))) {
                        this.isIP = false
                    } else {
                        this.isIP = true;
                        this.$emit('error', this.result);
                    }
                }
                this.$emit('blur', index);
            },

            keyDown(evt) {
                if (evt.keyCode === 8 && this.currentIndex !== 0 && (!this.result[this.currentIndex] || this.result[this.currentIndex].length === 0)) {
                    this.$refs.box.getElementsByTagName('input')[this.currentIndex - 1].focus();
                }
            }

        }
    }
</script>

<style scoped lang="less">
    @info: #909399;
    @inputColor: #606266;
    @error: #f56c6c;
    .v-easy-input {
        position: relative;
        height: 40px;
        padding: 4px;
        color: @info;
        ul {
            min-width: 198px;
            min-height: 34px;
            margin: 0;
            padding: 0;
            height: 80%;
            border: 1px solid #eee;
            .ipv4 {
                width: 48px;
            }
            .ipv6 {
                width: 62px;
            }
            li {
                position: relative;
                list-style-type: none;
                float: left;
                width: 48px;
                height: calc(100% - 2px);
                vertical-align: center;
                input {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    color: @inputColor;
                    margin: auto;
                    text-align: center;
                    width: calc(100% - 24px);
                    height: 64%;
                    padding: 0 8px;
                    border: none;
                }
                input:focus {
                    outline: none;
                }
                span {
                    position: absolute;
                    bottom: 8px;
                    right: 0;
                    color: #333;
                    user-select: none;
                }
                .none {
                    color: @inputColor;
                }
                .red {
                    color: @error;
                }
            }
        }
        .inspection {
            color: #f56c6c;
            font-size: 12px;
            text-align: left;
            margin: 6px 0;
            transition: all 0.3s;
        }
    }
    .v-easy-error-enter, .v-easy-error-leave-to {
        transform: translate(0, -100%);
        opacity: 0;
    }
</style>
