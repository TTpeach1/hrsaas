<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('import')"
            v-isHas="point.employees.import"
          
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="exportEmployees"
            >导出</el-button
          >
          <el-button
            size="small"
            type="primary"
            @click="showAddEmployees = true"
            v-if="isHas('point.employees.add')"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="员工">
            <template slot-scope="{ row }">
              <img
                v-imgError="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                style="
                  border-radius: 50%;
                  width: 100px;
                  height: 100px;
                  padding: 10px;
                "
                @click="showErCodeDialog(row.staffPhoto)"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            prop="formOfEmployment"
            :formatter="formatFormEmployment"
          />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry" />
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button
                type="text"
                size="small"
                @click="$router.push('/employees/detail/' + row.id)"
                >查看</el-button
              >
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="assigRole(row.id)"
                >角色</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="deleteEmployee(row.id)"
                v-if="isHas('point.employees.del')"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
    </div>
    <AddEmployees :visible.sync="showAddEmployees"></AddEmployees>
    <el-dialog title="二维码" :visible.sync="ercodeDialog">
      <el-row type="flex" justify="center">
        <canvas id="canvas" />
      </el-row>
    </el-dialog>
    <assign-role
      :visible.sync="showAssigRole"
      :employeesId="employeesId"
    ></assign-role>
  </div>
</template>

<script>
import { getEmployessInfoApi, delEmployeeApi } from '@/api/employees'
import AddEmployees from './components/add-employees.vue'
import AssignRole from './components/assign-role.vue'
import employees from '@/constant/employees'
import QRcode from 'qrcode'
import MixinPermission from '@/mixins/permission'
const { exportExcelMapPath, hireType } = employees
export default {
  mixins: [MixinPermission],
  data() {
    return {
      employees: [],
      page: {
        page: 1,
        size: 10
      },
      showAddEmployees: false,
      ercodeDialog: false,
      showAssigRole: false,
      employeesId: ''
    }
  },
  components: { AddEmployees, AssignRole },
  created() {
    this.getEmployessInfo()
  },

  methods: {
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployessInfo()
    },
    async getEmployessInfo() {
      const { rows, total } = await getEmployessInfoApi(this.page)
      this.employees = rows
      this.page.total = total
      console.log(this.employees)
    },
    formatFormEmployment(row, column, cellValue, index) {
      // if(cellValue === 1) return '正式'
      // if(cellValue === 2) return '非正式'
      // return '未知'
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('您确定删除该员工吗')
        await delEmployeeApi(id)
        this.getEmployeeList()
        this.$message.success('删除员工成功')
      } catch (error) {
        console.log(error)
      }
    },
    // daoru(){
    //   this.$router.push("import")
    // }
    // 导出excel数据
    async exportEmployees() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployessInfoApi({
        page: 1,
        size: this.total
      })
      const header = Object.keys(exportExcelMapPath) //返回数组
      const data = rows.map((item) => {
        return header.map((h) => {
          if (h === '聘用形式') {
            const findItem = hireType.find((hire) => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value : '未知'
          } else {
            return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header: header, //表头 必填
        data: data, //具体数据 必填
        filename: 'employeesExcel', //非必填文件名
        autoWidth: true, //非必填
        bookType: 'xlsx' //非必填
      })
    },
    showErCodeDialog(staffPhoto) {
      if (!staffPhoto) return this.$message.error('该用户还未设置')
      this.ercodeDialog = true
      this.$nextTick(() => {
        const canvas = document.getElementById('canvas')
        QRcode.toCanvas(canvas, staffPhoto)
      })
    },
    assigRole(id) {
      this.showAssigRole = true
      this.employeesId = id
    }
  }
}
</script>

<style scoped lang="less"></style>
