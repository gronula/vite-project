<template>
    <div class="task-view flex flex-col flex-grow">
        <UIInput
            id="title"
            class="mb-6"
            name="title"
            label="Title"
            placeholder="Title" />

        <UITextarea
            id="description"
            class="mb-6"
            name="description"
            label="Description"
            placeholder="Description" />

        <UIButton
            type="submit"
            @click="clickHandler">
            Create
        </UIButton>
    </div>
</template>

<script>
export default {
    name: 'TaskView',
    methods: {
        clickHandler() {
        },
    },
};
</script>
