<template>
    <div class="app-notifications-panel">
        <UIPopup v-model:visible="isPopupVisible">
            <template #content>
                <p class="text-gray-500 whitespace-nowrap">
                    No notifications
                </p>
            </template>
        </UIPopup>

        <UIButtonIcon
            class="text-xl text-gray-500"
            iconName="bell-fill"
            @click="togglePopup" />
    </div>
</template>

<script>
export default {
    name: 'AppNotificationsPanel',
    data() {
        return {
            isPopupVisible: false,
        };
    },
    methods: {
        togglePopup() {
            this.isPopupVisible = !this.isPopupVisible;
        },
        documentClickHandler(e) {
            if (e.path.includes(this.$el)) return;

            this.isPopupVisible = false;
        },
    },
    watch: {
        isPopupVisible(value) {
            if (value) {
                document.addEventListener('click', this.documentClickHandler);
            } else {
                document.removeEventListener('click', this.documentClickHandler);
            }
        },
    },
};
</script>
