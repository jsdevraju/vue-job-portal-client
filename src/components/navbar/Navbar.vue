<template>
    <Loader v-if="loading" />
    <header class="header">
        <div class="container">
            <nav class="navbar">
                <!-- Logo -->
                <router-link to="/">
                    <img src="https://www.workslee.com/workslee-logo.svg" alt="Logo">
                </router-link>
                <!-- Navbar Item -->
                <ul :class="menuShow ? 'nav_item active' : 'nav_item'">
                    <li v-if="!authState?.token" v-for="menu in menus" :key="menu.id">
                        <router-link active-class="active" :to="menu.url">
                            {{ menu.name }}
                        </router-link>
                    </li>
                </ul>
                <!-- Mobile Navbar -->
                <div :class="menuShow ? 'navMenu isActive' : 'navMenu'" @click="handleMenu">
                    <span class="bar"></span>
                    <span class="bar"></span>
                    <span class="bar"></span>
                </div>
                <!-- When User login fire this -->
                <ul v-if="authState?.token" :class="menuShow ? 'nav_item active' : 'nav_item'">
                    <li v-for="menu in proctedMenu" :key="menu.id">
                        <router-link active-class="active" :to="menu.url">
                            {{ menu.name }}
                        </router-link>
                    </li>
                    <li class="model_main">
                        <img @click="handleModel" :src="token?.userInfo?.avatar" :alt="token?.userInfo?.fullname"
                            class="profile_img" />
                        <div :class="showModel ? 'model active' : 'model'">
                            <button @click="handleLogout" class="app_btn">Logout</button>
                            <button @click="handlePush" class="second_btn">Profile</button>
                            <button @click="handleAddJob" class="second_btn">Add Job</button>
                        </div>
                        <!-- Overlay -->
                        <div @click="handleModel" :class="showModel ? 'overlay active' : 'overlay'"></div>
                    </li>
                </ul>
                <!-- User Profile Info When User Logged  -->
            </nav>
        </div>
    </header>
</template>

<script>

import axios from 'axios'
import { mapGetters } from 'vuex'
import { menus } from '../../data/menu'
import { proctedMenu } from '../../data/menu'
import Loader from '../loader/Loader.vue'

export default {
    data() {
        return {
            menus,
            proctedMenu,
            token: "",
            showModel: false,
            loading: false,
            menuShow: false
        };
    },
    mounted() {
        this.token = JSON.parse(localStorage.getItem("user"));
    },
    methods: {
        handleModel() {
            this.showModel = !this.showModel;
        },
        async handleLogout() {
            this.loading = true;
            try {
                axios.get(`${import.meta.env.VITE_APP_BASE_URL}/auth/logout`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.token?.token}`,
                    },
                    credentials: true,
                });
                this.loading = false;
                this.$store.dispatch("authModule/setUser", { token: null })
                this.$toast.success("Logout Successfully");
                this.$router.push("/login");
                localStorage.removeItem("user")
            }
            catch (error) {
                this.loading = false;
                console.log(error);
            }
        },
        handlePush() {
            this.$router.push('/profile')
            this.showModel = !this.showModel;
        },
        handleAddJob() {
            this.$router.push('/add-job')
            this.showModel = !this.showModel;
        },
        handleMenu() {
            this.menuShow = !this.menuShow
            this.showModel = !this.showModel;
        }
    },
    components: { Loader },
    computed: mapGetters({
        authState: "getToken"
    })
}
</script>

<style>
.header {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav_item {
    display: flex;
    align-items: center;
    gap: 1em;
}

.nav_item li a {
    font-size: 1em;
    color: var(--text-color);
    font-weight: 500;
    transition: 0.3s ease-in-out;
}

.nav_item li a:hover {
    color: var(--primary-color);
}

.active {
    color: var(--primary-color) !important;
}


.profile_img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 100%;
}

.model_main {
    position: relative;
    z-index: 99;
}

.model {
    position: absolute;
    width: 250px;
    background-color: #fff;
    top: 70px;
    right: 0px;
    padding: 1.5em;
    border-radius: 10px;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s ease-in-out;
    z-index: 99;
}

.active {
    visibility: visible;
    opacity: 1;
}

.model button {
    width: 100%;
    margin-top: 1em;
    cursor: pointer;
}

.second_btn {
    padding: 0.5em 1em;
    border: none;
    outline: none;
    background-color: transparent;
    outline: 2px solid var(--primary-color);
    border-radius: 4px;
    transition: 0.3s ease-in;
}

.second_btn:hover {
    background-color: var(--primary-color);
    color: #fff;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #ffffff00;
    z-index: -1;
    visibility: hidden;
    opacity: 0;
}

.overlay.active {
    visibility: visible;
    opacity: 1;
}

.navMenu {
    display: none;
}

.navMenu .bar {
    width: 35px;
    height: 5px;
    background-color: #333;
    margin-top: 5px;
    display: block;
    cursor: pointer;
    transition: 0.5s ease-in-out;
}

.navMenu.isActive .bar:nth-child(2) {
    opacity: 0;
}

.navMenu.isActive .bar:nth-child(1) {
    transform: translateY(10px) rotate(45deg);
}

.navMenu.isActive .bar:nth-child(3) {
    transform: translateY(-10px) rotate(-45deg);
}


@media (max-width:550px) {
    .navMenu {
        display: block;
    }

    .nav_item {
        flex-direction: column;
        position: absolute;
        width: 100%;
        top: 70px;
        left: 0px;
        color: #fff;
        transition: 0.3s ease-in-out;
        visibility: hidden;
        opacity: 0;
        padding: 1em;
        z-index: 99;
        background-color: var(--primary-color);
    }

    .nav_item.active {
        visibility: visible;
        opacity: 1;
    }

    .nav_item a {
        color: #fff !important;
    }

    .active {
        color: red !important;
    }

}
</style>