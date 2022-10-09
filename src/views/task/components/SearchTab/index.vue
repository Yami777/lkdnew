<template>
  <el-form ref="formData" :inline="true" :model="formData" class="demo-form-inline">
    <el-form-item :label="title1">
      <el-input v-model="formData.taskCode" placeholder="请选择" clearable />
    </el-form-item>
    <el-form-item :label="title2" class="task-status">
      <el-select v-model="formData.statusName" placeholder="请选择" clearable @focus="getAllTaskStatus">
        <el-option
          v-for="status in statusList"
          :key="status.statusId"
          :label="status.statusName"
          :value="status.statusName"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="submit">查询</el-button>
    </el-form-item>
  </el-form>

</template>

<script>
import { getAllTaskStatusAPI } from '@/api/task'
export default {
  props: {
    title1: {
      type: String,
      default: ''
    },
    title2: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {
        taskCode: '',
        statusName: '',
        status: ''
      },
      statusList: []
    }
  },
  created() {
  },
  methods: {
    async getAllTaskStatus() {
      const { data } = await getAllTaskStatusAPI()
      // console.log(data)
      this.statusList = data
    },
    submit() {
      // console.log(this.formData)
      if (this.formData.statusName === '待办') {
        this.formData.status = 1
      } else if (this.formData.statusName === '进行') {
        this.formData.status = 2
      } else if (this.formData.statusName === '取消') {
        this.formData.status = 3
      } else if (this.formData.statusName === '完成') {
        this.formData.status = 4
      } else {
        this.formData.status = ''
      }
      this.$emit('toSearch', this.formData)
    }

  }
}
</script>

<style  lang="scss">
::v-deep .search-tab {
  height: 64px;
}

</style>
