<template>
    <div class="v-easy-input input input-subnet"
         :style="{'max-width': maxWidth + 'px'}">
        <ul ref="box">
            <li v-for="(val, index) in maxs" :key="index">
                <input type="text"
                       v-model="result[index]"
                       :readonly="readonly"
                       :class="errorClass[index]"
                       :maxlength="maxs[index]"
                       @keydown="handleKeyDown"
                       @focus="handleFocus(index)"
                       @input="handleInput(index)"
                       @blur="handleBlur(index)"
                >
                <span v-if="index !== (maxs.length - 1)">{{ spliceChar }}</span>
            </li>
        </ul>
        <transition name="v-easy-error">
            <div class="error inspection" v-show="isMask">{{ message }}</div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'VESubnet',
        data() {
            return {
                errorClass: [],
                maxs: ['3', '3', '3', '3'],
                currentIndex: 0,
                isMask: false,
                isString: false
            }
        },

        watch: {
            isMask(val) {
                this.$emit('status', !val);
            },
            result(val) {
                let statusSuccess = true;
                for (let i = 0; i < 4; i++) {
                    if (typeof val[i] === 'undefined') {
                        statusSuccess = false;
                    }
                }
                if (statusSuccess && val.length > 3) this.$emit('status', this.checkSub(val.join('.')));
            }
        },

        props: {
            maxWidth: {type: String},
            spliceChar: {type: String, default: '.'},
            message: {type: String, default: '请输入正确的子网掩码'},
            readonly: {type: Boolean, default: false},
            value: [String, Array],
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
            }
        },

        methods: {
            handleInput(index) {

                this.$emit('input', this.isString ? this.result.join('.') : this.result);

                let first = this.result[index - 1] !== '255';
                if (index === 0) first = false;
                if (first) {
                    for(let i = index; i < this.maxs.length; i++) {
                        this.maxs[i] = '1'
                    }
                    if (this.result[index] !== '0') {
                        this.errorClass[index] = 'red';
                        this.isMask = true;
                    } else {
                        this.isMask = false;
                        this.errorClass[index] = 'none'
                    }
                } else {
                    for(let i = index; i < this.maxs.length; i++) {
                        this.maxs[i] = '3'
                    }
                    let regexp = /^(255|254|252|248|240|224|192|128|0)$/;
                    if (!regexp.test(this.result[index]) && this.result[index].length === 3) {
                        this.errorClass[index] = 'red';
                        this.isMask = true;
                    } else {
                        this.isMask = false;
                        this.errorClass[index] = 'none'
                    }
                }
                if (this.result[index].length >= this.maxs[index] && index !== 3) {
                    this.$refs.box.getElementsByTagName('input')[index + 1].focus();
                }

            },
            handleBlur(index) {
                if (index === 3) {
                    let eBool = false,
                        cuIndex = [];
                    this.result.forEach((item, index) => {
                        if (item === '') {
                            cuIndex.push(index);
                            eBool = true
                        }
                    });
                    cuIndex.forEach(item=>{
                        this.errorClass[item] = 'red';
                    });
                    this.isMask = eBool;
                }
                let isCheck = false;
                this.result.forEach((item) => {
                    item !== '' && this.result.length > 3 ? isCheck = true : isCheck = false;
                });
                if (isCheck && !this.checkSub(this.result.join('.'))) {
                    this.isMask = true;
                }
                this.$emit('blur', index);
            },
            checkSub(mask) {
                let regexp = /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/;
                return regexp.test(mask);
            },
            handleFocus(index) {
                this.currentIndex = index;
                this.$emit('focus', index);
            },
            handleKeyDown(evt) {
                if (evt.keyCode === 8 && this.currentIndex !== 0 && (!this.result[this.currentIndex] || this.result[this.currentIndex].length === 0)) {
                    this.$refs.box.getElementsByTagName('input')[this.currentIndex - 1].focus();
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/input/input";
</style>