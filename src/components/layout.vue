<template>
  <div>
    <el-container>
      <el-header>c2c</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            ref="menu"
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>专家来查房</span>
              </template>
              <el-menu-item index="/expert" router="/expert">
                查房
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>成员管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/member" router="/member">
                  人员管理
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Layout",
  components: {},
  data() {
    return {
      defaultActive: ""
    };
  },
  mounted() {
    setTimeout(() => {
      //刷新
      this.$refs.menu.activeIndex = localStorage.getItem("index");
    }, 100);
  },
  watch: {
    $route() {
      let i = this.$route.path;
      localStorage.setItem("index", i); //刷新
      setTimeout(() => {
        //路由跳转
        this.$refs.menu.activeIndex = i;
      }, 100);
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key);
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  min-height: 700px;
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 200px;
  box-sizing: border-box;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
