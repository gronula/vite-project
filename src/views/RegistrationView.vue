<template>
    <div class="registration-view flex flex-col items-center">
        <h1 class="mb-2 text-2xl">
            Registartion in Dashboard Kit
        </h1>
        <p class="mb-12 text-sm text-gray-400">
            Enter your data below
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

            <UIInput
                v-model="form.password.value"
                id="password"
                class="mb-6"
                :errorMessage="form.password.errorMessage"
                :type="form.password.passwordVisible ? 'text' : 'password'"
                name="password"
                label="Password"
                placeholder="Password">
                <template #append>
                    <UIButtonIcon
                        :iconName="passwordIconName"
                        @click="form.password.passwordVisible = !form.password.passwordVisible" />
                </template>
            </UIInput>

            <UIInput
                v-model="form.repeatPassword.value"
                id="repeat-password"
                class="mb-6"
                :errorMessage="form.repeatPassword.errorMessage"
                :type="form.repeatPassword.passwordVisible ? 'text' : 'password'"
                name="repeat-password"
                label="Repeat password"
                placeholder="Repeat password">
                <template #append>
                    <UIButtonIcon
                        :iconName="repeatPasswordIconName"
                        @click="form.repeatPassword.passwordVisible = !form.repeatPassword.passwordVisible" />
                </template>
            </UIInput>

            <UIButton
                type="submit"
                @click="registerButtonClickHandler">
                Register
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
    name: 'RegistrationView',
    data() {
        return {
            form: {
                email: {
                    value: '',
                    errorMessage: '',
                },
                password: {
                    value: '',
                    errorMessage: '',
                    passwordVisible: false,
                },
                repeatPassword: {
                    value: '',
                    errorMessage: '',
                    passwordVisible: false,
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
        passwordIconName() {
            return this.form.password.passwordVisible
                ? 'eye-slash'
                : 'eye';
        },
        repeatPasswordIconName() {
            return this.form.repeatPassword.passwordVisible
                ? 'eye-slash'
                : 'eye';
        },
    },
    methods: {
        registerButtonClickHandler() {
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

            if (invalidFields.length) {
                return;
            } else if (this.form.password.value === this.form.repeatPassword.value) {
                this.form.repeatPassword.errorMessage = '';
            } else {
                this.form.repeatPassword.errorMessage = 'Пароли должны совпадать';

                return;
            }

            this.$router.push('/auth');
        },
    },
};
</script>
