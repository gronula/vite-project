<template>
    <BaseButton
        class="ui-button relative flex items-center justify-center py-3 px-6 text-white rounded-lg border-0 trs"
        v-bind="buttonData">
        <div
            class="ui-button__content flex items-center justify-center"
            :class="{ 'opacity-0': loading }">
            <slot></slot>
        </div>

        <div
            v-if="loading"
            class="ui-button__loader absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <i class="bi bi-record-fill animate-pulse"></i>
            <i class="bi bi-record-fill animate-pulse"></i>
            <i class="bi bi-record-fill animate-pulse"></i>
        </div>
    </BaseButton>
</template>


<script>
import BaseButton from '../Base/BaseButton.vue';

export default {
    name: 'UIButton',
    components: {
        BaseButton,
    },
    computed: {
        isInteractive() {
            return !this.disabled && !this.loading;
        },
        buttonClasses() {
            return [
                {
                    'bg-gray-500': this.disabled,
                    'bg-blue-600': !this.disabled,
                    'hover:bg-blue-500': this.isInteractive,
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
        loading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
