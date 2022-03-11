<template>
    <UIFloatContainer
        v-model:visible="isPopupVisible"
        v-bind="popupData">
        <template #default>
            <slot></slot>
        </template>

        <template #content>
            <div class="ui-popup flex p-10 bg-white rounded-lg shadow-lg">
                <div class="flex flex-col">
                    <slot name="content">
                        {{ content }}
                    </slot>
                </div>

                <UIButtonIcon
                    v-if="!hideCloseButton"
                    class="absolute top-1 right-1 text-xl text-gray-500"
                    iconName="x-lg"
                    @click="hide" />
            </div>
        </template>
    </UIFloatContainer>
</template>

<script>
export default {
    name: 'UIPopup',
    computed: {
        isPopupVisible: {
            get() {
                return this.visible;
            },
            set(value) {
                this.$emit('update:visible', value);
            },
        },
        popupData() {
            return {
                ...this.$attrs,
            };
        },
    },
    emits: {
        'update:visible': null,
    },
    methods: {
        hide() {
            this.$emit('update:visible', false);
        },
    },
    props: {
        content: {
            type: String,
            default: '',
        },
        hideCloseButton: {
            type: Boolean,
            default: false,
        },
        visible: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
