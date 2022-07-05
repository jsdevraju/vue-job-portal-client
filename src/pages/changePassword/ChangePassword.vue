<template>
    <Loader v-if="loading" />
    <section class="changePassword" v-if="!loading">
        <div class="container">
            <div class="changePassword_wrapper">
                <h1>Enter valid email and new password</h1>
                <!-- Form -->
                <form @submit.prevent="handleChangePassword">
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="email">Email</label>
                        <input autocomplete="off" v-model="email" type="email" placeholder="Enter email address..."
                            id="email">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="password">New Password</label>
                        <input autocomplete="off" v-model="password" type="password" placeholder="Enter password..."
                            id="password">
                    </div>
                    <!-- Login Button -->
                    <button type="submit" class="app_btn">Submit</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {

    data() {
        return {
            email: "",
            password: "",
            loading: false
        }
    },
    methods: {
        async handleChangePassword() {
            if (!this.email) return this.$toast.error("Email is require")
            if (this.password?.length < 8 || this.password?.length > 32) return this.$toast.error("Password at least 8 or longer than 32 charter")
            this.loading = true
            try {
                await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/change-password`, {
                    email: this.email,
                    password: this.password
                });
                this.loading = false;
                this.$toast.success("Password Change Successfully");
                this.$router.push('/login')
            } catch (error) {
                this.loading = false;
                console.log(error)
            }
        }
    }
}
</script>

<style>
.changePassword .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
}

.changePassword .changePassword_wrapper {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    padding: 1.5em;
    width: 550px;
    border-radius: 8px;
}

.changePassword_wrapper h1 {
    color: #333;
    text-align: center;
    margin-bottom: 1em;
}


@media (max-width:550px) {
    .changePassword .changePassword_wrapper {
        width: 100%;
    }
}
</style>