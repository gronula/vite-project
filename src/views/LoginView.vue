<template>
    <div class="login-view flex flex-col items-center">
        <h1 class="mb-2 text-2xl">
            Log In to Dashboard Kit
        </h1>
        <p class="mb-12 text-sm text-gray-400">
            Enter your email and password below
        </p>

        <form
            ref="form"
            class="flex flex-col w-full mb-8"
            method="post"
            @submit.prevent="">
            <UIInput
                v-model="form.email.value"
                id="email"
                class="mb-6"
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
                required />

            <UIInput
                v-model="form.password.value"
                id="password"
                class="mb-1"
                :type="form.password.passwordVisible ? 'text' : 'password'"
                name="password"
                label="Password"
                placeholder="Password"
                required>
                <template #append>
                    <UIButtonIcon
                        :iconName="passwordIconName"
                        @click="form.password.passwordVisible = !form.password.passwordVisible" />
                </template>
            </UIInput>

            <UILink
                class="self-start mb-12 text-xs"
                :disabled="isLoading"
                :to="recoverViewRoute">
                Forgot password?
            </UILink>

            <UIButton
                :loading="isLoading"
                type="submit"
                @click="loginButtonClickHandler">
                Log in
            </UIButton>
        </form>

        <p class="text-gray-400">
            Don’t have an account?
            <UILink
                :disabled="isLoading"
                :to="registrationViewRoute">
                Sign up
            </UILink>
        </p>
    </div>
</template>

<script>
import { wait } from '../utils/helpers.js';

export default {
    name: 'LoginView',
    data() {
        return {
            isLoading: false,
            form: {
                email: {
                    value: '',
                },
                password: {
                    value: '',
                    passwordVisible: false,
                },
            },
        };
    },
    computed: {
        recoverViewRoute() {
            return {
                name: 'RecoverView',
            };
        },
        registrationViewRoute() {
            return {
                name: 'RegistrationView',
            };
        },
        passwordIconName() {
            return this.form.password.passwordVisible
                ? 'eye-slash'
                : 'eye';
        },
    },
    methods: {
        async loginButtonClickHandler() {
            this.isLoading = true;

            try {
                if (this.$refs.form.reportValidity()) {
                    await wait(500);
                    this.$router.push('/');
                }
            } catch (error) {
                console.error(error);
            } finally {
                this.isLoading = false;
            }
        },
    },
};
</script>
