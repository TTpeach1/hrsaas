<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :isShowLeft="false">
        <template #right>
          <el-button type="primary" @click="showAddDialog('0', 1)"
            >添加权限</el-button
          >
        </template>
      </PageTools>
      <!-- 表格 -->
      <el-table
        :data="permission"
        slot="right"
        style="width: 100%"
        class="table-per"
        row-key="id"
        ref="table"
      >
        <el-table-column label="名称">
          <template slot-scope="{ row }">
            <i
              v-if="row.children"
              style="margin-right: 5px"
              class="el-icon-folder-opened"
              @click="expend(row)"
            ></i>
            <i
              v-if="row.type === 2"
              style="margin-right: 5px"
              class="el-icon-folder-opened"
            ></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识"> </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" @click="showAddDialog(row.id, 2)"
              >添加</el-button
            >
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 放置一个弹层 用来编辑新增节点 -->
    <el-dialog title="添加权限点" :visible.sync="showDialog">
      <!-- 表单 -->
      <el-form ref="form" :model="formData" :rules="rules" label-width="120px">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width: 90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width: 90%" />
        </el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="formData.enVisible"
            active-value="1"
            inactive-value="0"
          />
        </el-form-item>
      </el-form>
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" type="primary" @click="onSave"
            >确定</el-button
          >
          <el-button size="small" @click="onClose">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getPermissionListApi, addPermission } from '@/api/permission'
import { transListToTree } from '@/utils'
export default {
  data() {
    return {
      permission: [],
      showDialog: false,
      formData: {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [
          { required: true, message: '权限名称不能为空', trigger: 'blur' }
        ],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },

  created() {
    this.getPermissionList()
  },

  methods: {
    async getPermissionList() {
      const res = await getPermissionListApi()
      this.permission = transListToTree(res, '0')
    },
    expend(row) {
      row.isExpand = !row.isExpand
      this.$refs.table.toggleRowExpansion(row, row.isExpand)
    },
    showAddDialog(id, type) {
      this.showDialog = true
      this.formData.pid = id
      this.formData.type = type
    },
    async onSave() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        await addPermission(this.formData)
        this.$message.success('新增成功')
        this.onClose()
        this.getPermissionList()
      })
    },
    onClose() {
      this.showDialog = false
    }
  }
}
</script>

<style scoped lang="scss">
.table-per {
  margin-top: 20px;
}
::v-deep .el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
