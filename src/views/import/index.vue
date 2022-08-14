<template>
  <div class="dashboard-container">
    <div class="app-container">
      <upload-excel
        :beforeUpload="excelSuccess"
        :onSuccess="onSuccess"
      ></upload-excel>
    </div>
  </div>
</template>

<script>
import { importEmployeesApi } from '@/api/employees'
import employees from '@/constant/employees'
import { formatTime } from '@/filters'
const { importMapKeyPath } = employees
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      // console.log(header);
      // console.log(results);
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importMapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            //时间戳
            const timestamp = item[key]
            //转换
            const date = new Date((timestamp - 1) * 24 * 3600000)
            date.setFullYear(date.getFullYear() - 70)

            obj[importMapKeyPath[key]] = formatTime(date)
          } else {
            obj[importMapKeyPath[key]] = item[key]
          }
        }
        return obj
      })
      // console.log(newArr)
      await importEmployeesApi(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1) // 回到上一页
    }
  },

  computed: {}
}
</script>

<style lang="less" scoped></style>
