<template>
    <div class="single_job">
        <!-- Company Logo -->
        <div class="logo">
            <img :src="job?.logo" :alt="job?.title">
        </div>
        <!-- Jobs Information -->
        <div class="job_info">
            <h3>{{job?.title}}</h3>
            <p>{{job?.description.substr(0, 100)}}...</p>
            <div class="tagStyles">
                <span v-for="tag in job?.tag" :key="job?.id" class="tag">{{tag}}</span>
            </div>
            <div class="btn_grp">
                <button @click="handlePush" class="app_btn">Apply Now</button>
                <button @click="handleDelete" v-if="token?.userInfo?._id == job?.postBy" class="app_btn delete">Delete</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props:{
        job:{
            type:Object
        }
    },
    data(){
        return {
            token:JSON.parse(localStorage.getItem("user"))
        }
    },
    methods:{
       async handleDelete(){
            try {
               await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/job/job/${this.job?._id}`, {
                headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.token?.token}`,
                    },
                    credentials: true,
            });
            this.$toast.success("Job Delete Successfully")
            this.$router.push("/")
            } catch (error) {
                console.log(error)
            }
        },
        handlePush(){
            return this.$router.push(`/job/details/${this.job?._id}`)
        }
    }
}
</script>

<style>
.single_job {
    width: 350px;
    background-color: #fff;
    padding: 1.3em;
    border-radius: 10px;
    margin-top: 1em;
}

.job_info h3 {
    font-size: 1.2em;
    color: #333;
    margin-top: 1em;
    margin-bottom: 0.5em;
}

.job_info p {
    color: var(--text-color);
    line-height: 24px;
}

.tagStyles {
    margin-top: 0.7em;
}

.tag {
    display: inline-block;
    background-color: #e1ebfb;
    padding: 0.6em;
    color: var(--primary-color);
    border-radius: 5px;
    margin-right: 0.8em;
}

.logo img {
    width: 60px;
    height: 60px;
    border-radius: 100%;
    object-fit: cover;
}
.btn_grp{
    display: flex;
    align-items: center;
    gap: 1.5em;
}
.delete{
    background-color: #dd1010;
}

</style>