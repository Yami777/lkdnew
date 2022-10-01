
import Layout from '@/layout'
export default {
  path: '/report',
  component: Layout,
  children: [
    {
      path: '/index',
      name: 'report',
      component: () => import('@/views/report'),
      meta: {
        title: '对账管理',
        icon: 'zhangdan'
      }
    }]
}
