<template>
    <div class="recover-view flex flex-col items-center">
        <h1 class="mb-2 text-2xl">
            Recover password
        </h1>
        <p class="mb-12 text-sm text-gray-400">
            Enter your email below
        </p>

        <div class="flex flex-col w-full mb-8">
            <UIInput
                v-model="form.email.value"
                id="email"
                class="mb-6"
                :errorMessage="form.email.errorMessage"
                type="email"
                name="email"
                label="Email"
                placeholder="Email" />

            <UIButton
                type="submit"
                @click="recoverButtonClickHandler">
                Send
            </UIButton>
        </div>

        <p class="text-gray-400">
            Already have an account?
            <UILink :to="loginViewRoute">
                Log in
            </UILink>
        </p>
    </div>
</template>

<script>
export default {
    name: 'RecoverView',
    data() {
        return {
            form: {
                email: {
                    value: '',
                    errorMessage: '',
                },
            },
        };
    },
    computed: {
        loginViewRoute() {
            return {
                name: 'LoginView',
            };
        },
    },
    methods: {
        recoverButtonClickHandler() {
            const invalidFields = Object
                .entries(this.form)
                .filter(([key, field]) => {
                    if (field.value) {
                        this.form[key].errorMessage = '';

                        return false;
                    }

                    this.form[key].errorMessage = 'Поле не может быть пустым';

                    return true;

                });

            if (invalidFields.length) return;

            this.$router.push('/auth');
        },
    },
};
</script>
