import Vue from 'vue'
import Router from 'vue-router'
import SysIndex from 'views/pmsSystem/user/MainIndex'
import Login from 'views/pmsSystem/user/Login'
import Register from 'views/pmsSystem/user/Register'
import ForgotPwd from 'views/pmsSystem/user/ForgotPwd'
import FindPwd from 'views/pmsSystem/user/FindPwd'
import ApplyHousehold from 'views/pmsSystem/user/ApplyHousehold'
import SystemBuy from 'views/pmsSystem/user/SystemBuy'

import SysContainer from 'views/pmsSystem/sys/SysContainer'
import SysMain from 'views/pmsSystem/sys/SysMain'
import UserInfo from 'views/pmsSystem/user/UserInfo'
import Community from 'views/pmsSystem/sys/data/Community'
import ComunityAdd from 'views/pmsSystem/sys/data/ComunityAdd'
import Building from 'views/pmsSystem/sys/data/Building'
import BuildingAdd from 'views/pmsSystem/sys/data/BuildingAdd'
import HouseHold from 'views/pmsSystem/sys/data/HouseHold'
import HouseHoldAdd from 'views/pmsSystem/sys/data/HouseHoldAdd'
import Park from 'views/pmsSystem/sys/data/Park'
import ParkAdd from 'views/pmsSystem/sys/data/ParkAdd'

import FeeSub from 'views/pmsSystem/sys/fee/FeeSub'
import FeePay from 'views/pmsSystem/sys/fee/FeePay'
import FeeTip from 'views/pmsSystem/sys/fee/FeeTip'

import Staff from 'views/pmsSystem/sys/organ/Staff'
import Position from 'views/pmsSystem/sys/organ/Position'

import Maintain from 'views/pmsSystem/sys/customer/Maintain'
import Complaint from 'views/pmsSystem/sys/customer/Complaint'

import PmsIndex from 'views/saasSystem/MainIndex'

import HelloWorld from 'components/HelloWorld'
// import storage from 'good-storage'

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'PmsIndex',
      component: PmsIndex
    },
    /* 用户登录 注册 修改密码 路由 */
    {
      path: '/user',
      name: 'user',
      component: SysIndex,
      children: [
        {
          path: 'login',
          alias: '/user',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
        {
          path: 'forgotpwd',
          name: 'forgotpwd',
          component: ForgotPwd
        },
        {
          path: 'findpwd',
          name: 'findpwd',
          component: FindPwd
        },
        {
          path: 'apply',
          name: 'apply',
          component: ApplyHousehold
        },
        {
          path: 'systembuy',
          name: 'systembuy',
          component: SystemBuy
        }
      ]
    },
    /* 物业系统路由 */
    {
      path: '/sys',
      name: 'sys',
      component: SysContainer,
      children: [
        {
          path: 'main',
          name: 'main',
          alias: '/sys',
          component: SysMain
        },
        {
          path: 'user-info',
          name: 'user-info',
          component: UserInfo
        }
      ]
    },

    /* 数据中心路由开始 */
    {
      path: '/sys/data',
      name: 'data',
      component: SysContainer,
      children: [
        {
          path: 'community',
          name: 'community',
          component: Community
        },
        {
          path: 'community-edit',
          name: 'community-edit',
          component: ComunityAdd
        },
        {
          path: 'building',
          name: 'building',
          component: Building,
        },
        {
          path: 'building-edit',
          name: 'building-edit',
          component: BuildingAdd,
        },
        {
          path: 'household',
          name: 'household',
          component: HouseHold,
        },
        {
          path: 'household-edit',
          name: 'household-edit',
          component: HouseHoldAdd,
        },
        {
          path: 'park',
          name: 'park',
          component: Park,
        },
        {
          path: 'park-edit',
          name: 'park-edit',
          component: ParkAdd,
        },
      ]
    },
    /* 数据中心路由结束 */

    /* 财务管理路由开始 */
    {
      path: '/sys/fee',
      name: 'data',
      component: SysContainer,
      children: [
        {
          path: 'fee-subject',
          name: 'fee_subject',
          component: FeeSub
        },
        {
          path: 'fee-pay',
          name: 'fee_pay',
          component: FeePay
        },
        {
          path: 'fee-tip',
          name: 'fee_tip',
          component: FeeTip
        },
      ]
    },
    /* 财务管理路由结束 */

    /* 内部管理路由开始 */
    {
      path: '/sys/organ',
      name: 'data',
      component: SysContainer,
      children: [
        {
          path: 'staff',
          name: 'staff',
          component: Staff
        },
        {
          path: 'position',
          name: 'position',
          component: Position
        }
      ]
    },
    /* 内部管理路由结束 */

    /* 客服服务路由开始 */
    {
      path: '/sys/customer',
      name: 'data',
      component: SysContainer,
      children: [
        {
          path: 'maintain',
          name: 'maintain',
          component: Maintain
        },
        {
          path: 'complaint',
          name: 'complaint',
          component: Complaint
        },
      ]
    },
    /* 客服服务路由结束 */
    {
      path: '/test',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})

/* 未登录白名单 */
// const whiteList = ['/user', '/user/register','/user/forgotpwd','/user/findpwd'];
// const user = storage.get('user',null);
// const flag = true;
// router.beforeEach((to, from, next) => {
//   if (whiteList.indexOf(to.path) !== -1) {
//     next();
//   }else{
//     if(flag){
//       next();
//     }else{
//       if(user){
//         next();
//       }else{
//         next('/user');
//       }
//     }
//   }
  
// })

export default router;
