<template>
    <BaseButton
        class="ui-link text-blue-600 underline trs"
        v-bind="linkData">
        <template #default="slotProps">
            <slot v-bind="slotProps"></slot>
        </template>
    </BaseButton>
</template>

<script>
import BaseButton from '../Base/BaseButton.vue';

export default {
    name: 'UILink',
    components: { BaseButton },
    computed: {
        isInteractive() {
            return (this.href || this.to) && !this.disabled;
        },
        linkClasses() {
            return [
                {
                    'hover:text-black': this.isInteractive,
                },
            ];
        },
        linkData() {
            const data = {
                ...this.$attrs,
                class: this.linkClasses,
                disabled: this.disabled,
                tag: this.tag,
            };

            if (this.to) {
                data.to = this.to;
            } else if (this.href) {
                data.href = this.href;
            }

            return data;
        },
    },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        href: {
            type: String,
            default: '',
        },
        tag: {
            type: String,
            default: 'a',
        },
        to: {
            type: [String, Object],
            default: null,
        },
    },
};
</script>
