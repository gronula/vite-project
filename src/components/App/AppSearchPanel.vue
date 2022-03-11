<template>
    <div class="app-search-panel">
        <UIPopup v-model:visible="isPopupVisible">
            <template #content>
                <div class="flex">
                    <UIInput
                        ref="search"
                        id="search"
                        class="w-52 mr-4"
                        type="text"
                        name="search"
                        placeholder="Type something" />

                    <UIButton type="submit">
                        Search
                    </UIButton>
                </div>
            </template>

            <UIButtonIcon
                class="text-xl text-gray-500"
                iconName="search"
                @click="toggleSearch" />
        </UIPopup>
    </div>
</template>

<script>
export default {
    name: 'AppSearchPanel',
    data() {
        return {
            isPopupVisible: false,
        };
    },
    methods: {
        toggleSearch() {
            this.isPopupVisible = !this.isPopupVisible;
        },
    },
    watch: {
        isPopupVisible(value) {
            if (value) {
                setTimeout(() => {
                    this.$refs.search?.$refs?.input?.focus();
                });
            }
        },
    },
};
</script>
