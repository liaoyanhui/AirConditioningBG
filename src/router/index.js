import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/userInformation/personalInformation',
    name: 'userInformation',
    alwaysShow: true,
    meta: { title: '用户信息', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/userInformation/unitInformation',
        name: 'unitInformation',
        component: () => import('@/views/userInformation/unitInformation/index'),
        meta: { title: '单位信息', icon: 'table' }
      },
      {
        path: '/userInformation/personalInformation',
        name: 'personalInformation',
        component: () => import('@/views/userInformation/personalInformation/index'),
        meta: { title: '人员信息', icon: 'table' }
      }
    ]
  },

  {
    path: '/projectManagement',
    component: Layout,
    children: [
      {
        path: '/projectManagement',
        name: 'projectManagement',
        component: () => import('@/views/projectManagement/index'),
        meta: { title: '项目管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/equipmentManagement',
    component: Layout,
    redirect: '/equipmentManagement/equipmentInformation',
    name: 'equipmentManagement',
    alwaysShow: true,
    meta: { title: '设备管理', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/equipmentManagement/equipmentInformation',
        name: 'equipmentInformation',
        component: () => import('@/views/equipmentManagement/equipmentInformation/index'),
        meta: { title: '设备信息', icon: 'table' }
      },
      {
        path: '/equipmentManagement/videoInformation',
        name: 'videoInformation',
        component: () => import('@/views/equipmentManagement/videoInformation/index'),
        meta: { title: '视频信息', icon: 'table' }
      },
    ]
  },
  {
    path: '/statisticAnalysis',
    component: Layout,
    redirect: '/statisticAnalysis/eqHistory',
    name: 'statisticAnalysis',
    alwaysShow: true,
    meta: { title: '统计分析', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/statisticAnalysis/eqHistory',
        name: 'eqHistory',
        component: () => import('@/views/statisticAnalysis/eqHistory/index'),
        meta: { title: '设备历史数据', icon: 'table' }
      },
      {
        path: '/statisticAnalysis/eqHistoryAnalysis',
        name: 'eqHistoryAnalysis',
        component: () => import('@/views/statisticAnalysis/eqHistoryAnalysis/index'),
        meta: { title: '设备历史数据分析', icon: 'table' }
      },
    ]
  },
  {
    path: '/alarmInformation',
    component: Layout,
    redirect: '/alarmInformation/unreadInformation',
    name: 'alarmInformation',
    alwaysShow: true,
    meta: { title: '报警信息', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/alarmInformation/unreadInformation',
        name: 'unreadInformation',
        component: () => import('@/views/alarmInformation/unreadInformation/index'),
        meta: { title: '未读报警', icon: 'table' }
      },
      {
        path: '/alarmInformation/allInformation',
        name: 'allInformation',
        component: () => import('@/views/alarmInformation/allInformation/index'),
        meta: { title: '全部报警', icon: 'table' }
      },
    ]
  },

  {
    path: '/realTimeMonitoring',
    component: Layout,
    redirect: '/realTimeMonitoring/eqMonitoring',
    name: 'realTimeMonitoring',
    alwaysShow: true,
    meta: { title: '实时监控', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/realTimeMonitoring/eqMonitoring',
        name: 'eqMonitoring',
        component: () => import('@/views/realTimeMonitoring/eqMonitoring/index'),
        meta: { title: '设备监控', icon: 'table' }
      },
      {
        path: '/realTimeMonitoring/listMonitoring',
        name: 'listMonitoring',
        component: () => import('@/views/realTimeMonitoring/listMonitoring/index'),
        meta: { title: '列表监控', icon: 'table' }
      },
      {
        path: '/realTimeMonitoring/videoMonitoring',
        name: 'videoMonitoring',
        component: () => import('@/views/realTimeMonitoring/videoMonitoring/index'),
        meta: { title: '视频监控', icon: 'table' }
      },
    ]
  },
  {
    path: '/platformOverview',
    component: Layout,
    redirect: '/platformOverview/homepageMenu',
    name: 'platformOverview',
    alwaysShow: true,
    meta: { title: '平台概览', icon: 'el-icon-s-help' },
    children: [
      {
        path: '/platformOverview/homepageMenu',
        name: 'homepageMenu',
        component: () => import('@/views/platformOverview/homepageMenu/index'),
        meta: { title: '主页菜单', icon: 'table' }
      },
      {
        path: '/platformOverview/projectInformation',
        name: 'projectInformation',
        component: () => import('@/views/platformOverview/projectInformation/index'),
        meta: { title: '项目信息', icon: 'table' }
      },
      {
        path: '/platformOverview/eqInformation',
        name: 'eqInformation',
        component: () => import('@/views/platformOverview/eqInformation/index'),
        meta: { title: '设备信息', icon: 'table' }
      },
      {
        path: '/platformOverview/systemStatistics',
        name: 'systemStatistics',
        component: () => import('@/views/platformOverview/systemStatistics/index'),
        meta: { title: '系统统计', icon: 'table' }
      },
    ]
  },
  {
    path: '/hardwareIntroduction',
    component: Layout,
    children: [
      {
        path: '/hardwareIntroduction',
        name: 'hardwareIntroduction',
        component: () => import('@/views/hardwareIntroduction/index'),
        meta: { title: '硬件介绍', icon: 'form' }
      }
    ]
  },
  {
    path: '/bigScreenSupervision',
    component: Layout,
    children: [
      {
        path: '/bigScreenSupervision',
        name: 'bigScreenSupervision',
        component: () => import('@/views/bigScreenSupervision/index'),
        meta: { title: '大屏监督', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
