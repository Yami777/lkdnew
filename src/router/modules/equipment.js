
import Layout from '@/layout'
export default {
  path: '/equipment',
  name: 'equipment',
  component: Layout,
  meta: {
    title: '设备管理',
    icon: 'shebei'
  },
  children: [
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/equipment/components'),
      meta: {
        title: '设备管理'
      }
    },
    {
      path: '/status',
      name: 'status',
      component: () => import('@/views/equipment/components/status.vue'),
      meta: {
        title: '设备状态'

      }
    },
    {
      path: '/type',
      name: 'type',
      component: () => import('@/views/equipment/components/type.vue'),
      meta: {
        title: '设备类型管理'

      }
    }
  ]
}
