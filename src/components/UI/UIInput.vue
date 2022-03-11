<template>
    <div
        class="ui-input flex flex-col"
        :class="$attrs.class"
        :style="$attrs.style">
        <div class="ui-input__wrapper flex flex-col-reverse flex-grow">
            <div
                class="ui-input__field-wrapper flex flex-grow items-center overflow-hidden bg-white border border-gray-300 rounded-lg trs"
                :class="inputWrapperClasses">
                <div
                    v-if="$slots.prepend"
                    class="ui-input__field-slot mx-1">
                    <slot name="prepend"></slot>
                </div>

                <input
                    v-model="inputModel"
                    ref="input"
                    class="ui-input__field flex-grow w-0 h-full py-3 px-6 outline-0 bg-transparent"
                    v-bind="inputData"
                    @focus="isFocused = true"
                    @blur="isFocused = false">

                <div
                    v-if="$slots.append"
                    class="ui-input__field-slot mx-1">
                    <slot name="append"></slot>
                </div>
            </div>

            <label
                v-if="label"
                class="ui-input__label mb-1 text-xs text-gray-500 font-medium uppercase"
                v-bind="labelData">
                <slot>{{ label }}</slot>
            </label>
        </div>

        <div
            v-if="$slots.error || errorMessage"
            class="ui-input__error flex flex-col text-sm text-pink-700">
            <slot name="error">
                {{ errorMessage }}
            </slot>
        </div>
    </div>
</template>

<script>
import { getRandomId } from '../../utils/helpers.js';

export default {
    name: 'UIInput',
    data() {
        return {
            isFocused: false,
        };
    },
    computed: {
        inputModel: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            },
        },
        inputId() {
            return this.id || `ui-input-${getRandomId()}`;
        },
        inputWrapperClasses() {
            return [
                {
                    'bg-gray-200': this.disabled,
                    'cursor-not-allowed': this.disabled,
                    'border-blue-600': this.isFocused,
                    'hover:border-blue-600': !this.disabled,
                },
            ];
        },
        inputData() {
            const {
                class: _class,
                style: _style,
                ...attrs
            } = this.$attrs;

            return {
                ...attrs,
                disabled: this.disabled,
                id: this.inputId,
                name: this.name,
                placeholder: this.placeholder,
                type: this.type,
            };
        },
        labelData() {
            return {
                for: this.inputId,
            };
        },
    },
    inheritAttrs: false,
    emits: {
        'update:modelValue': null,
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        errorMessage: {
            type: String,
            default: '',
        },
        id: {
            type: String,
            default: '',
        },
        label: {
            type: String,
            default: '',
        },
        modelValue: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            default: '',
        },
        placeholder: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: 'text',
        },
    },
};
</script>

<style>
.ui-input {
    &__label {
        letter-spacing: 0.5px;
    }
}
</style>
