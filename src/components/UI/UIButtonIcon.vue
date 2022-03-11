<template>
    <BaseButton
        class="ui-button-icon flex items-center justify-center p-2 leading-none rounded-lg trs"
        v-bind="buttonData">
        <slot>
            <i :class="`bi bi-${iconName}`"></i>
        </slot>
    </BaseButton>
</template>

<script>
import { isArrayContainsValue } from '../../utils/helpers.js';
import BaseButton from '../Base/BaseButton.vue';
import icons from './utils/icons.js';

export default {
    name: 'UIButtonIcon',
    components: {
        BaseButton,
    },
    computed: {
        buttonClasses() {
            return [
                {
                    'animate-pulse': this.loading,
                    'hover:bg-blue-500 hover:bg-opacity-10 hover:text-blue-500': !this.disabled,
                    'opacity-50': this.disabled,
                },
            ];
        },
        buttonData() {
            return {
                ...this.$attrs,
                class: this.buttonClasses,
                disabled: this.disabled,
                loading: this.loading,
            };
        },
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        iconName: {
            type: String,
            default: '',
            validator: isArrayContainsValue(icons),
        },
        loading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style>
.ui-button-icon {
    & > * {
        display: flex;
    }
}
</style>
