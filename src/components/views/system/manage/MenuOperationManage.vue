
<template>

    <div class="hatech-panel">
      <div class="hatech-row">

        <div class="hatech-item hatech-cell-3" style="background-color: #f9f9f9">
          <div class="hatech-item-header">
            <div class="hatech-item-header-title">
              <span class="title-menu"><i class="hatech-icon hatech-yanzheng-1"></i>菜单信息</span>
            </div>

            <div class="hatech-item-header-option">
              <span><i class="el-icon-plus"></i></span>
              <span><i class="el-icon-edit"></i></span>
              <span><i class="el-icon-delete"></i></span>
            </div>
          </div>
          <div class="hatech-item-body" >
            <el-input placeholder="输入菜单名称" v-model="searchMenu" :style="{marginTop:'-1px'}"></el-input>
            <div :style="{height:'calc(100% - 40px)', overflow: 'auto', overflowX: 'hidden'}">
              <el-tree class="filter-tree"
                       :data="menu.data"
                       :props="defaultProps"
                       default-expand-all
                       :filter-node-method="findNode"
                       ref="menuTree"
                       :style="{background:'#f9f9f9'}"
                       @node-click="getCheckedNode"
              ></el-tree>
            </div>
          </div>

        </div>

        <div class="hatech-item hatech-cell-6" style="background-color: #f9f9f9">

          <div class="hatech-item-header">
            <div class="hatech-item-header-title">
              <span class="title-menu"><i class="hatech-icon hatech-yanzheng-1"></i>操作信息</span>
            </div>

            <div class="hatech-item-header-option">
              <span><i class="el-icon-plus"></i></span>
              <span><i class="el-icon-edit"></i></span>
              <span><i class="el-icon-delete"></i></span>
            </div>
          </div>
          <div class="hatech-item-body" >
            <div :style="{height:'100%', overflow: 'auto', overflowX: 'hidden', textAlign: 'center'}">
              <el-checkbox
                border
                :key="key"
                :disabled="operation.disabled"
                v-for="(operate, key) in operation.data"
                :style="{margin: '10px'}"
                :checked="operate.checked"
                @change="changeOperation(operate)"
              >{{operate.operationName}}</el-checkbox>
            </div>
          </div>

        </div>

        <div class="hatech-item hatech-cell-3" style="background-color: #f9f9f9">

          <div class="hatech-item-header">
            <div class="hatech-item-header-title">
              <span class="title-menu"><i class="hatech-icon hatech-yanzheng-1"></i>菜单操作信息</span>
            </div>

            <div class="hatech-item-header-option">
              <span><i class="el-icon-plus"></i></span>
              <span><i class="el-icon-edit"></i></span>
              <span><i class="el-icon-delete"></i></span>
            </div>
          </div>
          <div class="hatech-item-body">
            <div :style="{height:'100%', overflow: 'auto', overflowX: 'hidden'}">
              <el-tree class="filter-tree"
                       :data="menuOperation.data"
                       :props="defaultProps"
                       default-expand-all
                       :filter-node-method="findNode"
                       ref="menuOperationTree"
                       :style="{background:'#f9f9f9'}"
              ></el-tree>
            </div>
          </div>

        </div>

      </div>
    </div>

</template>

<script>

  import * as TreeUtil from '../../../../utils/TreeUtil.js';

    export default {
      name: "MenuOperationManage",
      components: {},
      data() {
          return {
            searchMenu: '', // 左侧下拉树检索文字

            defaultProps: { // 树的字段映射
              children: 'children',
              label: 'label'
            },

            menu: {         // 菜单数据处理
              data: [],
              selectMenu: null
            },

            operation: {    // 操作数据处理
              disabled: false,
              data: null
            },

            menuOperation: {  // 菜单操作数据处理
              dataTemp: null, // 临时数据对象（包括菜单和按钮，并简历菜单按钮关联关系）
              data: null      // 菜单操作数据对象，用于右侧数据展示
            }
          }
      },
      mounted() {

        // 加载菜单信息
        this.initMenuInfo();

        // 加载操作信息
        this.initOperationInfo();

      },
      methods: {

        /**
         * 初始化操作信息
         * @Method add
         */
        initMenuInfo(){
          this.$get("/api/operation/all", {}).then(response => {
            for(let data of response.data) {
              data.checked = false;
            }
            this.operation.data = response.data;
          }).catch(function (error) {
          });
        },

        /**
         * 初始化菜单信息
         * @Method add
         */
        initOperationInfo(){
          this.$get("/api/menu/tree", {}).then(response => {
            // 设置菜单数据
            this.menu.data = response.data;
            // 设置右侧菜单操作中的菜单数据
            this.menuOperation.data = response.data ;

            //将菜单信息也作为一个操作项，组装成一级对象
            let data = [];
            for(let mo of this.menuOperation.data) {
              data.push({ id: mo.id, label: mo.label, parentId: mo.parentId, checked: mo.checked });
              if(mo.children && mo.children.length > 0) {
                for(let moc of mo.children) {
                  data.push({ id: moc.id, label: moc.label, parentId: moc.parentId, checked: moc.checked });
                }
              }
            }
            this.menuOperation.dataTemp = data;
          }).catch(function (error) {
          });
        },

        /**
         * 模糊搜索节点树数据
         * @Method onTableSearch
         */
        findNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        },


        /**
         * 菜单树操作
         * 点击节点，获取当前选中节点
         * @param node      传递给 data 属性的数组中该节点所对应的对象
         * @param checked   节点对应的 Node
         * @param current   节点组件本身
         */
        getCheckedNode(node,children, current) {
          if(node.children && node.children.length > 0){
            this.operation.disabled = true;
          }else {
            this.operation.disabled = false;
          }
          this.menu.selectMenu = node;
        },

        changeOperation(checked) {

          // 判断是否有选中菜单
          if(this.menu.selectMenu === null){
            this.$message({message: '请选中菜单在进行配置操作' ,center: true ,type: 'info'});
            return false;
          }
          // 获取选中菜单信息
          let checkMenuId = this.menu.selectMenu.id;
          // 如果没有选中操作按钮，则进行增加，反之删除
          if(checked.checked === false){
            // 建立菜单与操作之间的父子关系
            this.menuOperation.dataTemp.push({
              id: 'button-' + checkMenuId + '-' + checked.id,
              label: checked.operationName,
              parentId: checkMenuId,
              checked: true
            });
          }else {
            for(let i = 0; i<this.menuOperation.dataTemp.length; i++){
              if(this.menuOperation.dataTemp[i].id === 'button-' + checkMenuId + '-' + checked.id){
                this.menuOperation.dataTemp.splice(i, 1);
              }
            }
          }

          // 将数据转化成树状结构(数据深拷贝)
          let tree = TreeUtil.getTree(-1, JSON.parse(JSON.stringify(this.menuOperation.dataTemp)));
          // 更新菜单操作数据
          this.menuOperation.data = tree;

          // 更改选中操作的是否选中状态
          for(let ch of this.operation.data) {
            if(ch.id === checked.id){
              ch.checked = !ch.checked;
            }
          }

        }




      },
      watch: {
        searchMenu(val) {
          this.$refs.menuTree.filter(val);
        }
      }
    }
</script>

<style scoped lang="scss">

</style>
