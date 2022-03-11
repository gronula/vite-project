<template>
    <div
        class="app-sidebar flex-shrink-0 h-screen overflow-y-auto custom-scrollbar-light bg-gray-900 text-white trs"
        :class="[
            mode,
            {
                'w-64': isFull,
                'w-20': isCompact,
            },
        ]">
        <ul class="flex flex-col">
            <UITooltip
                :disabled="isFull"
                :content="togglerText"
                position="right"
                transitionName="fade-right"
                showArrow>
                <li>
                    <BaseButton
                        class="flex items-center w-full py-4 pl-7 pr-8 border-l-4 border-transparent hover:text-blue-300 focus:outline-1 outline-white whitespace-nowrap trs"
                        type="button"
                        @click="toggleSidebar">
                        <i
                            class="inline-flex justify-center w-4"
                            :class="{
                                'bi-chevron-double-left': isFull,
                                'bi-chevron-double-right': isCompact,
                            }"></i>
                        <span
                            class="overflow-hidden"
                            :class="{
                                'w-0 opacity-0': isCompact,
                                'ml-6': isFull,
                            }">
                            {{ togglerText }}
                        </span>
                    </BaseButton>
                </li>
            </UITooltip>

            <li
                v-for="(item, index) in navList"
                :key="index"
                class="flex">
                <UITooltip
                    :disabled="isFull"
                    :content="item.text"
                    position="right"
                    transitionName="fade-right"
                    showArrow>
                    <BaseButton
                        class="app-sidebar__link flex items-center w-full py-4 pl-7 pr-8 hover:bg-gray-600 border-l-4 border-l-transparent trs"
                        :to="item.to">
                        <i
                            class="app-sidebar__link-icon inline-flex justify-center w-4"
                            :class="item.icon"></i>
                        <span
                            class="overflow-hidden trs"
                            :class="{
                                'w-0 opacity-0': isCompact,
                                'ml-6': isFull,
                            }">
                            {{ item.text }}
                        </span>
                    </BaseButton>
                </UITooltip>
            </li>
        </ul>
    </div>
</template>

<script>
import { isArrayContainsValue } from '../../utils/helpers.js';
import BaseButton from '../Base/BaseButton.vue';

export default {
    name: 'AppSidebar',
    components: {
        BaseButton,
    },
    data() {
        return {
            navList: [
                {
                    icon: 'bi bi-house-door-fill',
                    text: 'Overview',
                    to: {
                        name: 'MainView',
                    },
                },
                {
                    icon: 'bi bi-list-ul',
                    text: 'Tasks',
                    to: {
                        name: 'TasksView',
                    },
                },
                {
                    icon: 'bi bi-gear-fill',
                    text: 'Settings',
                    to: {
                        name: 'SettingsView',
                    },
                },
            ],
        };
    },
    computed: {
        isFull() {
            return this.mode === 'full';
        },
        isCompact() {
            return this.mode === 'compact';
        },
        togglerText() {
            return this.isFull
                ? 'Collapse'
                : 'Expand';
        },
    },
    methods: {
        toggleSidebar() {
            const newMode = this.isFull
                ? 'compact'
                : 'full';

            this.$emit('update:mode', newMode);
        },
    },
    emits: {
        'update:mode': null,
    },
    props: {
        mode: {
            type: String,
            default: 'full',
            validator: isArrayContainsValue(['full', 'compact']),
        },
    },
};
</script>

<style>
.app-sidebar {
    &__link {
        @apply text-gray-300;

        &.router-link-exact-active {
            @apply text-white bg-gray-700 border-l-current;
        }
    }

    &__link-icon {
        @apply text-gray-500;

        .router-link-exact-active & {
            @apply text-white;
        }
    }
}
</style>
