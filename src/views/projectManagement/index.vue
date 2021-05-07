<!--
 * @Descripttion: 
 * @version: 
 * @Author: shang xia
 * @Date: 2021-04-01 10:27:30
 * @LastEditors: shang xia
 * @LastEditTime: 2021-04-12 17:35:04
-->
<template>
 <div class="app-container">
    <div class="filter-container">
      <div class="filter-list">
        <div class="filter">
          <span>项目名称:</span>
          <el-input v-model="projectName" placeholder="项目名称" @keyup.enter.native="handleQuery"/>
        </div>
      </div>
       <div class="filter-btn">
          <el-button class="btn" type="primary" @click="handleQuery">
            <i class="el-icon-search" />
            查询
          </el-button>
          <el-button class="btn" type="primary" @click="handleAddUnit">
            <i class="el-icon-plus" />
            新增项目
          </el-button>
        </div>
    </div>
    <el-table
      v-loading="listLoading"
      class="components-tabeList"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称">
        <template slot-scope="scope">
          {{ scope.row.projectName || '--' }}
        </template>
      </el-table-column>
      <el-table-column label="项目描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.description || '--' }}</span>
        </template>
      </el-table-column>

      <el-table-column label="项目备注" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.remark || '--' }}</span>
        </template>
      </el-table-column>
       <el-table-column label="操作" align="center"  width="180">
        <template slot-scope="scope">
          <el-button
            @click="handleChange(scope.row)"
            type="text">修改</el-button>
           <el-button
            @click="handleDelete(scope.row.projectId)"
            type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="pagination.totleCount" :page="pagination.offset" :limit="pagination.max" @pagination="getTableList"/>
    <UnitModal :visible="visible" :type="modalType" :handleCancel="handleProjectCancel" :handleOk="handleProjectOk" :unitData="unitData"/>
    <UnitDelModal :visible="delVisible" :handleCancel="handleDelCancel" :handleOk="handleDelOk" />
  </div>
</template>

<script>
import pagination from '@/components/Pagination';
import UnitDelModal from './UnitDelModal.vue';
import UnitModal from './UnitModal.vue';

export default {
  data() {
    return {
      list: null,
      listLoading: false,
      pagination: {
        max: 10,
        offset: 1,
        totleCount: 0
      },
      delVisible: false,
      projectName: '',
      unitId: '',
      visible: false,
      modalType: 1,
      unitData: {},
    }
  },
   components: {
    UnitDelModal,
    UnitModal,
    pagination
  },
  created() {
    this.fetchData({offset: 1, max: 10})
  },
  methods: {
    handleDelete(id) {
      this.unitId = id;
      this.delVisible = true;
    },

    handleDelCancel() {
      this.unitId = '';
      this.delVisible = false;
    },
    handleDelOk() {
      this.$store.dispatch('userInformation/deleteProject', {projectId: this.unitId}).then(res => {
        console.log(res, 'sdfsdfsdfsdfsdf')
        this.$message({
          message: '项目已成功删除',
          type: 'success',
        });
        this.unitId = '';
        this.delVisible = false;
      })
    },
    getTableList(pag) {
       const data = {
          offset: pag.page,
          max: pag.limit
        };
        this.fetchData(data)
    },
    fetchData(data) {
      this.listLoading = true
      this.$store.dispatch('userInformation/getProject', {...data}).then(res => {
        console.log(res, 'oooooo')
        this.list = res.list;
        this.pagination = {
          max: res.max,
          offset: res.offset,
          totleCount: res.totleCount
        }
        this.listLoading = false;
      })
    },
    handleQuery() {
      this.fetchData({offset: 1, max: 10, projectName: this.projectName})
    },
    handleAddUnit() {
      this.modalType = 1;
      this.visible = true;
    },
    handleChange(data) {
      this.visible = true;
      this.modalType = 2;
      console.log(data, 999999)
      data.modalType = 2;
      this.unitData = data
    },

    handleProjectCancel() {
      this.visible = false;
      this.unitId = '';
      this.unitData = {};
    },
    handleProjectOk(data) {
      console.log(data, 'iissss')
      if(data.modalType === 1) {
        this.$store.dispatch('userInformation/addProject', data).then(res => {
          this.$message({
            message: '新增项目成功！',
            type: 'success',
          });
          // this.fetchData({offset: 1, max: 10})
          this.handleProjectCancel();
        })
      }else if(data.modalType === 2) {
        this.$store.dispatch('userInformation/updateProject', {...data}).then(res => {
          this.$message({
            message: '项目修改成功！',
            type: 'success',
          });
          this.fetchData({offset: this.pagination.offset, max: this.pagination.max})
          // this.handleUnitCancel();
        })
      }
    },

    handleDelete(id) {
      // this.unitId = id;
      // this.delVisible = true;
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('userInformation/deleteProject', {projectId: id}).then(res => {
          this.$message({
            message: '项目已成功删除',
            type: 'success',
          });
          this.unitId = '';
          this.delVisible = false;
          this.fetchData({offset: 1, max: 10})
      })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
    }
  }
}
</script>
