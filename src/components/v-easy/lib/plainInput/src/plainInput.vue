<template>
    <div class="v-easy-input input input-plain"
         :style="{'max-width': maxWidth + 'px'}">
        <input type="text"
               :value="val"
               :class="error && 'red'"
               :disabled="disabled"
               :readonly="readonly"
               v-bind="$attrs"
               @input="handleInput"
               @blur="handleBlur"
               @focus="handleFocus"
                >
        <transition name="v-easy-error">
            <div class="error inspection" v-show="error">{{ msg }}</div>
        </transition>
    </div>
</template>

<script>
    export default {
        model: {
            event: 'changeResult'
        },
        name: 'VEPlainInput',
        data() {
            return {
                val: this.value === undefined || this.value === null
                    ? ''
                    :this.value,
                error: false,
                eventContainer: ''
            }
        },

        watch: {
            value (val) {
                this.setCurrentValue(val);
            },
            eventContainer(val) {
                this.mergeMesh(val);
            }
        },

        props: {
            maxWidth: {type: String},
            disabled: {type: [Boolean, String], default: false},
            readonly: {type: [Boolean, String], default: false},
            message: {type: String, default: '输入有误'},
            inspect: {type: String, default: '/^.?$/g'},
            type: {type: String, default: 'length'},
            target: {type: String, default: 'blur'},
            options: [Object, Array],
            value: [String, Object]
        },

        computed: {
            opt_type() {
                return this.options
                    ? (Array.isArray(this.options) ? {min: this.options[0], max: this.options[1]} : this.options)
                    : null
            },
            msg() {
                return this.options
                    ? `${this.message}(${this.options.min} - ${this.options.max})`
                    : this.message
            },

        },

        methods: {
            handleInput(event) {
                this.setCurrentValue(event.target.value);

                this.mergeMesh('input');

                this.$emit('input', event);

            },
            handleBlur(event) {
                this.$emit('blur', event);

                this.eventContainer = 'blur';
            },
            handleFocus(event) {
                this.$emit('focus', event);

                this.eventContainer = 'focus';
            },
            mergeMesh(val) {
                if (this.opt_type) {
                    if (val === this.target) {
                        this.error = (this.val.length < this.options.min || this.val.length > this.options.max);
                    }
                } else if (this.type === 'reg' && val === this.target) {
                    let regexp = new RegExp(this.inspect, 'g');
                    this.error = !regexp.test(this.val);
                }
            },
            setCurrentValue (value) {
                if (value === this.val) return;
                this.val = value;
                this.$emit('changeResult', this.val);
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../../style/input/plain";
</style>
