<template>
    <el-container class="home-container">
        <!-- 头部区域 -->
      <el-header>
          <div>
              <!-- <span>DevOps</span> -->
          </div>
          <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边菜单栏 -->
        <el-aside :width="isCollapse ? '64px': '200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 菜单列表 -->
                <el-menu class="el-menu-vertical-demo"
                background-color="#2f4050" 
                text-color="#fff"
                active-text-color="#409BFF"
                unique-opened
                :collapse="isCollapse"
                :collapse-transition="false"
                :router="true"
                :default-active="activePath"
                >
                    <!-- 一级菜单 -->
                    <el-submenu :index="men.id + ''" v-for="men in menuList" :key="men.id"> 
                        <template slot="title">
                            <!-- 一级菜单图标 -->
                        <i :class="iconsObj[men.id]"></i>
                            <!-- 一级菜单文本 -->
                        <span>{{men.authName}}</span>
                        </template>

                        <!-- 二级菜单 -->
                        <el-menu-item :index="'/'+children.path" v-for="children in men.children" :key="children.id" @click="saveActivePath('/'+children.path)">
                            <template slot="title">
                                <!-- 二级菜单图标 -->
                                <i class="el-icon-menu"></i>
                                <!-- 二级菜单文本 -->
                                <span>{{children.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>        
        </el-aside>
        <!-- 内容区域 -->
        <el-main>
            <!-- 路由站位符 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
      return {
          //菜单列表数据
          menuList:[],

          //一级菜单图标
          iconsObj: {
        '100': 'el-icon-s-custom',
        '110': 'el-icon-s-claim',
        '120': 'el-icon-s-shop',
        '130': 'el-icon-s-order',
        '140': 'el-icon-s-data'
      },
      //是否折叠
      isCollapse:false
      }
      //左侧菜单高亮显示
      activePath:''
  },
  created() {
      this.getMeniList()
      this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$message.info('退出成功！')
      this.$router.push('/login')
    },
    //获取所有的菜单
    async getMeniList() {
        const { data : res } = await this.$http.get('/menus')
        // if (resp.meta.status !== 200) return this.$message.error(resp.meta.msg)
        // this.menuList = resp.data
        this.menuList = res
    },
    //点击按钮切换菜单的折叠与展开
    toggleCollapse() {
        this.isCollapse = ! this.isCollapse
        console.log(this.isCollapse)
    },
    //点击事件，将左侧菜单高亮显示值保存至sessionStorage中
    saveActivePath(activePath) {
        window.sessionStorage.setItem('activePath',activePath)
        this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
    background-color: #373d41;
    height: 100%;

    //设置
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;

    //设置字体样式
    color: white;
    font-size: 20px;
    > div{ //文字居中对齐
        width: 200px;
        height: 60px;

        align-items: center;
        display: flex;
        background-image: url('../assets/img/ops-logo.jpg');
        background-repeat: no-repeat;
        background-position: 50% 50%; 
        background-color: white;
    }
}

//侧边菜单栏
.el-aside {
    background-color:#2f4050;
    float: left;
    height: 100%;
    .el-menu {
        border-right: none;
    }
}

// 内容区域
.el-main {
    background-color:#eee;
    padding:0;
    height: 100%;
}

//设置菜单栏缩进伸出
.toggle-button{
    background-color: #4A5064;
    font-size: 10px; //设置字体大小
    line-height: 24px;//设置行高
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>
