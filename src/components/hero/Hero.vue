<template>
    <section class="hero">
        <div class="container">
            <div class="hero_content">
                <span>welcome to our job portal</span>
                <h1>Find Your Dream Job</h1>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, a! Quod consequuntur consequatur doloribus exercitationem beatae optio officia incidunt! Possimus aut odit vitae suscipit accusantium.</p>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        
    }
</script>

<style>
.hero .container{
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 73.7vh;
}

.hero_content{
    max-width: 550px;
    text-align: center;
}
.hero_content span{
    font-size: 1em;
    text-transform: capitalize;
    margin-bottom: 0.4em;
    display: block;
}

.hero_content h1{
    margin-bottom: 0.5em;
    font-size: 2.5em;
}

.hero_content p {
    color: var(--text-color);
    font-weight: 400;
    line-height: 30px;
    font-size: 1em;
}

</style>