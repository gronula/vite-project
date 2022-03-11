<template>
    <UIFloatContainer
        ref="container"
        v-bind="tooltipData">
        <template #default>
            <slot></slot>
        </template>

        <template #content>
            <div
                class="ui-tooltip flex py-2 px-3 text-white bg-gray-900 rounded-lg"
                :class="tooltipClasses"
                @mouseenter="mouseenterHandler"
                @mouseleave="mouseleaveHandler">
                <div
                    v-if="isArrowVisible"
                    class="absolute flex w-0 h-0 border-solid border-transparent"
                    :class="arrowClasses">
                </div>

                <div class="flex flex-col">
                    <slot name="content">
                        {{ content }}
                    </slot>
                </div>
            </div>
        </template>
    </UIFloatContainer>
</template>

<script>
import { isArrayContainsValue, toNumber } from '../../utils/helpers.js';
import { isValueConvertedToNumber } from '../../utils/validators.js';
import positions from './utils/positions.js';

export default {
    name: 'UITooltip',
    data() {
        return {
            activatorElement: null,
            isTooltipVisible: false,
            timer: null,
        };
    },
    computed: {
        currentPosition() {
            return this.position.trim().split('-');
        },
        isCenter() {
            return this.currentPosition.includes('center');
        },
        isTop() {
            return this.currentPosition.includes('top');
        },
        isRight() {
            return this.currentPosition.includes('right');
        },
        isBottom() {
            return this.currentPosition.includes('bottom');
        },
        isLeft() {
            return this.currentPosition.includes('left');
        },
        isAxisStart() {
            return this.currentPosition.includes('start');
        },
        isAxisEnd() {
            return this.currentPosition.includes('end');
        },
        isAxisCenter() {
            return !this.isAxisStart && !this.isAxisEnd;
        },
        tooltipData() {
            return {
                ...this.$attrs,
                contentClass: {
                    'pointer-events-none': !this.preventCloseOnHover,
                },
                inner: this.inner,
                outer: this.outer,
                position: this.position,
                visible: !this.disabled && this.isTooltipVisible,
            };
        },
        // eslint-disable-next-line complexity
        tooltipClasses() {
            const classes = [];

            if (!this.preventCloseOnHover) {
                classes.push('pointer-events-none');
            }

            if (this.showArrow) {
                if (this.inner) {
                    classes.push({
                        'rounded-bl-none': (this.isBottom && this.isAxisStart) || (this.isLeft && this.isAxisEnd),
                        'rounded-br-none': (this.isRight && this.isAxisEnd) || (this.isBottom && this.isAxisEnd),
                        'rounded-tl-none': (this.isTop && this.isAxisStart) || (this.isLeft && this.isAxisStart),
                        'rounded-tr-none': (this.isTop && this.isAxisEnd) || (this.isRight && this.isAxisStart),
                    });
                } else if (this.outer) {
                    classes.push({
                        'rounded-bl-none': (this.isTop && this.isAxisEnd) || (this.isRight && this.isAxisStart),
                        'rounded-br-none': (this.isTop && this.isAxisStart) || (this.isLeft && this.isAxisStart),
                        'rounded-tl-none': (this.isRight && this.isAxisEnd) || (this.isBottom && this.isAxisEnd),
                        'rounded-tr-none': (this.isBottom && this.isAxisStart) || (this.isLeft && this.isAxisEnd),
                    });
                } else {
                    classes.push({
                        'rounded-bl-none': (this.isTop && this.isAxisStart) || (this.isRight && this.isAxisEnd),
                        'rounded-br-none': (this.isTop && this.isAxisEnd) || (this.isLeft && this.isAxisEnd),
                        'rounded-tl-none': (this.isRight && this.isAxisStart) || (this.isBottom && this.isAxisStart),
                        'rounded-tr-none': (this.isBottom && this.isAxisEnd) || (this.isLeft && this.isAxisStart),
                    });
                }
            }

            return classes;
        },
        isArrowVisible() {
            return this.showArrow && !this.isCenter;
        },
        // eslint-disable-next-line complexity
        arrowClasses() {
            const classes = [];

            if (this.inner) {
                classes.push({
                    'top-full left-1/2 border-t-gray-900 border-t-8 border-x-8 -translate-x-1/2': this.isBottom && this.isAxisCenter,
                    'top-1/2 right-full border-r-gray-900 border-t-8 border-r-8 border-b-8 -translate-y-1/2': this.isLeft && this.isAxisCenter,
                    'bottom-full left-1/2 border-b-gray-900 border-b-8 border-x-8 -translate-x-1/2': this.isTop && this.isAxisCenter,
                    'top-1/2 left-full border-l-gray-900 border-t-8 border-b-8 border-l-8 -translate-y-1/2': this.isRight && this.isAxisCenter,
                });
            } else if (this.outer) {
                classes.push({
                    'top-full left-1/2 border-t-gray-900 border-t-8 border-x-8 -translate-x-1/2': this.isTop && this.isAxisCenter,
                    'top-1/2 right-full border-r-gray-900 border-t-8 border-r-8 border-b-8 -translate-y-1/2': this.isRight && this.isAxisCenter,
                    'bottom-full left-1/2 border-b-gray-900 border-b-8 border-x-8 -translate-x-1/2': this.isBottom && this.isAxisCenter,
                    'top-1/2 left-full border-l-gray-900 border-t-8 border-b-8 border-l-8 -translate-y-1/2': this.isLeft && this.isAxisCenter,
                });
            } else {
                classes.push({
                    'top-full left-0 border-t-gray-900 border-t-8 border-r-8': this.isTop && this.isAxisStart,
                    'top-full left-1/2 border-t-gray-900 border-t-8 border-x-8 -translate-x-1/2': this.isTop && this.isAxisCenter,
                    'top-full right-0 border-r-gray-900 border-r-8 border-b-8': this.isTop && this.isAxisEnd,

                    'top-0 right-full border-r-gray-900 border-r-8 border-b-8': this.isRight && this.isAxisStart,
                    'top-1/2 right-full border-r-gray-900 border-t-8 border-r-8 border-b-8 -translate-y-1/2': this.isRight && this.isAxisCenter,
                    'bottom-0 right-full border-b-gray-900 border-b-8 border-l-8': this.isRight && this.isAxisEnd,

                    'bottom-full left-0 border-l-gray-900 border-t-8 border-l-8': this.isBottom && this.isAxisStart,
                    'bottom-full left-1/2 border-b-gray-900 border-b-8 border-x-8 -translate-x-1/2': this.isBottom && this.isAxisCenter,
                    'bottom-full right-0 border-b-gray-900 border-b-8 border-l-8': this.isBottom && this.isAxisEnd,

                    'top-0 left-full border-t-gray-900 border-t-8 border-r-8': this.isLeft && this.isAxisStart,
                    'top-1/2 left-full border-l-gray-900 border-t-8 border-b-8 border-l-8 -translate-y-1/2': this.isLeft && this.isAxisCenter,
                    'bottom-0 left-full border-l-gray-900 border-t-8 border-l-8': this.isLeft && this.isAxisEnd,
                });
            }

            return classes;
        },
    },
    methods: {
        show() {
            if (this.disabled) return;

            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.isTooltipVisible = true;
            }, toNumber(this.openDelay));
        },
        hide() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.isTooltipVisible = false;
            }, toNumber(this.closeDelay));
        },
        mouseenterHandler() {
            this.show();
        },
        mouseleaveHandler() {
            this.hide();
        },
        focusHandler() {
            this.show();
        },
        blurHandler() {
            this.hide();
        },
        addListeners() {
            if (!this.activatorElement) return;

            this.activatorElement.addEventListener('mouseenter', this.mouseenterHandler);
            this.activatorElement.addEventListener('mouseleave', this.mouseleaveHandler);
            this.activatorElement.addEventListener('focus', this.focusHandler);
            this.activatorElement.addEventListener('blur', this.blurHandler);
        },
        removeListeners() {
            if (!this.activatorElement) return;

            this.activatorElement.removeEventListener('mouseenter', this.mouseenterHandler);
            this.activatorElement.removeEventListener('mouseleave', this.mouseleaveHandler);
            this.activatorElement.removeEventListener('focus', this.focusHandler);
            this.activatorElement.removeEventListener('blur', this.blurHandler);
        },
    },
    props: {
        closeDelay: {
            type: [Number, String],
            default: 150,
            validator: isValueConvertedToNumber,
        },
        content: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        inner: {
            type: Boolean,
            default: false,
        },
        openDelay: {
            type: [Number, String],
            default: 50,
            validator: isValueConvertedToNumber,
        },
        outer: {
            type: Boolean,
            default: false,
        },
        position: {
            type: String,
            default: 'bottom',
            validator: isArrayContainsValue(positions),
        },
        preventCloseOnHover: {
            type: Boolean,
            default: false,
        },
        showArrow: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        disabled(value) {
            if (value) this.hide();
        },
    },
    mounted() {
        this.activatorElement = this.$el.nextElementSibling;
        this.addListeners();
    },
    beforeUnmount() {
        this.removeListeners();
        this.activatorElement = null;
    },
};
</script>
