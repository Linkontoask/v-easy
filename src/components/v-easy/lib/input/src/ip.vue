<template>
    <div class="v-easy-input input input-ip"
        :class="">
        <ul ref="box">
            <li v-for="(item, index) in vHtml" :key="index">
                <input type="text"v-model="result[index]"
                       :readonly="readonly"
                       :class="inputRed[index]"
                       @keydown="keyDown"
                       @input="checkResult(index)"
                       @focus="next(index)"
                       @blur="">
                <span v-if="index !== 3">{{ spliceChar }}</span>
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
              result: [],
              vHtml: [{}, {}, {}, {}],
              inputRed: [],
              currentIndex: 0,
              isIP: false
          }
        },

        props: {
            spliceChar: {type: String, default: '.'},
            readonly: {type: Boolean, default: false},
            message: {type: String, default: '请输入正确的IP地址'},
        },

        watch: {
            result(val) {
                this.$emit('changeResult', val);
            }
        },

        computed: {
        },

        methods: {
            checkResult(index) {

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
                } else {
                    this.inputRed[index] = 'none';
                    this.isIP = false;
                    this.inputRed.forEach(item => {
                        if (item === 'red') {
                            this.isIP = true;
                        }
                    });
                }


                if (this.result[index] && this.result[index].length === 3 && index < 3) { // 自动对焦
                    this.$refs.box.getElementsByTagName('input')[index + 1].focus();
                }


            },

            next(index) {
                this.currentIndex = index;
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
            li {
                position: relative;
                list-style-type: none;
                float: left;
                width: calc(25% - 2px);
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
