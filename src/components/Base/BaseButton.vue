<template>
    <component
        :is="componentName"
        class="base-button"
        v-bind="buttonData"
        @click.capture="clickHandler">
        <slot></slot>
    </component>
</template>

<script>
import { toRawType } from '../../utils/helpers.js';

export default {
    name: 'BaseButton',
    computed: {
        componentName() {
            if (this.$attrs.to) {
                return 'RouterLink';
            } else if (this.$attrs.href) {
                return 'a';
            }

            return this.tag;
        },
        isButton() {
            return this.tag === 'button';
        },
        isLink() {
            return (
                toRawType(this.$attrs.to) !== 'Undefined' ||
                toRawType(this.$attrs.href) !== 'Undefined' ||
                this.tag === 'a'
            );
        },
        isInteractive() {
            return !this.disabled && !this.loading;
        },
        buttonClasses() {
            return {
                'active:opacity-75': this.isInteractive,
                'cursor-not-allowed': !this.isInteractive,
            };
        },
        buttonData() {
            const data = {
                ...this.$attrs,
                class: this.buttonClasses,
            };

            if (this.isButton && !this.isLink) {
                data.type = this.type;
            }

            if (!this.isInteractive) {
                if (this.isButton) {
                    data.disabled = true;
                } else if (this.isLink) {
                    data.href = null;
                }
            }

            return data;
        },
    },
    methods: {
        clickHandler(e) {
            if (!this.isInteractive) {
                e.preventDefault();
            }
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
        tag: {
            type: String,
            default: 'button',
        },
        type: {
            type: String,
            default: 'button',
        },
    },
};
</script>
