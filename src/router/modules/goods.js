
import Layout from '@/layout'
export default {
  path: '/goods',
  component: Layout,
  meta: {
    title: '商品管理',
    icon: 'shangpin'
  },
  children: [
    {
      path: '/sku-class',
      name: 'sku-class',
      component: () => import('@/views/goods/components/goodsClass.vue'),
      meta: {
        title: '商品类型'
      }
    },
    {
      path: '/goods',
      name: 'goods',
      component: () => import('@/views/goods/components/goods.vue'),
      meta: {
        title: '商品管理'

      }
    }

  ]
}
