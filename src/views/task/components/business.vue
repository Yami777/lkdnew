<template>
  <div class="task-business">
    <el-card class="box-card task-title">
      <search-tab
        title1="工单编号:"
        title2="工单状态："
        @toSearch="toSearch"
      />
    </el-card>

    <!-- 列表区域 -->
    <el-card class="box-card task-table">
      <div slot="header" class="clearfix table-hear">
        <el-button type="primary" icon="el-icon-circle-plus-outline">新建</el-button>
        <el-button type="info" @click="getSupplyAlertValue">工单配置</el-button>
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
          />
          <el-table-column
            prop="taskType.typeName"
            label="工单类型"
          />
          <el-table-column
            prop="createType"
            label="工单方式"
          >
            <template slot-scope="{row}">
              {{ row.createType |filterCreateType }}
            </template>
          </el-table-column>
          <el-table-column
            prop="taskStatusTypeEntity.statusName"
            label="工单状态"
          />
          <el-table-column
            prop="userName"
            label="运营人员"
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
    <div v-if="totalCount>10" class="page-content">
      <div>
        <span>共{{ totalCount }}条记录</span>
        <span>第{{ page.pageIndex }}/ {{ totalPage }}页</span>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :current-page.sync="page.pageIndex"
        :page-size.sync="page.pageSize"
        @current-change="getSearchTask"
        @size-change="getSearchTask"
      />
    </div>

    <!-- 工单配置区域 -->
    <div class="supplyAlertValue">
      <el-dialog
        title="工单配置"
        :visible.sync="dialogVisible"
        width="630px"
        :before-close="handleClose"
      >
        <el-form ref="supplyAlertValueForm" :model="supplyAlertValueForm" class="demo-ruleForm" :rules="rules">
          <el-form-item
            label="预警值："
            prop="alertValue"
          >
            <el-input-number
              v-model="supplyAlertValueForm.alertValue"
              controls-position="right"
              :min="0"
              :max="100"
            />
            <span slot="footer" class="dialog-footer" />
          </el-form-item>
          <el-form-item class="btn">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="postAutoSupplyConfig">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import SearchTab from './SearchTab/index.vue'
import { getSearchTaskAPI, getSupplyAlertValueAPI, postAutoSupplyConfigAPI } from '@/api/task'
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
      taskList: [],
      dialogVisible: false,

      supplyAlertValueForm: {
        alertValue: 0
      },
      rules: {
        alertValue: [{
          required: true,
          message: '请输入'
        }]
      }
    }
  },
  created() {
    this.getSearchTask()
  },
  methods: {
    // 工单搜索
    async getSearchTask() {
      try {
        const { data } = await getSearchTaskAPI(this.page)
        // console.log(data)
        this.taskList = data.currentPageRecords
        this.totalCount = data.totalCount
        this.totalPage = data.totalPage
      } catch {
        throw new Error()
      }
    },
    // 查看详情
    getTaskDetail(val) {
      console.log(val)
    },
    // 点击查询按钮查询工单
    toSearch(val) {
      this.page.status = val.status
      this.page.taskCode = val.taskCode
      this.getSearchTask()
    },
    handleClose() {
      this.dialogVisible = false
      this.$refs.supplyAlertValueForm.resetFields()
      this.supplyAlertValueForm = {
        alertValue: 0
      }
    },
    async getSupplyAlertValue() {
      this.dialogVisible = true
      const { data } = await getSupplyAlertValueAPI()
      // console.log(data)
      this.$set(this.supplyAlertValueForm, 'alertValue', data)
    },
    async postAutoSupplyConfig() {
      await this.$refs.supplyAlertValueForm.validate()
      await postAutoSupplyConfigAPI(this.supplyAlertValueForm)
      this.handleClose()
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
  .page-content {
    margin-top: 20px;
      display: flex;
      justify-content: space-between;
    font-size: 13px;
    min-width: 35.5px;
    height: 40px;
    line-height: 38px;
    vertical-align: top;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    flex: 1;
    font-size: 16px!important;
    color: #dbdfe5!important;
    margin-right: 10px;
  }
  ::v-deep  .el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev {
    width: 70px;
    height: 32px;
    margin: 0 16px;
    border-radius: 2px;
    background-color: #d5ddf8;
}
.supplyAlertValue {
  .demo-ruleForm {
    margin-left: 20px;
    .btn {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  ::v-deep .el-dialog__header {
    background-color: #fff;
    .el-dialog__title {
      font-weight: 700;
      color: #333;
      font-size: 16px;
    }
    .el-icon-close {
      &::before {
        color: #333;
}
    }

  }
 ::v-deep .el-input-number{
width: 396px;
  }
}
}
</style>
