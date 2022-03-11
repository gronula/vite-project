<template>
    <div class="app flex flex-col flex-grow">
        <component :is="componentLayout" />
    </div>
</template>

<script>
import DefaultLayout from './layouts/DefaultLayout.vue';

export default {
    name: 'App',
    components: {
        DefaultLayout,
    },
    computed: {
        componentLayout() {
            return this.$route.meta.layout || DefaultLayout;
        },
    },
};
</script>
