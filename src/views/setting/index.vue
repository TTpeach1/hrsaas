<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button
            type="primary"
            @click="addDialogVisible = true"
            v-if="isHas(point.roles.add)"
            >新建</el-button
          >
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色名称"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button size="small" type="success" @click="setRight(row.id)"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :page-size="pagesize"
            :page-sizes="[3, 5, 7, 10]"
            layout="sizes,prev, pager, next"
            :total="total"
            @current-change="currentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input v-model="companyInfo.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input
                v-model="companyInfo.companyAddress"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input v-model="companyInfo.mailbox" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="companyInfo.remarks" disabled></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      @close="dialogClose"
      title="新增角色"
      :visible.sync="addDialogVisible"
      width="50%"
    >
      <el-form
        :model="addRoleForm"
        :rules="addRoleFormRoles"
        ref="form"
        label-width="80px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setRightDialog"
      width="50%"
      destory-on-close
      @close="setRightsClose"
    >
      <el-tree
        default-expand-all
        show-checkbox
        node-key="id"
        :data="permissions"
        :default-checked-keys="defaultCheckKeys"
        :props="{ label: 'name' }"
        ref="perTree"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSaveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi, getRolesInfo, assignPerm } from '@/api/role'
import { getCompanyInfoApi } from '@/api/company'
import { getPermissionListApi } from '@/api/permission'
import { transListToTree } from '@/utils'
// import permissionPoint from '@/constant/permission'
import mixinsPermission from '@/mixins/permission'
export default {
  mixins: [mixinsPermission],
  data() {
    return {
      activeName: 'first',
      tableData: [],
      total: 0,
      pagesize: 3,
      page: 1,
      addDialogVisible: false,
      addRoleForm: {
        name: '',
        description: ''
      },
      addRoleFormRoles: {
        name: [{ required: true, message: '请填写角色名称', trigger: 'blur' }]
      },
      companyInfo: {},
      setRightDialog: false,
      permissions: [],
      defaultCheckKeys: ['1', '1063315016368918528'],
      roleId: ''
      // point: permissionPoint
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
    this.getPermissionList()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pagesize
      })
      this.tableData = rows
      this.total = total
    },
    currentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getRoles()
    },
    onClose() {
      this.addDialogVisible = false
    },
    async addRoles() {
      await this.$refs.form.validate()
      await addRolesApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.addDialogVisible = false
      this.getRoles()
    },
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.description = ''
    },
    //获取公司信息
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      )
      this.companyInfo = res
      console.log(res, '公司信息')
    },
    //分配权限按钮
    async setRight(id) {
      this.roleId = id
      this.setRightDialog = true
      const res = await getRolesInfo(id)
      this.defaultCheckKeys = res.permIds
    },
    //获取权限
    async getPermissionList() {
      const res = await getPermissionListApi()
      console.log(res, 123123)
      const treePermission = transListToTree(res, '0')
      this.permissions = treePermission
    },
    //监听对话框关闭
    setRightsClose() {
      this.defaultCheckKeys = []
    },
    //修改权限
    async onSaveRights() {
      await assignPerm({
        id: this.roleId,
        permIds: this.$refs.perTree.getCheckedKeys()
      })
      this.setRightDialog = flase
    }
    // isHas(point) {
    //   return this.$store.state.permission.points.includes(point)
    // }
  }
}
</script>

<style scoped lang="less"></style>
