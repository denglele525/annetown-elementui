<template>
    <div>
        <div>
            <el-table :data="emps" border stripe size="mini">
                <el-table-column type="selection" align="left" width="55"></el-table-column>
                <el-table-column prop="name" label="姓名" fixed width="120" align="left"></el-table-column>
                <el-table-column prop="workId" label="工号" width="120" align="left"></el-table-column>
                <el-table-column prop="email" label="电子邮件" width="120" align="left"></el-table-column>
                <el-table-column prop="phone" label="电话号码" width="120" align="left"></el-table-column>
                <el-table-column prop="department.name" label="所属部门" width="120" align="left"></el-table-column>
                <el-table-column label="所属部门" align="center">
                    <template slot-scope="scope">
                        <el-tooltip placement="right" v-if="scope.row.salary[0]">
                            <div slot="content">
                                <table>
                                    <!--                                    <tr v-for="(value,title,index) in scope.row.salary[0]" :key="index"-->
                                    <!--                                        v-if="title != 'id'">-->
                                    <!--                                        <td>-->
                                    <!--                                            <el-tag>{{title}}</el-tag>-->
                                    <!--                                        </td>-->
                                    <!--                                        <td>{{value}}</td>-->
                                    <!--                                    </tr>-->
                                    <tr>
                                        <td>基本工资</td>
                                        <td>{{scope.row.salary[0].basicSalary}}</td>
                                    </tr>
                                    <tr>
                                        <td>交通补助</td>
                                        <td>{{scope.row.salary[0].trafficSalary}}</td>
                                    </tr>
                                    <tr>
                                        <td>午餐补助</td>
                                        <td>{{scope.row.salary[0].lunchSalary}}</td>
                                    </tr>
                                    <tr>
                                        <td>奖金</td>
                                        <td>{{scope.row.salary[0].bonus}}</td>
                                    </tr>
                                    <tr>
                                        <td>养老金比率</td>
                                        <td>{{scope.row.salary[0].pensionPer}}</td>
                                    </tr>
                                    <tr>
                                        <td>养老金基数</td>
                                        <td>{{scope.row.salary[0].pensionBase}}</td>
                                    </tr>
                                    <tr>
                                        <td>医疗保险比率</td>
                                        <td>{{scope.row.salary[0].medicalPer}}</td>
                                    </tr>
                                    <tr>
                                        <td>医疗保险基数</td>
                                        <td>{{scope.row.salary[0].medicalBase}}</td>
                                    </tr>
                                    <tr>
                                        <td>公积金比率</td>
                                        <td>{{scope.row.salary[0].accumulationFundPer}}</td>
                                    </tr>
                                    <tr>
                                        <td>公积金基数</td>
                                        <td>{{scope.row.salary[0].accumulationFundBase}}</td>
                                    </tr>
                                    <tr>
                                        <td>启用时间</td>
                                        <td>{{scope.row.salary[0].createDate}}</td>
                                    </tr>
                                </table>
                            </div>
                            <el-tag>{{scope.row.salary[0].name}}</el-tag>
                        </el-tooltip>
                        <el-tag v-else>暂未设置</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-popover
                                placement="left"
                                title="修改工资账套"
                                @show="showPop(scope.row.salary[0])"
                                @hide="hidePop(scope.row)"
                                width="200"
                                trigger="click">
                            <div>
                                <el-select v-model="currentSalaries" placeholder="请选择" size="mini">
                                    <el-option
                                            v-for="item in salaries"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <el-button slot="reference" type="danger">修改工资账套</el-button>
                        </el-popover>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end">
                <el-pagination
                        background
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SalSobCfg",
        data() {
            return {
                emps: [],
                total: 0,
                currentPage: 1,
                currentSize: 10,
                currentSalaries: -1,
                salaries: []
            }
        },
        mounted() {
            this.initEmps();
            this.initSalaries();
        },
        methods: {
            currentChange(page) {
                this.currentPage = page;
                this.initEmps();
            },
            sizeChange(size) {
                this.currentSize = size;
                this.initEmps();
            },
            hidePop(data) {
                if (this.currentSalaries) {
                    this.putRequest("/salary/sobcfg/?eid=" + data.id + "&sid=" + this.currentSalaries).then(resp => {
                        if (resp) {
                            this.initEmps();
                        }
                    })
                }
            },
            showPop(data) {
                if (data) {
                    this.currentSalaries = data.id;
                } else {
                    this.currentSalaries = null;
                }
            },
            initSalaries() {
                this.getRequest("/salary/sobcfg/salaries").then(resp => {
                    if (resp) {
                        this.salaries = resp;
                    }
                })
            },
            initEmps() {
                this.getRequest("/salary/sobcfg/?page=" + this.currentPage + "&size=" + this.currentSize).then(resp => {
                    if (resp) {
                        this.emps = resp.data;
                        this.total = resp.total;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
