<template>
    <Loader v-if="loading" />
    <section class="my_profile" v-if="!loading">
        <div class="container">
            <div class="profile_wrapper">
                <h1>Profile Razu islam</h1>
                <!-- Form -->
                <form @submit.prevent="handleLogin">
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="email">Email</label>
                        <input autocomplete="off" v-model="form.email" type="email" placeholder="Enter email address..."
                            id="email">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="password">Fullname</label>
                        <input autocomplete="off" v-model="form.fullname" type="email"
                            placeholder="Enter email address..." id="email">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control profile_control">
                        <label for="password">Profile Picture</label>
                        <img :src="form.avatar" :alt="form.fullname" class="profile_img"/>
                    </div>
                    <!-- Login Button -->
                    <button type="submit" class="app_btn">Update Profile</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import Loader from '../../components/loader/Loader.vue'
export default {
    data() {
        return {
            token: JSON.parse(localStorage.getItem("user")),
            form: {
                fullname:"sd",
                email:"sd",
                avatar:"sd"
            },
            loading: false
        };
    },
    async mounted() {
        if (!this.token?.token)
            return this.$router.push("/login");
        this.loading = true
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/user/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${this.token?.token}`,
                },
                credentials: true,
            });
            this.form = { ...data?.userInfo };
            this.loading = false
        } catch (error) {
            this.loading = false
            console.log(error)
        }
    },
    methods: {

    },
    components: { Loader }
}
</script>

<style>
.my_profile .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
}

.my_profile .profile_wrapper {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    padding: 1.5em;
    width: 550px;
    border-radius: 8px;
}

.profile_wrapper h1 {
    margin-bottom: 1em;
    color: #333;
    text-align: center;
}
.profile_control .profile_img{
    width: 100px;
    height: 100px;
}
.profile_control label{
    display: block;
    width: 100%;
    margin-top: 1em;
    margin-bottom: 1em;
}

@media (max-width:550px){
    .my_profile .profile_wrapper{
        width: 100%;
    }
}

</style>