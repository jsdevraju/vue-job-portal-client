<template>
    <section class="addJobs">
        <Loader v-if="loading" />
        <div class="container">
            <div class="addJobs_wrapper">
                <h1>Post your job</h1>
                <!-- Form -->
                <form @submit.prevent="handleSubmit">
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="logo">Upload Company Logo</label>
                        <input v-if="!form.logo" v-on:change="uploadFile" autocomplete="off" type="file" id="logo">
                        <div v-if="form.logo" class="profile_logo">
                            <img :src="form.logo" alt="Razu Islam" />
                        </div>
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="title">Job Title</label>
                        <input autocomplete="off" v-model="form.title" type="text" placeholder="Job title..."
                            id="title">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="description">Job Description</label>
                        <textarea cols="30" rows="10" autocomplete="off" v-model="form.description" type="text"
                            placeholder="Job description..." id="tag" />
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="tag">Job Tag</label>
                        <input autocomplete="off" v-model="form.tag" type="text" placeholder="Job tag..." id="tag">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="category">Job category</label>
                        <select v-model="form.category" id="category">
                            <option selected disabled>Choose Category</option>
                            <option v-for="category in categories" v-bind:value="category.name" :key="category.id">
                                {{ category.name }}
                            </option>
                        </select>

                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="salary">Job Salary</label>
                        <input autocomplete="off" v-model="form.salary" type="number" placeholder="Job salary..."
                            id="salary">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="location">Job Location</label>
                        <input autocomplete="off" v-model="form.location" type="text" placeholder="Job location..."
                            id="location">
                    </div>
                    <!-- Form Control -->
                    <div class="form_control">
                        <label for="jobType">Job Type</label>
                        <select v-model="form.jobType" id="jobType">
                            <option selected disabled>Choose Job Type</option>
                            <option v-for="jobtype in jobType" :value="jobtype.name" :key="jobtype.id">
                                {{ jobtype.name }}
                            </option>
                        </select>
                    </div>
                    <!-- Login Button -->
                    <button type="submit" class="app_btn">Post Job</button>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../../../firebase';
import Loader from '../../components/loader/Loader.vue';
import { categories } from '../../data/categories';
import { jobType } from '../../data/categories';

export default {
    components: { Loader },
    data() {
        return {
            token: JSON.parse(localStorage.getItem('user')),
            loading: false,
            form: {
                logo: "",
                title: "",
                description: "",
                tag: "",
                category: "",
                salary: 0,
                location: "",
                jobType: ""
            },
            categories,
            jobType
        }
    },
    methods: {
        uploadFile(e) {
            const storageRef = ref(storage, `profile_img/${e.target.files[0].name}`);
            const uploadTask = uploadBytesResumable(storageRef, e.target.files[0]);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.progress = progress
                },
                (error) => {
                    return this.$toast.error(error.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        this.form.logo = downloadUrl;
                    });
                }
            );
        },
        async handleSubmit() {
            if (!this.form.logo || !this.form.title || !this.form.description || !this.form.tag || !this.form.category || !this.form.salary || !this.form.location || !this.form.jobType) return this.$toast.error("All Fields are require");

            if (this.form.title?.length < 5 || this.form.title?.length > 30) return this.$toast.error("Title al least 5 characters or longer then 30");

            if (this.form.description?.length < 20 || this.form.description?.length > 400) return this.$toast.error("Description al least 20 characters or longer then 400");

            if (this.form.category?.length < 3 || this.form.category?.length > 15) return this.$toast.error("Category al least 20 characters or longer then 400");

            if (this.form.location?.length < 3 || this.form.location?.length > 30) return this.$toast.error("Location al least 20 characters or longer then 400");

            if (this.form.salary?.length < 3) return this.$toast.error("Salary al least 3 characters");
            if (this.form.jobType?.length < 3) return this.$toast.error("Jon Type al least 3 characters");


            this.loading = true;
            try {
                const { data } = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/job/create/job`, {
                    logo: this.form.logo,
                    title: this.form.title,
                    description: this.form.description,
                    tag: this.form.tag.split(" "),
                    category: this.form.category,
                    salary: this.form.salary,
                    location: this.form.location,
                    jobType: this.form.jobType
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.token?.token}`,
                    },
                    credentials: true,
                });
                this.loading = false;
                console.log(data);
                this.$router.push('/jobs');
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>


<style>
.addJobs_wrapper h1 {
    margin-bottom: 1em;
}

.profile_logo {
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile_logo img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 100%;
    margin-bottom: 1em;
    margin-top: 1em;
}
</style>