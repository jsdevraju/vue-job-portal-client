<template>
    <Loader v-if="loading" />
    <section class="login" v-if="!loading">
        <div class="container">
            <div class="login_wrapper">
                <h1>Welcome to job portal login</h1>
                <!-- Form -->
                <form @submit.prevent="handleLogin">
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="email">Email</label>
                        <input autocomplete="off" v-model="form.email" type="email" placeholder="Enter email address..." id="email">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="password">Password</label>
                        <input autocomplete="off" v-model="form.password" type="password" placeholder="Enter password..." id="password">
                    </div>
                    <!-- Login Button -->
                    <button type="submit" class="app_btn" :disabled="!form.email || !form.password">Login Now</button>

                    <!-- Login Footer -->
                    <div class="footer_login">
                        <p>if you don't have an account ? please <router-link to="/register">register</router-link>
                        </p>
                        <router-link to="/forgot-password">forgot password?</router-link>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import Loader from '../../components/loader/Loader.vue';

export default {

    data() {
        return {
            form: {
                email: "",
                password: ""
            },
            loading: false,
            token:JSON.parse(localStorage.getItem('user'))
        }
    },
    methods: {
        //When User try to login
        async handleLogin() {
            if (!this.form.email) return this.$toast.error("Email is required");
            if (!this.form.password || this.form.password?.length < 8) return this.$toast.error("Password must be 8 charters");
            this.loading = true;
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/login`, {
                    email: this.form.email,
                    password: this.form.password
                });
                this.loading = false;
                this.$toast.success("Login Successfully");
                this.$store.dispatch("authModule/setUser", {token: data?.token})
                localStorage.setItem("user", JSON.stringify(data));
                this.$router.push("/")
                for (key in form) {
                    this.form[key] = ""
                }
            } catch (error) {
                this.loading = false
                if (error?.response?.data) return this.$toast.error(error?.response?.data?.message);
            }
        },
    },
    mounted() {
        if(this.token?.token) this.$router.push("/")
    },
    components: { Loader }
}
</script>

<style>
.login .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.login .login_wrapper {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    padding: 1.5em;
    width: 550px;
    border-radius: 8px;
}

.login_wrapper h1 {
    color: #333;
    text-align: center;
    margin-bottom: 1em;
}

.login_wrapper button {
    width: 100%;
}

.footer_login p {
    color: #333;
    font-size: 1em;
    margin-top: 1em;
    font-weight: 500;
    margin-bottom: 0.3em;
}

.footer_login a {
    color: #109fca;
    font-weight: bold;
}



@media (max-width:550px){
   .login .login_wrapper{
     width: 100%;
   }
}

</style>