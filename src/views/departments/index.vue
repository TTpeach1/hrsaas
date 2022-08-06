<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <div class="text item">
          <TreeTools @add='add' :treeNode="company" :isRoot="true"></TreeTools>
          <el-tree :data="treeData" :props="defaultProps" default-expand-all>
            <!-- <TreeTools :treeNode="{name:'总裁办',manager:'总裁'}"></TreeTools> -->
            <template v-slot="{ data }">
              <TreeTools @add='add' @remove="loadDepts" :treeNode="data"> </TreeTools>
            </template>
          </el-tree>
        </div>
      </el-card>
    </div>
    <!-- 添加部门信息 -->
    <add-dept :visible.sync="dialogVisible" :currentNode='currentNode'></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools'
import AddDept from './components/add-depy'
import { getDeptsApi } from '@/api/departments'
import { transListToTree } from '@/utils/index'
export default {
  name: 'add-depy',
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
      company: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      currentNode:{}
    }
  },
  components: {
    TreeTools,
    AddDept
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
    },
    add(val){
      this.dialogVisible=true
      this.currentNode=val
      console.log(val,"add点击传值");
    }
  }
}
</script>

<style scoped lang="less"></style>
