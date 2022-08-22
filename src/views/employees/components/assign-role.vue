<template>
  <div>
    <el-dialog
      title="分配角色"
      :visible="visible"
      @open="onOpen"
      @close="close"
    >
      <el-checkbox-group v-model="checkList">
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="assignRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getUserDetailApi } from '@/api/user'
import {assignRolesApi} from '@/api/employees'
export default {
  name: 'Assign',
  data() {
    return {
      checkList: [],
      roles: []
    }
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    employeesId: {
      type: String,
      required: true
    }
  },
  created() {},

  methods: {
    close() {
      this.$emit('update:visible', false)
    },
    //获取角色列表
    async getRolesList() {
      const { rows } = await getRolesApi()
      this.roles = rows
      console.log(rows, '角色列表')
    },
    onOpen() {
      this.getRolesList()
      this.getUserDetail()
    },
    async getUserDetail() {
      const  {roleIds}  = await getUserDetailApi(this.employeesId)
      console.log(roleIds,this.employeesId,'员工角色权限');
      this.checkList = roleIds
    },
    async assignRole(){
      if(!this.checkList.length)return this.$message.error('请选择角色')
      await assignRolesApi({
        id: this.employeesId,
        roleIds: this.checkList
      })
      this.$message.success('匹配成功')
      this.close()
    }
  },

  computed: {}
}
</script>

<style lang="less" scoped></style>
