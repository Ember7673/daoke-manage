import Layout from '@/components/layout';
const routes = [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'Home',
          component:resolve=>(require(["@/views/home"],resolve)),
        }
      ]
    },
    {
      path: '/login',
      component: resolve=>(require(["@/views/login"],resolve)),
    },
    {
      path: '/expert',
      component: Layout,
      children: [
        {
          path: '/expert',
          name: 'expert',
          component: resolve=>(require(["@/views/expertRounds"],resolve)),
        }
      ]
    },
    {
      path: '/member',
      component: Layout,
      children: [
        {
          path: '/member',
          name: 'member',
          component: resolve=>(require(["@/views/member"],resolve)),
        }
      ]
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