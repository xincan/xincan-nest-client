
<!--
    表格插件调用实例
-->

<template>

  <div class="hatech-panel">

    <!--
        同创数据表格调用实列
        ref="hatechTable"           定义ref属性值，用于父组件调用子组件对象、函数、属性等
        :table="table"              定义table属性，用于父组件传值到子组件，子组件用props{table:Object}接收
        :form="form"                定义form属性， 用于父组件传值到子组件，子组件用props{form:Object}接收
        @row-click="tableRowClick"  定义row-click事件，用于表格单击行数据操作
        @init-table="initTable"     定义init-table事件，用户表格初始化数据操作
    -->
    <HatechTable
      ref="hatechTable"
      :hatechTable="this"
      :table="table"
      :form="form"
    >
      <!--
          按条件查询模块
          slot="hatech-search"   slot:表示table组件中的插槽 hatech-search：表示插槽名称，又称为具名插槽：必写项
      -->
      <div slot="hatech-search" class="hatech-search">
        <el-form :inline="true" :model="table.search" class="demo-form-inline">
          <el-form-item><el-input v-model="table.search.loginName" placeholder="请输入登录名称"></el-input></el-form-item>
          <el-form-item><el-input v-model="table.search.name" placeholder="请输入用户名称"></el-input></el-form-item>
          <el-form-item>
            <el-select v-model="table.search.sex" placeholder="请选择性别">
              <el-option label="请选择性别" value=""></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item><el-input v-model="table.search.areaId" placeholder="请出入用户所在地区"></el-input></el-form-item>
          <el-form-item><el-input v-model="table.search.organizationId" placeholder="请输入用户所属机构"></el-input></el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="onTableSearch" icon="el-icon-search">查询</el-button>
            <el-button type="warning" size="small" @click="onTableReset" icon="el-icon-delete">清空</el-button>
          </el-form-item>
        </el-form>
      </div>

    </HatechTable>

    <!-- 自定义弹出层 -->
    <HatechDialog
      :form="form"
      :hatechDialog="this"
    >
      <!--表格弹出层-->
      <div slot="hatech-dialog-from">
        <!--
            表单设置
            status-icon               设置表单校验时：是否在输入框中显示校验结果反馈图标
            :ref="form.name"          设置表单名称
            :model="form.data"        设置表单数据并绑定数据
            :rules="form.rules"       设置表单验证规则
        -->
        <el-form
          status-icon
          :ref="form.name"
          :model="form.data"
          :rules="form.rules"
        >
          <el-form-item label="菜单名称" prop="menuName" :label-width="form.formLabelWidth" >
            <el-input v-model="form.data.menuName" autocomplete="off" placeholder="请输入菜单名称" :disabled="form.disabled" :style="{width: form.formInputWidth}"></el-input>
          </el-form-item>
          <el-form-item label="菜单级别" prop="level" :label-width="form.formLabelWidth">
            <el-select v-model="form.data.level" clearable placeholder="请选择菜单级别" :style="{width: form.formInputWidth}">
              <el-option label="一级菜单" :value="1"></el-option>
              <el-option label="二级菜单" :value="2"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="上级菜单" prop="parentId" :label-width="form.formLabelWidth" v-if="form.data.level === 1 ? false:true" :style="{lineHeight: '20px'}">
            <treeselect
              v-model="form.data.parentId"
              :multiple="false"
              :options="form.parentMenu.options"
              :default-expand-level="1"
              :style="{lineHeight:'20px',marginRight:'30px'}"
              placeholder="请选择上级菜单"
              @input="changeMenu"
              @close="changeMenu"
            />
          </el-form-item>


          <el-form-item label="菜单图标" prop="icon" :label-width="form.formLabelWidth">
            <el-input v-model="form.data.icon" autocomplete="off" placeholder="请输入菜单图标（fa-home）" :disabled="form.disabled" :style="{width: form.formInputWidth}"></el-input>
          </el-form-item>
          <el-form-item label="菜单路径" prop="path" :label-width="form.formLabelWidth">
            <el-input v-model="form.data.path" autocomplete="off" placeholder="请输入菜单路径" :disabled="form.disabled" :style="{width: form.formInputWidth}"></el-input>
          </el-form-item>
          <el-form-item label="菜单参数" prop="params" :label-width="form.formLabelWidth">
            <el-input v-model="form.data.params" autocomplete="off" placeholder="请输入菜单参数" :disabled="form.disabled" :style="{width: form.formInputWidth}"></el-input>
          </el-form-item>

          <el-form-item label="菜单排序" prop="sequence" :label-width="form.formLabelWidth">
            <el-input v-model="form.data.sequence" autocomplete="off" placeholder="请输入菜单序号" :disabled="form.disabled" :style="{width: form.formInputWidth}"></el-input>
          </el-form-item>

        </el-form>
      </div>
    </HatechDialog>
  </div>
</template>

<script>

  import Treeselect from '@riophae/vue-treeselect';
  import '@riophae/vue-treeselect/dist/vue-treeselect.css';

  // 引用同创表格插件
  import HatechTable from '@/components/table/Hatech-Table';

  // 引用同创弹出层插件
  import HatechDialog from '@/components/dialog/Hatech-Dialog';

  export default {
    components:{ Treeselect, HatechTable, HatechDialog }
    ,data() {

      /**
       * 统一form表单验证入口
       * @Method validateForm
       */
      let validateForm = {

      };
      return {
        // 表格信息设置
        table:{
          title:'菜单信息'                         // 表格名称
          ,id:'admin-menu-table'        // 表格ID，系统中表格唯一
          ,autoInit: true                         // 自动加载：true,手动加载false
          ,url:'/api/menu'                        // 数据访问路径
          ,tableWidth:'100%'                      // 表格宽度设定
          ,showCellUrl:'/api/table/find'          // 显隐列读取用户习惯
          ,dropCellUrl:'/api/table/save'          // 拖拽列保存入库路径，记录用户习惯
          ,page:1                                 // 分页，当前页
          ,size:10                                // 分页，每页默认显示10条数据
          ,sort:{
            custom: true                          // 开启远程分页
            ,sortName:"createTime"                // 分页排序字段名称
            ,sortType:"DESC"                      // 分页排序方式DESC,ASC
          }
          ,pageSize: [10, 20, 50, 100]             // 分页，设置默认页数
          ,isIndexShow: true                       // 表格编号列显示隐藏设置
          ,data: []                                // 表格数据渲染
          ,select: []                              // 数据多选
          ,count: 0                                // 当前表格数据总数
          ,search:{                                // 查询条件
          }
          ,column: [                               // 表格头部信息、列的显隐设置
            {label:'菜单名称',   prop: 'menuName',   width:'auto', isHide: true}
            ,{label:'菜单图标',  prop: 'icon',       width:'auto', isHide: true}
            ,{label:'菜单路径',  prop: 'path',       width:'auto', isHide: true}
            ,{label:'菜单参数',  prop: 'params',     width:'auto', isHide: true}
            ,{label:'菜单级别',  prop: 'level',      width:'auto', isHide: true}
            ,{label:'菜单排序',  prop: 'sequence',   width:'auto', isHide: true}
            ,{label:'创建时间',  prop: 'createTime', width:'auto', isHide: true}
          ]
          ,showHeaderOption: true                 // 是否显示头部右侧操作按钮
          ,headerOption:[                         // 表格头部操作按钮集合
            {name:'增加',        icon:'el-icon-edit',       fun:'add',        isShow: true}
            ,{name:'上传',        icon:'el-icon-upload2',    fun:'upload',     isShow: false}
            ,{name:'下载',        icon:'el-icon-download',   fun:'download',   isShow: false}
            ,{name:'批量删除',    icon:'el-icon-delete',      fun:'delete',    isShow: true}
          ]
          ,showTableOption: true                  // 是否显示列表右侧操作按钮
          ,cellOptionWidth: '200px'               // 表格右侧列操作按钮集合宽度
          ,cellOption:[                           // 表格右侧列操作按钮集合
             {name:'修改',        icon:'el-icon-edit',              fun:'edit',    isShow: true}
            ,{name:'查看',        icon:'el-icon-document',          fun:'detail',  isShow: true}
            ,{name:'删除',        icon:'el-icon-delete',            fun:'delete',  isShow: true}
          ]
        }
        // 表单信息设置
        ,form: {
          name:'form'                             // 表单名称
          ,title: ''                              // 表单标题
          ,formWidth: '40%'                       // 表单宽度
          ,dialogFormVisible: false               // 表单是否隐藏
          ,formLabelWidth: '100px'                // 表单元素标题宽度
          ,formInputWidth: 'calc(100% - 30px)'    // 表单输入框等宽度
          ,disabled: false                        // 表单元素是否禁用
          ,rules:{                                // 表单各项元素校验
            menuName: [
              { required: true, message: '请输入菜单名称', trigger: 'blur' },
              { min: 2, max: 8, message: '长度在2到8个字符', trigger: 'blur' }
            ]
            ,parentId: [
              { required: true, message: '请输请选择上级菜单', trigger: 'input' }
            ]
            ,icon: [
              { required: true, message: '请输入菜单图标（fa-home）', trigger: 'blur' }
            ]
            ,path: [
              { required: true, message: '请输入菜单路径', trigger: 'blur' }
            ]
            ,level: [
              { required: true, message: '请选择菜单级别', trigger: 'blur' }
            ]
            ,sequence: [
              { required: true, message: '请输入菜单排序', trigger: 'blur' }
            ]
          },
          parentMenu: {
            options: []
          }
          ,data: {                                // 表单数据数据
            menuName: ''
            ,parentId: ''
            ,icon: ''
            ,path: ''
            ,params:''
            ,level: 1
            ,sequence: ''
          }
          ,formOption:[                           // 表格右侧列操作按钮集合
            {name:'提交',        fun:'formSubmit',  type:'success', size:'mini', isShow: true}
            ,{name:'重置',        fun:'formReset',   type:'warning', size:'mini', isShow: true}
          ]
        }
      }
    }
    ,mounted() {

      this.initSelectTreeMenu();
    }

    ,methods: {

      /**
       * 初始化表单下拉菜单数据
       * @Method add
       */
      initSelectTreeMenu(){
        let then = this;
        this.$get("/api/menu/tree", {}).then(response => {
          this.form.parentMenu.options = response.data;
          then.$message({message: response.msg ,center: true ,type: 'success'});
        }).catch(function (error) {
          then.$message({message: "数据操作失败" ,center: true ,type: 'success'});
        });
      }


      /**
       * 头部表单：根据自定义条件查询表格数据操作
       * 触发表单查询按钮，通过表单数据查询表格
       * @Method onTableSearch
       */
      ,onTableSearch(){
        console.log("父组件调用子组件函数");
        this.$refs.hatechTable._initTable();
      }

      /**
       * 头部表单操作
       * 触发表单清空按钮，还原表单数据
       * @Method onTableReset
       */
      ,onTableReset(){
        this.table.search={};
      }

      ,changeMenu(val){
        let then = this;
        this.$nextTick(()=>{
          then.$refs[then.form.name].validateField('parentId');
        });
      }

      /**
       * 表格操作按钮集合
       * 对应headerOption数组对象中type值
       * @Method add
       */
      ,add(){
        this.form.title='新增菜单信息';
        this.form.data = { menuName: '', parentId: null, icon: '', path: '', params:'', level: 1, sequence: '' };
        this.form.disabled = false;
        this.form.isBtnShow = true;
        this.form.dialogFormVisible=true;
      }

      /**
       * 表格操作按钮集合
       * 对应headerOption数组对象中type值
       * @Method edit
       */
      ,edit(result) {
        this.form.title='修改菜单信息';
        this.form.data = result.row;
        this.form.disabled = false;
        this.form.isBtnShow = true;
        this.form.dialogFormVisible=true;
      }

      ,detail(result){
        this.form.title='查看菜单信息';
        this.form.data = result.row;
        this.form.disabled = true;
        this.form.isBtnShow = false;
        this.form.dialogFormVisible=true;
      }

      /**
       * 表格操作按钮集合
       * 对应headerOption数组对象中type值
       * 单个删除、批量删除公用函数
       * @Method delete
       */
      ,delete(result){

        let that = this ,select = result.select ,id = "";

        if(select.length  == 0){
          that.$message({message: "请选择要删除的数据",center: true ,type: 'info'});
          return false;
        }
        that.$confirm('确定要删除吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          select.forEach(item => { id += "," + item.id; });
          this.$post("/api/menu/delete", {
            id:id.substr(1)
          }).then(function (response) {
            that.$message({message: response.msg ,center: true ,type: 'success'});
            that.$nextTick(()=>{ that.$refs.hatechTable._initTable(); });
          }).catch(function (error) {console.log(error)});
        }).catch(() => {});
        this.table.select = [];
      }

      /**
       * 弹出层操作
       * 表单数据提交（添加、修改公用提交，后台以数据id做判断区分）
       * @Method formSubmit
       */
      ,formSubmit(result) {
        let that = this;
        this.$refs[this.form.name].validate(valid => {

          // 如果所有验证不通过则直接拦截，不向下执行
          if (!valid) return false;

          that.$confirm('确定要'+(this.form.data.id ? '修改' : '增加')+'吗?', '温馨提示', {
            confirmButtonText: '确定'
            ,cancelButtonText: '取消'
            ,type: 'info'
          }).then(() => {
            // 关闭弹出层
            that.form.dialogFormVisible = false;

            if(result.id === undefined){

              // 调用父类函数传参
              this.$put("/api/menu", result.row).then(response => {
                console.log(result);
                that.$message({message: response.msg ,center: true ,type: 'success', customClass: 'aaa'});
                that.$nextTick(()=>{ that.$refs.hatechTable._initTable(); });
              }).catch(function (error) {
                that.$message({message: "数据操作失败" ,center: true ,type: 'success'});
              });
            } else {
              // 调用父类函数传参
              this.$patch("/api/menu", result.row).then(response => {
                console.log(result);
                that.$message({message: response.msg ,center: true ,type: 'success'});
                that.$nextTick(()=>{ that.$refs.hatechTable._initTable(); });
              }).catch(function (error) {
                that.$message({message: "数据操作失败" ,center: true ,type: 'success'});
              });
            }

          }).catch((e) => {console.log(e)});
        });

      }

      /**
       * 弹出层操作
       * 表单重置数据信息，重置表单弹出时原始数据
       * @Method formSubmit
       */
      ,formReset(){
        this.$refs[this.form.name].resetFields();
      }

    }
  }
</script>


<style scoped lang="scss">

</style>
