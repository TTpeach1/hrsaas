<template>
  <div>
    <i @click="$router.push(`/employees/print/${userId}?type=job`)" class="el-icon-printer"></i>
    <!-- <i @click="$router.push('/employees/print?type=job')" class="el-icon-printer"></i> -->
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  created() {},

  methods: {},

  computed: {}
}
</script>

<style lang="less" scoped></style>
