<template>
  <div class="task-business">
    <el-card class="box-card task-title">
      <search-tab title1="工单编号:" title2="工单状态：" @toSearch="toSearch" />
    </el-card>

    <!-- 列表区域 -->
    <el-card class="box-card task-table">
      <div slot="header" class="clearfix table-hear">
        <el-button type="primary" icon="el-icon-circle-plus-outline">新建</el-button>
        <el-button type="info">工单配置</el-button>
      </div>
      <div class="text item">
        <el-table
          :data="taskList"
          style="width: 100%"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
          />
          <el-table-column
            prop="taskCode"
            label="工单编号"
            width="138"
          />
          <el-table-column
            prop="innerCode"
            label="设备编号"
            width="133"
          />
          <el-table-column
            prop="taskType.typeName"
            label="工单类型"
            width="133"
          />
          <el-table-column
            prop="createType"
            label="工单方式"
            width="133"
          >
            <template slot-scope="{row}">
              {{ row.createType |filterCreateType }}
            </template>
          </el-table-column>
          <el-table-column
            prop="taskStatusTypeEntity.statusName"
            label="工单状态"
            width="133"
          />
          <el-table-column
            prop="userName"
            label="运营人员"
            width="133"
          />
          <el-table-column
            prop="createTime"
            label="创建日期"
            width="160"
          >
            <template slot-scope="{row}">
              {{ row.createTime |filterCreateTime }}
            </template>

          </el-table-column>
          <el-table-column
            label="操作"
            width="100"
          >
            <template slot-scope="{row}">
              <el-button type="text" size="small" @click="getTaskDetail(row)">查看详情</el-button>
            </template>
          </el-table-column></el-table>
      </div>
    </el-card>
    <!-- 分页组件 -->

  </div>
</template>

<script>
import dayjs from 'dayjs'
import SearchTab from './SearchTab/index.vue'
import { getSearchTaskAPI } from '@/api/task'
export default {
  components: {
    SearchTab
  },
  filters: {
    filterCreateType(val) {
      if (val === 0) {
        return '自动'
      } else {
        return '手动'
      }
    },
    filterCreateTime(val) {
      return dayjs(val).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  data() {
    return {
      page: {
        pageIndex: 1,
        pageSize: 10,
        isRepair: false,
        status: '',
        taskCode: ''
      },
      totalCount: 0,
      totalPage: 0,
      taskList: []
    }
  },
  created() {
    this.getSearchTask()
  },
  methods: {
    async getSearchTask() {
      try {
        const { data } = await getSearchTaskAPI(this.page)
        console.log(data)
        this.taskList = data.currentPageRecords
        this.totalCount = data.totalCount
      } catch {
        throw new Error()
      }
    },
    getTaskDetail(val) {
      console.log(val)
    },
    toSearch(val) {
      this.page.status = val.status
      this.page.taskCode = val.taskCode
      this.getSearchTask()
    }
  }
}
</script>

<style lang="scss" scoped>
.task-business {
  ::v-deep .el-form-item__label {
font-weight: normal;
  }
  .task-status {
    margin-left: 10px;
  }
  .task-title {
::v-deep .el-button  {
    background-color: #5f84ff;
  }
  }

  .task-table {
    margin-top: 20px;
     .table-hear {
       ::v-deep .el-button  {
    background-color: #ff883a;
    border: 0;
     }
 ::v-deep .el-button--info{
      background-color: #fbf4f0;
      color: #333;
     }
  }

  }
}
</style>
