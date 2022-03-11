import { createRouter, createWebHistory } from 'vue-router';

import AuthLayout from '../layouts/AuthLayout.vue';
import ErrorLayout from '../layouts/ErrorLayout.vue';
import RouterViewWrapper from '../views/RouterViewWrapper.vue';
import MainView from '../views/MainView.vue';
import LoginView from '../views/LoginView.vue';
import RecoverView from '../views/RecoverView.vue';
import RegistrationView from '../views/RegistrationView.vue';
import TasksView from '../views/TasksView.vue';
import TaskView from '../views/TaskView.vue';
import SettingsView from '../views/SettingsView.vue';
import ErrorView from '../views/ErrorView.vue';

const router = createRouter({
    history: createWebHistory('/'),
    routes: [
        {
            path: '/',
            component: RouterViewWrapper,
            children: [
                {
                    path: '',
                    name: 'MainView',
                    component: MainView,
                    meta: {
                        title: 'Overview',
                    },
                },
                {
                    path: 'auth',
                    name: 'LoginView',
                    component: LoginView,
                    meta: {
                        layout: AuthLayout,
                    },
                },
                {
                    path: 'recover',
                    name: 'RecoverView',
                    component: RecoverView,
                    meta: {
                        layout: AuthLayout,
                    },
                },
                {
                    path: 'registration',
                    name: 'RegistrationView',
                    component: RegistrationView,
                    meta: {
                        layout: AuthLayout,
                    },
                },
                {
                    path: 'tasks',
                    component: RouterViewWrapper,
                    children: [
                        {
                            path: 'tasks',
                            name: 'TasksView',
                            component: TasksView,
                            meta: {
                                title: 'Tasks',
                            },
                        },
                        {
                            path: 'create',
                            name: 'TaskView',
                            component: TaskView,
                            meta: {
                                title: 'Create new task',
                            },
                        },
                    ],
                },
                {
                    path: 'settings',
                    name: 'SettingsView',
                    component: SettingsView,
                    meta: {
                        title: 'Settings',
                    },
                },
            ],
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'ErrorView',
            component: ErrorView,
            meta: {
                layout: ErrorLayout,
            },
        },
    ],
});

export default router;
