<template>
  <el-dialog title="新增员工" :visible="visible" >
    <!-- 表单 -->
    <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择日期" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
            <el-option  v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="getDepartments" /> -->
        <!-- 放置一个tree组件 -->
        <!-- <el-tree
          v-if="showTree"
          v-loading="loading"
          :data="treeData"
          default-expand-all=""
          :props="{ label: 'name' }"
          @node-click="selectNode"
        /> -->
         <el-select
            v-model="formData.departmentName"
            placeholder="请选择"
            @focus="getDepartments"
            ref="deptSelect"
            >
            <el-option value="" class='treeOption'>
                <el-tree  @node-click="selectNode" :data="treeData" :props="{ label: 'name' }"></el-tree>
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择日期" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="onClose">取消</el-button>
          <el-button type="primary" size="small" @click="onSave">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>
</template>

<script>
import employees from '@/constant/employees'
import {getDepartmentsApi} from '@/api/departments'
import {transListToTree} from '@/utils'
import {addEmployeeApi} from '@/api/employees'
const {hireType} = employees
export default {
  data() {
    return {
        hireType,
        formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'change' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      treeData: [], // 定义数组接收树形数据
       showTree: false, // 控制树形的显示或者隐藏

    }
  },
  props:{
    visible:{
        type:Boolean,
        // required:true,
        default: false
    }
  },
  created() {},

  methods: {
    onClose(){
        this.$emit('update:visible',false)
        this.$refs.form.resetFields()
    },
    selectNode(node) {
      this.formData.departmentName = node.name
    //   this.showTree = false
    this.$refs.deptSelect.blur()
    },
    async getDepartments() {
    //   this.showTree = true
    //   this.loading = true
      const { depts } = await getDepartmentsApi()
      // depts是数组 但不是树形
      transListToTree(depts, '')
      this.treeData = depts
      console.log(this.treeData);
    //   this.loading = false
    },
    onSave(){
        this.$refs.form.validate(async(valid)=>{
            if(!valid)return 
            // console.log('发送请求');
            await addEmployeeApi(this.formData)
            this.$message.success('添加成功')
            this.onClose()
            this.$emit('add-success')
        })
    }
  },

  computed: {}
}
</script>

<style lang="less" scoped>
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover .el-select-dropdown__item{
 background-color: #fff;
 overflow: unset;
}

.treeOption{
    height: 100px;
}

</style>
