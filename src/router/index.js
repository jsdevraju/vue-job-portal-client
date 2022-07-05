import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/home/Home.vue';
import About from '../pages/about/About.vue';
import Login from '../pages/login/Login.vue';
import Register from '../pages/register/Register.vue';
import Job from '../pages/jobs/Job.vue';
import ForgotPassword from '../pages/fotgotPassword/ForgotPassword.vue';
import Profile from '../pages/profile/Profile.vue';
import AddJob from '../pages/add-job/AddJob.vue';
import ResetCode from '../pages/resetCode/ResetCode.vue';
import ChangePassword from '../pages/changePassword/ChangePassword.vue'
import JobDetails from '../pages/JobDetails/JobDetails.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: Job
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPassword,
      children:[
        {
          path: 'code',
          name:"code",
          component: ResetCode,
          props:true,
        }
      ]
    },
    {
      path: '/change-password',
      name:"password",
      props:true,
      component: ChangePassword,
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/add-job',
      name: 'add-job',
      component: AddJob
    },
    {
      path: '/job/details/:id',
      name: 'job-details',
      component: JobDetails
    }
  ]
})

export default router
