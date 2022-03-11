<template>
    <div class="tasks-view flex flex-col flex-grow">
        <UIButton
            class="self-start"
            :to="taskViewRoute">
            Create new task
        </UIButton>
    </div>
</template>

<script>
export default {
    name: 'TasksView',
    computed: {
        taskViewRoute() {
            return {
                name: 'TaskView',
            };
        },
    },
    mounted() {
        console.log('TasksView', this.$route);
    },
};
</script>
