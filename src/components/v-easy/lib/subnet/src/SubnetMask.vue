<template>
    <div class="v-easy-input input input-subnet"
         :style="{
                'max-width': maxWidth + 'px',
                'width': width + 'px'
         }">
        <ul ref="box" :class="disabled
                              ? 'disabled'
                              : ''">
            <li v-for="(val, index) in maxs" :key="index">
                <input type="text"
                       :value="result[index]"
                       :readonly="readonly"
                       :class="errorClass[index]"
                       :maxlength="maxs[index]"
                       :disabled="disabled"
                       v-bind="$attrs"
                       @keydown="handleKeyDown(index, $event)"
                       @keyup="handleKeyUp(index, $event)"
                       @focus="handleFocus(index, $event)"
                       @input="handleInput(index, $event)"
                       @blur="handleBlur(index, $event)"
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
        model: {
            event: 'changeResult'
        },
        name: 'VeSubnet',
        data() {
            return {
                errorClass: [],
                maxs: ['3', '3', '3', '3'],
                currentIndex: 0,
                isMask: false,
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
            width: [String],
            disabled: {type: [Boolean, String], default: false},
            spliceChar: {type: String, default: '.'},
            message: {type: String, default: '请输入正确的子网掩码'},
            readonly: {type: [Boolean, String], default: false},
            value: [String, Array],
        },

        computed: {
            result() {
                let data = [];
                data = this.value === undefined || this.value === null
                    ? []
                    : this.value;
                if (!Array.isArray(this.value)) {
                    data = data.split('.');
                    data = data[0] === '' ? [] : data;
                }
                return data;
            }
        },

        methods: {
            handleInput(index, $event) {

                this.setCurrentValue($event.target.value, index);

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
                if (index !== 3 && this.result[index] && this.result[index].length >= this.maxs[index]) {
                    this.$refs.box.getElementsByTagName('input')[index + 1].focus();
                }

                this.$emit('input', {$event, index});

            },
            handleBlur(index, $event) {
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
                this.$emit('blur', {$event, index});
            },
            checkSub(mask) {
                let regexp = /^(((255\.){3}(255|254|252|248|240|224|192|128|0+))|((255\.){2}(255|254|252|248|240|224|192|128|0+)\.0)|((255\.)(255|254|252|248|240|224|192|128|0+)(\.0+){2})|((255|254|252|248|240|224|192|128|0+)(\.0+){3}))$/;
                return regexp.test(mask);
            },
            handleFocus(index, $event) {
                this.currentIndex = index;
                this.$emit('focus', {$event, index});
            },
            handleKeyUp(index, $event) {
                this.$emit('keyUp', {$event, index});
            },
            handleKeyDown(index, $event) {
                if ($event.keyCode === 8 && this.currentIndex !== 0 && (!this.result[this.currentIndex] || this.result[this.currentIndex].length === 0)) {
                    this.$refs.box.getElementsByTagName('input')[this.currentIndex - 1].focus();
                }
                if ($event.keyCode === 110 && index !== 3 && $event.target.value !== '') {
                    this.$refs.box.getElementsByTagName('input')[this.currentIndex + 1].focus();
                }
                let obj = this.$refs.box.getElementsByTagName('input'),
                    current = this.getCursortPosition(obj[index]),
                    len = $event.target.value.length;
                if ($event.keyCode === 39 && current >= len && index !== 3) { // 往后
                    obj[index + 1].focus();
                    setTimeout(()=>{this.setCaretPosition(obj[index + 1], 0)}, 0);
                }
                if ($event.keyCode === 37 && current === 0 && index !== 0) { // 往前
                    this.$refs.box.getElementsByTagName('input')[index - 1].focus();
                    setTimeout(()=>{this.setCaretPosition(obj[index - 1], this.result[index - 1] ? this.result[index - 1].length : 0)}, 0);
                }
                this.$emit('keyDown', {$event, index});
            },
            setCurrentValue (value, index) {
                if (value.toString() === this.result.join('.')) return;
                this.$set(this.result, index, value.replace(/\D/g, ''));
                this.$emit('changeResult', this.result);
            },

            // 获取光标在输入框中的位置
            getCursortPosition (el) {
                let cursorPos = 0;
                if (document.selection) {
                    var selectRange = document.selection.createRange();
                    selectRange.moveStart('character', -el.value.length);
                    cursorPos = selectRange.text.length;
                } else {
                    cursorPos = el.selectionStart;
                }
                return cursorPos;
            },

            setCaretPosition(el, pos){
                if(el.setSelectionRange) {
                    // IE Support
                    el.focus();
                    el.setSelectionRange(pos, pos);
                }else if (el.createTextRange) {
                    // Firefox support
                    var range = el.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/input/input";
</style>
