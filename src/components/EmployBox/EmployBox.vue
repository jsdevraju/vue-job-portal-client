<template>
    <div class="boxJob">
        <p>{{title}}</p>
        <h3>{{content}}</h3>
    </div>
</template>

<script>
    export default {
        props:['title','content']
    }
</script>

<style>
    .boxJob{
        border-right: 1px solid #ddd;
        width: 250px;
        padding: 1em;
        line-height: 5px;
    }
    .boxJob:last-child{
        border: none;
    }
</style>