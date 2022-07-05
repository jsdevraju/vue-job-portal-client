<template>
    <Loader v-if="loading" />
    <section class="forgot" v-if="query == '/forgot-password'">
        <div class="container">
            <div class="forgot_wrapper">
                <h1>Enter you email address</h1>
                <!-- Form -->
                <form @submit.prevent="handleForgot">
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="email">Email</label>
                        <input autocomplete="off" v-model="email" type="email" placeholder="Enter email address..."
                            id="email">
                    </div>
                    <!-- Login Button -->
                    <button type="submit" class="app_btn">Submit</button>
                </form>
            </div>
        </div>
    </section>
    <router-view>
        <ResetCode v-if="query == '/forgot-password/code'" />
    </router-view>
       <router-view>
         <ChangePassword v-if="query == '/forgot-password/password'" />
       </router-view>
</template>

<script>
import ResetCode from '../resetCode/ResetCode.vue'
import ChangePassword from '../changePassword/ChangePassword.vue'
import axios from 'axios'
import Loader from '../../components/loader/Loader.vue'
export default {
    data() {
        return {
            email: "",
            query: this.$route.path,
            loading: false
        }
    },
    methods: {
        async handleForgot() {
            if(!this.email) return this.$toast.error("email is require")
            this.loading = true
            try {
                await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/reset-code`, {
                    email: this.email
                });
                this.loading = false;
                this.$toast.success("Reset Code Sent Successfully");
                this.$router.push('/forgot-password/code')
                this.query = '/forgot-password/code'
            } catch (error) {
                this.loading = false;
                console.log(error)
            }
        }
    },
    components: {
    ResetCode,
    ChangePassword,
    Loader
}
}
</script>

<style>
.forgot .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
}

.forgot .forgot_wrapper {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    padding: 1.5em;
    width: 550px;
    border-radius: 8px;
}

.forgot_wrapper h1 {
    color: #333;
    text-align: center;
    margin-bottom: 1em;
}

@media (max-width:550px){
   .forgot .forgot_wrapper{
     width: 100%;
   }
}

</style>