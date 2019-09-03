
<!--
  左侧导航栏
-->

<template>
  <div id="navigation">
    <ul>
      <!--
          循环遍历一级菜单
          判断点击选中、鼠标浮动样式
      -->
      <li
        v-for="(nav,key) in menus"
        :class=" key === pKey ? 'active' : ''"
        @click="clickParentBtn(nav, key)"
      >
        <!-- 设置一级菜单图标 -->
        <span><i :class="'fa ' + nav.icon" />&nbsp;&nbsp;{{ nav.name }}</span>

        <!-- 设置一级菜单图标，判断如果菜单展开状态，箭头向上，反之向下 -->
        <span v-if="nav.child && nav.child.length > 0"><i :class="'fa ' + (key === pKey ? 'fa-angle-up' : 'fa-angle-down')" /></span>

        <!-- 设置一级菜单右侧选中‘缺口’图标 点击则有，反之没有 -->
        <span v-if="key === pKey && nav.child && nav.child.length == 0"><i :class="'fa fa-caret-left caret'" /></span>

        <!--
             判断是否有二级菜单，如果有则显示，反之则隐藏
        -->
        <div
          :class="'child ' + (key === pKey ? ' is-show' : 'is-hide')"
          v-if="nav.child && nav.child.length > 0"
        >
          <ul>
            <!--
                 循环二级菜单
                 判断是否有二级菜单，如果有则显示，反之则隐藏
                 如果一级菜单被点击，则显示二级菜单，反之则隐藏
            -->
            <li
              :class="index === cKey ? 'active' : ''"
              v-for="(child, index) in nav.child"
              @click.stop="clickChildBtn(child, index)"
            >
              <span><i :class="'fa ' + child.icon" />&nbsp;&nbsp;{{ child.name }}</span>
              <span><i :class="'fa ' + (index === cKey ? 'fa-caret-left caret' : '')" /></span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {

    /**
     *  组件名称
     */
    name: "Navigation"

    ,data() {
      return {
        pKey: 0           // 系统默认自动展开选中第一个一级菜单
        ,cKey: 0          // 系统默认自动选中第一个一级菜单下的第一个二级菜单
        ,menus:[{
          id: 11
          ,name: '主页'
          ,icon: 'fa-home'
          ,code: 'dashboard'
          ,path: '/dashboard'
          ,params: {}
        },{
          id: 121
          ,name: '系统管理'
          ,icon: 'fa-home'
          ,code: ''
          ,path: ''
          ,params: {}
          ,child: [
             {id: 1211 ,name: '地区管理', code:'areaManage',        icon: 'fa-globe',     path: '/components/views/system/manage/AreaManage', params: {}}
            ,{id: 1212 ,name: '菜单管理', code:'menuManage',        icon: 'fa-bars',      path: '/components/views/system/manage/MenuManage', params: {}}
            ,{id: 1213 ,name: '用户管理', code:'userManage',        icon: 'fa-user-o',    path: '/components/views/system/manage/UserManage', params: {}}
            ,{id: 1214 ,name: '角色管理', code:'roleManage',        icon: 'fa-user-md',   path: '/components/views/system/manage/RoleManage', params: {}}
            ,{id: 1215 ,name: '权限管理', code:'permissionManage',  icon: 'fa-home',      path: '/components/views/system/manage/PermissionManage', params: {}}
          ]
        },{
          id: 131
          ,name: '预警管理'
          ,icon: 'fa-home'
          ,code: ''
          ,path: ''
          ,params: {}
          ,child: [
            {id: 1311 ,name: '预警编辑', code:'warnManage', icon: 'fa-globe',    path: '/components/views/system/warn/WarnManage', params: {}}

          ]
        }]
      }
    }
    ,created(){

    }
    ,mounted(){

      // 初始化加载菜单
      this.getMenu();


    }
    ,methods: {

      getMenu(){


        // this.$post("/api/user/boot", {page:1, limit: 10,sortName:'name', sortType: 'DESC'}).then( response => {
        //   console.log(response)
        //
        // }).catch( error => {console.log(error);});


        const router = [{
          path: '/areaManage',
          name: 'areaManage',
          params:{},
          component: resolve => require(['@/components/views/system/manage/AreaManage.vue'], resolve)
        }, {
          path: '/menuManage',
          name: 'menuManage',
          params:{},
          component: resolve => require(['@/components/views/system/manage/MenuManage.vue'], resolve)
        }, {
          path: '/userManage',
          name: 'userManage',
          params:{},
          component: resolve => require(['@/components/views/system/manage/UserManage.vue'], resolve)
        }, {
          path: '/roleManage',
          name: 'roleManage',
          params:{},
          component: resolve => require(['@/components/views/system/manage/RoleManage.vue'], resolve)
        }, {
          path: '/permissionManage',
          name: 'permissionManage',
          params:{},
          component: resolve => require(['@/components/views/system/manage/PermissionManage.vue'], resolve)
        }, {
          path: '/warnManage',
          name: 'warnManage',
          params:{},
          component: resolve => require(['@/components/views/system/warn/WarnManage.vue'], resolve)
        }];

        this.$router.addRoutes(router);
      },

      /**
       * 左侧一级菜单点击事件
       * @Method controlBtn
       */
      clickParentBtn(menu, key){
        this.pKey = key;        // 点击一级菜单：改变当前点击菜单的下标
        this.cKey = 0;          // 默认展示第一个二级菜单

          if(menu.child && menu.child.length > 0){
            this.$router.push({name: menu.child[0].code,params:{name:'默认二级第一个菜单'}}); // 触发路由跳转
          }else {
            this.$router.push({name: menu.code,params:{name:'主页'}}); // 触发路由跳转
          }

      }

      /**
       * 左侧二级菜单点击事件
       * @Method controlBtn
       */
      ,clickChildBtn(menu, index){
        this.cKey = index;                    // 点击二级菜单：改变当前点击二级菜单的下标
        this.$router.push({name: menu.code,params:{name:'二级'}}); // 触发路由跳转
      }

    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/navigation";
</style>
