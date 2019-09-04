
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
        <span><i :class="'fa ' + nav.icon" />&nbsp;&nbsp;{{ nav.menuName }}</span>

        <!-- 设置一级菜单图标，判断如果菜单展开状态，箭头向上，反之向下 -->
        <span v-if="nav.children && nav.children.length > 0"><i :class="'fa ' + (key === pKey ? 'fa-angle-up' : 'fa-angle-down')" /></span>

        <!-- 设置一级菜单右侧选中‘缺口’图标 点击则有，反之没有 -->
        <span v-if="key === pKey && nav.children && nav.children.length == 0"><i :class="'fa fa-caret-left caret'" /></span>

        <!--
             判断是否有二级菜单，如果有则显示，反之则隐藏
        -->
        <div
          :class="'child ' + (key === pKey ? ' is-show' : 'is-hide')"
          v-if="nav.children && nav.children.length > 0"
        >
          <ul>
            <!--
                 循环二级菜单
                 判断是否有二级菜单，如果有则显示，反之则隐藏
                 如果一级菜单被点击，则显示二级菜单，反之则隐藏
            -->
            <li
              :class="index === cKey ? 'active' : ''"
              v-for="(child, index) in nav.children"
              @click.stop="clickChildBtn(child, index)"
            >
              <span><i :class="'fa ' + child.icon" />&nbsp;&nbsp;{{ child.menuName }}</span>
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
        ,menus:[]
      }
    }
    ,created(){
      // 初始化加载菜单
      this.initMenuAndRouters();
    }
    ,mounted(){



    }
    ,methods: {

      /**
       * 初始化菜单和路由
       *
       */
      initMenuAndRouters(){

        this.$get("/api/menu/list", {}).then( response => {
          let routers = [];
          this.menus = response.data;

          for(let menu of response.data) {
            if(menu.children && menu.children.length > 0) {
              for(let router of menu.children) {
                routers.push({
                  path: '/' + router.code,
                  name: router.code,
                  params: JSON.parse(router.params),
                  // component: (resolve) => require.ensure([], () => resolve (require('@/components' + router.path + '.vue')))
                  component: resolve => require(['@/components' + router.path + '.vue'], resolve)
                });
              }
            }
          }
          this.$router.addRoutes(routers);
        }).catch( error => {console.log(error);});
      },

      /**
       * 左侧一级菜单点击事件
       * @Method controlBtn
       */
      clickParentBtn(menu, key){
        this.pKey = key;        // 点击一级菜单：改变当前点击菜单的下标
        this.cKey = 0;          // 默认展示第一个二级菜单

        if(menu.children && menu.children.length > 0){
          this.$router.push({name: menu.children[0].code, query: JSON.parse(menu.params)}); // 触发路由跳转
        }else {
          this.$router.push({name: menu.children, query: JSON.parse(menu.params)});         // 触发路由跳转
        }

      }

      /**
       * 左侧二级菜单点击事件
       * @Method controlBtn
       */
      ,clickChildBtn(menu, index){
        this.cKey = index;                                                    // 点击二级菜单：改变当前点击二级菜单的下标
        this.$router.push({name: menu.code,query: JSON.parse(menu.params)});  // 触发路由跳转
      }

    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/navigation";
</style>
