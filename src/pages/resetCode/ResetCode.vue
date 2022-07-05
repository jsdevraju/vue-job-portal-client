<template>
    <section class="reset" v-if="query == '/forgot-password/code'">
        <div class="container">
            <div class="reset_wrapper">
                <h1>Enter valid email and reset code</h1>
                <!-- Form -->
                <form @submit.prevent="handleResetCode">
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="email">Email</label>
                        <input autocomplete="off" v-model="email" type="email" placeholder="Enter email address..."
                            id="email">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="code">Reset Code</label>
                        <input autocomplete="off" v-model="code" type="text" placeholder="Enter verify code..."
                            id="code">
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
            code: "",
            query: this.$route.path,
            loading:false
        }
    },
    mounted(){
        this.query = `/forgot-password/code`
    },
    methods: {
        async handleResetCode() {
            this.loading = true
            try {
                await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/verify-code`, {
                    email: this.email,
                    resetCode:this.code
                });
                this.loading = false;
                this.$toast.success("Verify Successfully");
                this.$router.push('/change-password')
            } catch (error) {
                this.loading = false;
                console.log(error)
                if(error?.response?.data?.includes("resetCode")) return this.$toast.error("Invalid Code")
                else if(error?.response?.data?.includes("email")) return this.$toast.error("Invalid Email")
            }
        }
    }
}
</script>

<style>
.reset .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
}

.reset .reset_wrapper {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    padding: 1.5em;
    width: 550px;
    border-radius: 8px;
}

.reset_wrapper h1 {
    color: #333;
    text-align: center;
    margin-bottom: 1em;
}

@media (max-width:550px){
   .reset .reset_wrapper {
     width: 100%;
   }
}



</style>