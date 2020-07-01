<template>
  <div class="expertRounds">
    <div class="memberTitle">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/expert' }">查房</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="meetingList" style="width: 100%">
      <el-table-column prop="check_room_hospital" label="查房医院"> </el-table-column>
      <el-table-column prop="check_room_data" label="查房日期" width="110"> </el-table-column>
      <el-table-column prop="area" label="大区" width="50"> </el-table-column>
      <el-table-column prop="city" label="城市"> </el-table-column>
      <el-table-column prop="charge_man" :formatter="getChargeMan" label="负责人"></el-table-column>
      <el-table-column prop="address" label="物料地址"> </el-table-column>
      <el-table-column prop="company_man" :formatter="getCompanyMan" label="陪同人"></el-table-column>
      <el-table-column prop="invitation_letter" label="活动邀请函及日程"></el-table-column>
      <el-table-column prop="need_ticket" :formatter="handleTicket" label="大交通"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getMeetingList } from "@/api/expert/index";
import { uuid, getCookie } from "@/utils/index";
import MeetList from "./components/meetList";
export default {
  components: {
    MeetList
  },
  data() {
    return {
      meetingList: []
    };
  },
  watch: {
    // activeName: function (newVal, oldVal) {
    //   this.activeName
    //   let val = parseInt(newVal);
    //   this._getMeetingList(val);
    // }
  },
  created() {
    this._getMeetingList();
  },
  methods: {
    getChargeMan(data) {
      return data.charge_man + '/' + data.charge_man_phone
    },
    getCompanyMan(data) {
      return data.company_man + '/' + data.company_man_phone
    },
    async _getMeetingList() {
      const params = {
        reqid: uuid(),
        pageindex: 1,
        pagesize: 2000
      };
      await getMeetingList(params).then(res => {
        if (res.data.status === 0) {
          this.meetingList = res.data.data.meets;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    onCreateMeeting() {
      const userInfo = JSON.parse(getCookie("userInfo"));
      if (userInfo.role !== 2) {
        this.$message.error("抱歉，您没有管理员权限，不能创建会议");
        return false;
      }
      // this.$router.push('/createMeeting');
    },
    handleTicket(data) {
      if(!data.need_ticket) {
        return '不需要';
      } else if(data.need_ticket===1) {
        return '机票/包车';
      } else if(data.need_ticket===-1) {
        return '火车票';
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.memberTitle {
  margin: 10px 0 20px 0;
}
.expertRounds {
  .el-table {
    padding: 10px;
  }
}
</style>
