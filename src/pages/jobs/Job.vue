<template>
    <Loader v-if="loading" />
    <section class="jobs" v-if="!loading">
        <div class="container">
            <!-- Search Jobs -->
            <div class="search_jobs">
                <input type="text" v-model="search" placeholder="Search jobs...." />
                <button class="app_btn" @click="handleSearch">Find Job</button>
            </div>
            <!-- Display All Jobs -->
            <div class="jobs_wrapper">
                <h1>Showing {{ jobs?.length }} Jobs</h1>
                <!-- flexbox container -->
                <div class="flexBox">
                    <!-- Single Jobs -->
                    <Job v-for="job in jobs" :key="job?._id" :job="job" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import Job from '../../components/job/Job.vue';
import Loader from '../../components/loader/Loader.vue';
export default {
    components: { Job, Loader },
    data() {
        return {
            jobs: [],
            search: "",
            loading: false,
            search: ""
        }
    },
    mounted() {
        this.handleSearch()
    },
    watch: {
        search() { this.handleSearch() }
    },
    methods: {
        async handleSearch() {
            this.loading = true
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/job/jobs?search=${this.search}`)
                this.loading = false;
                this.jobs = data?.jobs
            } catch (error) {
                this.loading = false;
                console.log(error)
            }
        }
    },

}
</script>

<style>
.jobs {
    background-color: #fafafb;
    padding: 3em 0px;
    min-height: 73.7vh;
}

.search_jobs input {
    width: 90%;
    padding: 0.8em;
    border: 1px solid #ddd;
    outline: none;
    border-radius: 4px;
    margin-bottom: 1em;
}

.search_jobs input:focus {
    outline: 1px solid var(--primary-color);
}

.flexBox {
    display: flex;
    align-items: center;
    gap: 1em;
    flex-wrap: wrap;
}
</style>