<template>
  <div>
    <div class="memberTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/member' }">成员管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <el-table :data="userList" style="width: 100%">
      <el-table-column prop="create_time" label="申请时间" width="165"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="80"> </el-table-column>
      <el-table-column prop="area" label="大区" width="50"> </el-table-column>
      <el-table-column prop="phone_num" label="手机号"> </el-table-column>
      <el-table-column prop="password" label="登录密码"></el-table-column>
      <el-table-column prop="card" label="名片"> </el-table-column>
      <el-table-column label="操作"  width="250">
        <template slot-scope="scope">
          <span class="status">{{handleActions(scope.row)}}</span>
         <el-button
          size="mini"
          type="danger"
          v-if="scope.row.status !== 1"
          @click="handleUpdate(scope.$index, scope.row)">审核</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
      <!-- <el-table-column prop="invitation_letter" label="删除"></el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { getUserList, updateUserStatus, delUser } from '@/api/member'
import { uuid } from "@/utils/index";
export default {
  data() {
    return {
      userList: [],
       options: [{
          value: 0,
          label: '待审核'
        },{
          value: 1,
          label: '通过'
        }, {
          value: 2,
          label: '拒绝'
        }],
    }
  },
  created() {
    this._getUserList();
  },
  methods: {
    async _getUserList() {
      const params = {
        reqid: uuid(),
        pageindex: 1,
        pagesize: 2000
      }
      await getUserList(params).then(res => {
        if (res.data.status === 0) {
          this.userList = res.data.data.users;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleActions(data) {
      if(!data.status) {
        return '待审核'
      } else if(data.status === 1) {
        return '通过'
      } else if (data.status ===2) {
        return '拒绝'
      }
    },
    async handleUpdate(index,row) {
      this.$confirm('是否通过审批?', '提示', {
        confirmButtonText: '通过',
        cancelButtonText: '拒绝',
        type: 'warning'
      }).then(() => {
        this._updateUser(row, 1);
      }).catch(() => {
        this._updateUser(row, 2);   
      });
    },
    async _updateUser(row, status) {
      const params = {
        reqid: uuid(),
        phone_num: row.phone_num,
        status
      }
      await updateUserStatus(params).then(res => {
        if (res.data.status === 0) {
          this.$message({
            type: 'success',
            message: '更新成功!'
          });
          this._getUserList();
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    handleDelete(index, row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const params = {
          reqid: uuid(),
          id: row.id
        }
        await delUser(params).then(res => {
          if (res.data.status === 0) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this._getUserList();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }).catch(() => {
        return false;
      });
      
    }
  }
}
</script>

<style lang="scss" scoped>
.memberTitle {
  margin: 10px 0 20px 0;
}
.status {
  margin-right: 15px;
  display: inline-block;
  width: 45px;
}
</style>