<template>
    <div>
        <!-- 面包屑区域 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/users' }">用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 搜索卡片区域 -->
        <el-card>
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容" class="input-with-select">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加用户</el-button>
                </el-col>
            </el-row>
        </el-card>

        <!-- 用户卡片区域 -->
        <el-card>
            <el-row :gutter="20">
                <!--用户列表区域-->
                <el-table :data="userList" border stripe>
                    <el-table-column label="序号" type="index"></el-table-column>
                    <el-table-column label="ID" prop="id"></el-table-column>
                    <el-table-column label="用户名称" prop="role_name"></el-table-column>
                    <el-table-column label="账号" prop="username"></el-table-column>
                    <el-table-column label="密码" prop="password"></el-table-column>
                    <el-table-column label="手机号" prop="modile"></el-table-column>
                    <el-table-column label="状态">
                        <template slot-scope="scope">
                            <!-- {{ scope.row }} -->
                            <el-switch
                            v-model="scope.row.mg_state"
                            active-color="#13ce66"
                            inactive-color="#eee">
                            </el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="180px">
                        <template>
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start" :enterable="false">
                                <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="删除" placement="top-start" :enterable="false">
                                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>  
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" content="分配权限" placement="top-start" :enterable="false">
                                <el-button type="warning" icon="el-icon-setting" size="mini"></el-button> 
                            </el-tooltip>
                        </template>                    
                    </el-table-column>
                </el-table>
            </el-row>
            
            <!-- 分页区域 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="queryInfo.pagenum"
            :page-sizes="page.pageSizes"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            total: 0, //数据总行数
            //获取用户列表的参数对象
            queryInfo: {
                query: '',
                pagenum: 1,
                pagesize: 10
            },
            //用户数据
            userList:[],
            //分页设置
            page:{
                pageSizes:[2, 4, 6, 8, 10]
            }
        }
    },
    created() {
        this.getUserList()
    },
    methods:{
        //获取用户数据
        async getUserList() {
            const { data : res } = await this.$http.get('/users', {
                params: this.queryInfo
            })
            this.total = res.users.length
            this.userList = res.users
        },

        // 下拉框分页
        handleSizeChange(num) {
            console.log(num)
        },
        // 选择页数
        handleCurrentChange(num) {
            console.log(num)
        }
    }
 }
</script>

<style lang="less" scoped>

</style>