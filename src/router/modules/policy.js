
import Layout from '@/layout'
export default {
  path: '/policy',

  component: Layout,
  children: [
    {
      path: '',
      name: 'task',
      component: () => import('@/views/policy'),
      meta: {
        title: '策略管理',
        icon: 'celue'
      }

    }
  ]
}
