
const routes = [
    {
        path: '/',
        component: resolve=>(require(["@/views/home"],resolve)),
    },
    {
      path: '/login',
      component: resolve=>(require(["@/views/login"],resolve)),
    },
    {
      path: '/register',
      component: resolve=>(require(["@/views/login/register"],resolve)),
    },
    {
      path: '/expert',
      component: resolve=>(require(["@/views/expertRounds"],resolve)),
    },
    {
      path: '/member',
      component: resolve=>(require(["@/views/member"],resolve)),
    },
    // {
    //   path: '/meetingInfo',
    //   component: resolve=>(require(["@/views/expertRounds/meetingInfo"],resolve)),
    // },
    // {
    //   path: '/meetingMaterial',
    //   component: resolve=>(require(["@/views/expertRounds/meetingMaterial"],resolve))
    // }
  ]

export default routes