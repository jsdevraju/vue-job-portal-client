<template>
  <div>
    <!-- Navbar -->
    <Navbar />
    
    <!-- ALl Route View -->
    <router-view />

    <!-- Footer -->
    <Footer />

  </div>
</template>

<script>
import About from './pages/about/About.vue';
import Navbar from './components/navbar/Navbar.vue'
import Footer from './components/footer/Footer.vue';


export default {
    components: { About, Navbar, Footer },
    data(){
      return {
        userInfo:JSON.parse(localStorage.getItem("user")),
      }
    },
    mounted(){
      this.$store.dispatch('authModule/setUser', {token: this.userInfo?.token})
    },

}
</script>

<style>
/* Google Font */
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Open+Sans:ital,wght@0,400;0,500;0,600;1,300&display=swap');

/* reset css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}

h1,
h2,
h3,
h4,
h5,
h6,
a,
span,
p,
button,
input,
label,
textarea,
div {
  font-family: 'Open Sans', sans-serif;
}

/* variable color */
:root{
  --primary-color:#42d392;
  --text-color:#83808099;
  --white-color:#fff;
}
/* Default Class */
.app_btn{
  font-size: 1em;
  font-weight: 500;
  padding: 0.7em 1.5em;
  border: none;
  outline: none;
  transition: 0.3s ease-in-out;
  background-color: var(--primary-color);
  color: var(--white-color);
  border-radius: 4px;
  cursor: pointer;
}
.app_btn:hover{
  background-color: #3ab67e;
}
.container{
  max-width: 1170px;
  margin: 0 auto;
  padding: 1em;
}
.form_control input{
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;
  display: block;
  padding: 0.8em;
  border: 1px solid #ddd;
  outline: none;
  border-radius: 4px;
}
.form_control textarea{
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;
  display: block;
  padding: 0.8em;
  border: 1px solid #ddd;
  outline: none;
  border-radius: 4px;
}
.form_control select{
  width: 100%;
  margin-bottom: 1em;
  margin-top: 1em;
  display: block;
  padding: 0.8em;
  border: 1px solid #ddd;
  outline: none;
  border-radius: 4px;
}
.form_control input:focus{
  outline: 2px solid var(--primary-color);
}
button:disabled{
  opacity: 0.4;
}
</style>