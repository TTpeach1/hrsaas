<template>
  <div class="calendar">
    <el-row type="flex" justify="end">
      <el-col :span="5">
        <el-select @change="updateCalendar" v-model="currentYear">
          <el-option
            v-for="item in yearList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <el-select @change="updateCalendar" v-model="currentMonth">
          <el-option
            v-for="item in 12"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{ date }">
        <div class="cell-box">
          {{ date.getDate() }}
          <span class="week" v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      currentMonth: '',
      yearList: [], // 当前年份前后五年
      currentDate: ''
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.yearList = Array(11)
        .fill(this.currentYear - 5)
        .map((item, index) => item + index)
      this.currentDate = date
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    // 用于更新日历
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-calendar-table .el-calendar-day {
  padding: 0;
}
.cell-box {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: unset;
  .week {
    width: 20px;
    height: 20px;
    background-color: #fa7c4d;
    color: #fff;
    border-radius: 10px;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    margin-left: 10px;
  }
}
::v-deep .el-calendar {
  .el-calendar-table td {
    border: unset !important;
  }
  .el-calendar__header {
    display: none;
  }
}
</style>
