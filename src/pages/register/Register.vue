<template>
    <Loader v-if="loading" />
    <section class="login"  v-if="!loading">
        <div class="container">
            <div class="login_wrapper">
                <h1>Create an Account</h1>
                <!-- Form -->
                <form @submit.prevent="handleSubmit">
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="name">Full Name</label>
                        <input v-model="form.fullname" autocomplete="off" type="text" placeholder="Enter full name..." id="name">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="email">Email</label>
                        <input v-model="form.email" autocomplete="off" type="email" placeholder="Enter email address..." id="email">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="password">Password</label>
                        <input v-model="form.password" autocomplete="off" type="password" placeholder="Enter password..." id="password">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="profile" class="profileLabel">
                            <img v-if="!form.avatar" class="profile" src="../../assets/camera.png" alt="profile_img">
                            <img v-if="form.avatar" class="profile" :src="form.avatar" alt="profile_img">
                        </label>
                        <input autocomplete="off" v-on:change="uploadFile" type="file" class="inputFile" id="profile">
                    </div>
                    <!-- Login Button -->
                    <button type="submit" class="app_btn" :disabled="!form.avatar">Register Now</button>

                    <!-- Login Footer -->
                    <div class="footer_login">
                        <p>if you already have an account ? please <router-link to="/login">login</router-link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import { storage } from '../../../firebase';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage'
import axios from 'axios';
import Loader from '../../components/loader/Loader.vue';


export default {
    data() {
        return {
            form: {
                fullname: "",
                email: "",
                password: "",
                avatar: "https://firebasestorage.googleapis.com/v0/b/vue-jobportal.appspot.com/o/profile_img%2F3135715.png?alt=media&token=147ee30a-05e6-4437-885d-7ba874445c03"
            },
            progress: null,
            loading: false,
            token: JSON.parse(localStorage.getItem("user"))
        };
    },
    methods: {
        uploadFile(e) {
            const storageRef = ref(storage, `profile_img/${e.target.files[0].name}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.progress = progress;
            }, (error) => {
                return this.$toast.error(error.message);
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                    this.form.avatar = downloadUrl;
                    console.log(this.form.avatar);
                });
            });
        },
        async handleSubmit() {
            if (!this.form.email)
                return this.$toast.error("Email is required");
            if (!this.form.password || this.form.password?.length < 8)
                return this.$toast.error("Password must be 8 charters");
            if (!this.form.fullname || this.form.password?.fullname < 5)
                return this.$toast.error("Fullname must be 5 charters");
            this.loading = true;
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/auth/register`, {
                    fullname: this.form.fullname,
                    email: this.form.email,
                    password: this.form.password,
                    avatar: this.form.avatar
                });
                this.loading = false;
                this.$toast.success("Register Successfully");
                this.$store.dispatch("authModule/setUser", { token: data?.token });
                localStorage.setItem("user", JSON.stringify(data));
                this.$router.push("/");
                for (key in form) {
                    this.form[key] = "";
                }
            }
            catch (error) {
                console.log(error);
                this.loading = false;
                if (error?.response?.data)
                    return this.$toast.error(error?.response?.data?.message);
            }
        }
    },
    mounted() {
        if (this.token?.token)
            return this.$router.push("/");
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
    min-height: 73.8vh;
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

.inputFile {
    display: none !important;
}

.profileLabel {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background-color: #ddd;
    border-radius: 100%;
    margin: 0 auto;
}

.profile {
    width: 50px;
    height: 50px;
    object-fit: cover;
}


@media (max-width:550px){
   .login .login_wrapper{
     width: 100%;
   }
}

</style>