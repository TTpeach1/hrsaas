<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <div class="text item">
          <TreeTools :treeNode="company" :isRoot="true"></TreeTools>
          <el-tree :data="treeData" :props="defaultProps" default-expand-all>
            <!-- <TreeTools :treeNode="{name:'总裁办',manager:'总裁'}"></TreeTools> -->
            <template v-slot="{ data }">
              <TreeTools :treeNode="data"> </TreeTools>
            </template>
          </el-tree>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils/index'
export default {
  data() {
    return {
      //修改默认属性名称
      defaultProps: {
        label: 'name'
      },
      treeData: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' }
      ],
      company: { name: '传智教育', manager: '负责人' }
    }
  },
  components: {
    TreeTools
  },

  created() {
    this.loadDepts()
  },

  methods: {
    async loadDepts() {
      const res = await getDeptsApi()
      console.log(res)
      // this.treeData = res.depts
      this.treeData = transListToTree(res.depts, '')
      console.log(this.treeData)
    }
  }
}
</script>

<style scoped lang="less"></style>
