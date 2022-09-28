
import Layout from '@/layout'
export default {
  path: '/node',
  name: 'node',
  component: Layout,
  meta: {
    title: '点位管理',
    icon: 'dianwei'
  },
  children: [
    {
      path: '/region',
      name: 'region',
      component: () => import('@/views/node/components/region.vue'),
      meta: {
        title: '区域管理'
      }
    },
    {
      path: '/node',
      name: 'operation',
      component: () => import('@/views/node/components/region.vue'),
      meta: {
        title: '点位管理'

      }
    },
    {
      path: '/partner',
      name: 'partner',
      component: () => import('@/views/node/components/partner.vue'),
      meta: {
        title: '合作商管理'

      }
    }

  ]
}
