<template>
    <div class="ui-textarea flex flex-col">
        <div class="ui-textarea__wrapper flex flex-col-reverse">
            <div
                class="ui-textarea__field-wrapper flex items-center overflow-hidden bg-white border border-gray-300 rounded-lg trs"
                :class="textareaWrapperClasses">
                <div
                    v-if="$slots.prepend"
                    class="ui-textarea__field-slot mr-3">
                    <slot name="prepend"></slot>
                </div>

                <textarea
                    v-model="textareaModel"
                    class="ui-textarea__field flex-grow w-0 py-2 px-4 outline-0 bg-transparent custom-scrollbar"
                    v-bind="textareaData"
                    @focus="isFocused = true"
                    @blur="isFocused = false"></textarea>

                <div
                    v-if="$slots.append"
                    class="ui-textarea__field-slot ml-3">
                    <slot name="append"></slot>
                </div>
            </div>

            <label
                v-if="label"
                class="ui-textarea__label mb-1 text-xs text-gray-500 font-medium uppercase"
                v-bind="labelData">
                <slot>{{ label }}</slot>
            </label>
        </div>
    </div>
</template>

<script>
import { getRandomId } from '../../utils/helpers.js';
import { isValueConvertedToNumber } from '../../utils/validators.js';

export default {
    name: 'UITextarea',
    data() {
        return {
            isFocused: false,
        };
    },
    computed: {
        textareaModel: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            },
        },
        textareaId() {
            return this.id || `ui-textarea-${getRandomId()}`;
        },
        textareaWrapperClasses() {
            return [
                {
                    'bg-gray-200': this.disabled,
                    'cursor-not-allowed': this.disabled,
                    'border-blue-600': this.isFocused,
                    'hover:border-blue-600': !this.disabled,
                },
            ];
        },
        textareaData() {
            return {
                class: [
                    {
                        'resize-none': !this.resize,
                    },
                ],
                disabled: this.disabled,
                id: this.textareaId,
                name: this.name,
                placeholder: this.placeholder,
                rows: this.rows,
            };
        },
        labelData() {
            return {
                for: this.textareaId,
            };
        },
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
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
        resize: {
            type: Boolean,
            default: false,
        },
        rows: {
            type: [Number, String],
            default: 4,
            validator: isValueConvertedToNumber,
        },
    },
};
</script>

<style>
.ui-textarea {
    &__label {
        letter-spacing: 0.5px;
    }
}
</style>
