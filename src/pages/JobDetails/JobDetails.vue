<template>
    <Loader v-if="loading" />
    <section class="job_details" v-if="!loading">
        <div class="container">
            <div class="bg_img"></div>
            <div class="comapny_logo">
                <img :src="data?.logo" alt="Razu Islam">
            </div>
            <!-- Details -->
            <div class="job_info">
                <h1>{{ data?.title }}</h1>
                <div class="location_with_time">
                    <p>Location: <span>Pabna</span></p>
                    <p>Posted: <span>{{ time }}</span></p>
                </div>
                <!-- Employee Type -->
                <div class="employ_type">
                    <EmployBox title="Experience" content="Minium 1 year" />
                    <EmployBox title="Work level" content="Senior Level" />
                    <EmployBox title="Employee Type" :content="data?.jobType" />
                    <EmployBox title="Offer Salary" :content="`$${data?.salary}`" />
                </div>
                <!-- Overview -->
                <div class="overview">
                    <h3>Overview</h3>
                    <p>{{ data?.description }}</p>
                </div>
                <!-- Job Description -->
                <div class="job_description">
                    <h3>Job Description</h3>
                    <p>{{ data?.description }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import EmployBox from '../../components/EmployBox/EmployBox.vue'
import Loader from '../../components/loader/Loader.vue';


export default {
    data() {
        return {
            id: this.$route.params.id,
            data: null,
            time: moment(this.$data?.createAt).format("MMM Do YY"),
            loading: false
        };
    },
    mounted() {
        this.handleDetails();
    },
    methods: {
        async handleDetails() {
            this.loading = true
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/job/job/${this.id}`);
                this.data = data?.job;
                this.loading = false
            }
            catch (error) {
                this.loading = false
                console.log(error);
            }
        }
    },
    components: { EmployBox, Loader }
}
</script>

<style>
.employ_type {
    display: flex;
    align-items: center;
    gap: 1em;
    flex-wrap: wrap;
    width: 100%;
    border: 1px solid #ddd;
}

.bg_img {
    background-image: url('https://cdn.pixabay.com/photo/2021/02/01/12/28/fisherman-5970480_960_720.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 400px;
    border-radius: 20px;
}

.comapny_logo {
    position: relative;
}

.comapny_logo img {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
    position: absolute;
    top: -60px;
    left: 50px;
}

.job_details .job_info {
    margin-top: 10em;
}

.location_with_time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1em;
    margin-bottom: 1em;
}

.location_with_time p {
    color: darkcyan;
    font-weight: bold;
}

.location_with_time p span {
    color: var(--text-color);
    font-weight: 400;
}
</style>