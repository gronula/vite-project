<template>
    <div class="default-layout relative flex flex-grow">
        <AppSidebar
            v-model:mode="sidebarMode"
            class="sticky top-0" />

        <div class="default-layout__content flex flex-col flex-grow min-w-0 py-4 px-8">
            <AppControlPanel
                class="mb-6"
                :title="title" />

            <main class="default-layout__main flex flex-col flex-grow">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script>
import AppSidebar from '../components/App/AppSidebar.vue';
import AppControlPanel from '../components/App/AppControlPanel.vue';

export default {
    name: 'DefaultLayout',
    components: {
        AppSidebar,
        AppControlPanel,
    },
    data() {
        return {
            sidebarMode: 'full',
        };
    },
    computed: {
        title() {
            return this.$route.params.title || this.$route.meta.title;
        },
    },
};
</script>
