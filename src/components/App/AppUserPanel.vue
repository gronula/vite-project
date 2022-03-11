<template>
    <div class="app-user-panel relative flex items-center self-stretch">
        <p>{{ name }} {{ surname }}</p>

        <UIPopup
            v-model:visible="isPopupVisible"
            position="bottom-end"
            hideCloseButton>
            <BaseButton
                class="app-user-panel__avatar flex items-center shrink-0 ml-4 hover:opacity-75 trs"
                @click="togglePopup">
                <span class="flex w-10 h-10 mr-2 bg-blue-500 rounded-full"></span>
                <i class="bi bi-chevron-down"></i>
            </BaseButton>

            <template #content>
                <div class="flex flex-col -my-5 -mx-10">
                    <ul>
                        <li>
                            <BaseButton
                                class="flex items-center py-3 px-6 hover:bg-blue-500 hover:bg-opacity-10 trs"
                                to="/auth">
                                <i class="bi bi-box-arrow-right"></i>
                                <span class="ml-2">Logout</span>
                            </BaseButton>
                        </li>
                    </ul>
                    <!-- <button
                        class="flex items-center text-gray-500 hover:text-blue-500 whitespace-nowrap trs"
                        type="button"
                        @click="logout">
                        <i class="bi bi-box-arrow-right"></i>
                        <span class="ml-2">Logout</span>
                        </button> -->
                </div>
            </template>
        </UIPopup>
    </div>
</template>

<script>
import BaseButton from '../Base/BaseButton.vue';

export default {
    name: 'AppUserPanel',
    components: { BaseButton },
    data() {
        return {
            isPopupVisible: false,
        };
    },
    computed: {
        name() {
            return 'John';
        },
        surname() {
            return 'Doe';
        },
    },
    methods: {
        togglePopup() {
            this.isPopupVisible = !this.isPopupVisible;
        },
        documentClickHandler(e) {
            if (e.path.includes(this.$el)) {
                return;
            }

            this.isPopupVisible = false;
        },
        logout() {
            this.isPopupVisible = false;
            this.$router.push('/auth');
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
