<template>
    <div class="auth-layout flex flex-col items-center justify-center flex-grow p-4 bg-gray-900">
        <div class="flex flex-col w-full max-w-sm py-10 px-8 bg-gray-100 rounded-lg">
            <RouterView class="flex flex-col" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AuthLayout',
};
</script>
