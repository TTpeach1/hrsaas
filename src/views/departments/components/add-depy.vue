<template>
  <el-dialog title="添加部门" :visible="visible" width="50%">
    <el-form
      ref="form"
      :model="formData"
      :rules="formRules"
      label-width="100px"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model="formData.name"
          placeholder="请输入部门名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="部门编码" prop="code">
        <el-input
          v-model="formData.code"
          placeholder="请输入部门编码"
        ></el-input>
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          placeholder="请选择部门负责人"
          style="width: 100%"
        >
          <el-option
            v-for="item in this.employess"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          v-model="formData.introduce"
          placeholder="请输入部门介绍"
        ></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button @click="onSave" type="primary">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApi, addDeptsApi } from '@/api/departments'
import { getEmployessApi } from '@/api/employees'
export default {
  data() {
    const checkName = (rule, value, callback) => {
      if (!this.currentNode.children) {
        return callback()
      }
      const isRepeat = this.currentNode.children.some(
        (item) => item.name === value
      )
      isRepeat ? callback(new Error('部门重复')) : callback()
    }
    const checkCode = async (rule, value, callback) => {
      const { depts } = await getDeptsApi()
      const isRepeatCode = depts.some((item) => item.code === value)
      isRepeatCode ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      employess: '',
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      formRules: {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入部门编号', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '请输入部门负责人', trigger: 'change' }
        ],
        introduce: [
          { required: true, message: '请输入部门介绍', trigger: 'blur' }
        ]
      }
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    currentNode: {
      type: Object,
      required: true
    }
  },
  created() {
    this.getEmployess()
  },

  methods: {
    async getEmployess() {
      const res = await getEmployessApi()
      this.employess = res
      console.log(res, '员工列表')
    },
    onClose() {
      this.$emit('update:visible', false)
    },
    async onSave() {
      await this.$refs.form.validate()
      this.formData.pid = this.currentNode.id
      console.log('表单校验通过！')
      await addDeptsApi(this.formData)
      console.log('新增成功')
      this.onClose()
    }
  },

  computed: {}
}
</script>

<style lang="less" scoped></style>
