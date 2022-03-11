<template>
    <div class="app-control-panel flex items-center py-2">
        <h2 class="app-control-panel__title text-2xl">
            {{ title }}
        </h2>

        <div class="app-control-panel__controls flex items-center ml-auto pl-12">
            <AppSearchPanel />
            <AppNotificationsPanel class="ml-2" />
            <AppUserPanel class="ml-4 pl-6 border-l-2 border-gray-300" />
        </div>
    </div>
</template>

<script>
import AppSearchPanel from './AppSearchPanel.vue';
import AppNotificationsPanel from './AppNotificationsPanel.vue';
import AppUserPanel from './AppUserPanel.vue';

export default {
    name: 'AppControlPanel',
    components: {
        AppSearchPanel,
        AppNotificationsPanel,
        AppUserPanel,
    },
    props: {
        title: {
            type: String,
            default: '',
        },
    },
};
</script>
