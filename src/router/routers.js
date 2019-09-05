import Vue from 'vue';
import VueRouter from 'vue-router';

// import Dashboard from "@/components/views/dashboard/Dashboard";

// import SystemController from "@/page/system/manage/SystemController";
// import AreaManage from "@/page/system/manage/AreaManage";
// import MenuManage from "@/page/system/manage/MenuManage";
// import UserManage from "@/page/system/manage/UserManage";
// import RoleManage from "@/page/system/manage/RoleManage";
// import PermissionManage from "@/page/system/manage/PermissionManage";

// import WarnController from "@/page/system/warn/WarnController";
// import WarnManage from "@/page/system/warn/WarnManage";




const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/Dashboard',
    name: 'Dashboard',
    params: {menu:'主页'},
    component: resolve => require(['@/components/views/dashboard/Dashboard.vue'], resolve)
  }
  ,{
    path: '/',
    redirect: {name: 'Dashboard',params:{menu:'主页'}}
  }
];

Vue.use(VueRouter);
export default new VueRouter({routes});
