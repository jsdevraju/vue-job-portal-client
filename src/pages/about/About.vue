<template>
    <div class="center">
        <div class="wrapper">
            <h1>About Vue Job Portal</h1>
            <p>
                WorksLee is a peer-to-peer marketplace designed to help people manage their daily workload. It's a place
                where we are empowering small local entrepreneurs. and helping people to earn by part-time handy work.
            </p>

            <p>
                WorksLee creating the opportunity for more hardworking individuals to work for themselves and earn
                supplemental income completing tasks through . At WorksLee, we have created a platform that lets you
                connect with people from your area to get any job done
            </p>

            <button class="app_btn">Learn More</button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 73.7vh;
}
.wrapper{
    max-width: 700px;
    text-align: center;
}
.wrapper p{
    margin-top: 1em;
    line-height: 25px;
    letter-spacing: 2px;
    color: var(--text-color);
}
.app_btn{
    margin-top: 1em;
}
</style>