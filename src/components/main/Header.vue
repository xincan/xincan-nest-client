
<!--
  头部导航栏
-->

<template>
  <div id="header">
    <div class="header-left"><span>{{title}}</span></div>
    <div class="header-center">
      <ul>
        <!--遍历选择后系统的一级菜单-->
<!--        <li v-for="(menu, key) in menus" :class="active === key ? 'active' : ''" @click="haderMenuClick(key, menu)" v-text="menu.name" ></li>-->
      </ul>
    </div>
    <div class="header-right">
      <ul>
        <li>
          <!--遍历系统-->
<!--          <el-select v-model="defaultSelectSystem" placeholder="请选择" @change="controllChange">-->
<!--            <el-option v-for="option in controll" :key="option.id" :label="option.label" :value="option.id" ></el-option>-->
<!--          </el-select>-->
        </li>
        <li>百里长风</li>
        <li>退出</li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Header"
    ,data() {
      return {
        title: "IStorM DRaaS"
        // ,controll:[{
        //     id: 11
        //     ,name: '首页'
        //     ,path: '/dashboard'
        //   },{
        //     id: 12
        //     ,name: '中控中心'
        //     ,path: '/controller'
        //     ,child: [{
        //       id: 121
        //       ,name: '系统管理'
        //       ,icon: 'fa-home'
        //       ,path: ''
        //       ,child: [
        //         {id: 1211 ,name: '地区管理', icon: 'fa-globe',    path: '/page/system/manage/areaManage'}
        //         ,{id: 1212 ,name: '菜单管理', icon: 'fa-bars',     path: '/page/system/manage/menuManage'}
        //         ,{id: 1213 ,name: '用户管理', icon: 'fa-user-o',   path: '/page/system/manage/userManage'}
        //         ,{id: 1214 ,name: '角色管理', icon: 'fa-user-md',  path: '/page/system/manage/roleManage'}
        //         ,{id: 1215 ,name: '权限管理', icon: 'fa-home',     path: '/page/system/manage/permissionManage'}
        //       ]
        //     }]
        // }]
      }
    }
    ,mounted(){
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/header";
</style>
