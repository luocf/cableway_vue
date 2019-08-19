// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/home',
    children: [
      // list
      {
        path: '/home',
        name: 'home',
        hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
        component: () => import('@/views/list/TableList'),
        meta: { title: '首页', keepAlive: true, permission: [ 'table' ] }
      },
      {
        path: '/advancedsetting',
        name: 'advancedSetting',
        component: RouteView,
        redirect: '/advancedsetting/project',
        meta: { title: '高级设置', icon: 'profile', permission: [ 'form' ] },
        children: [
          {
            path: '/advancedsetting/project',
            name: 'ProjectName',
            component: () => import('@/views/setting/Project'),
            meta: { title: '项目信息', permission: [ 'form' ] }
          },
          {
            path: '/advancedsetting/bracket',
            name: 'BracketPosition',
            component: () => import('@/views/setting/BracketPosition'),
            meta: { title: '静态参数', permission: [ 'form' ] }
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
