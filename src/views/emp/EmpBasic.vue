<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <div>
                <el-input placeholder="请输入员工名进行搜索，可以直接回车搜索······" prefix-icon="el-icon-search"
                          clearable
                          @clear="initEmps"
                          style="width: 300px;margin-right: 10px" v-model="keyword"
                          @keydown.enter.native="initEmps"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="initEmps">搜索</el-button>
                <el-button type="primary">
                    <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    高级搜索
                </el-button>
            </div>
            <div>
                <el-button type="success">
                    <i class="fa fa-level-up" aria-hidden="true"></i>
                    导入数据
                </el-button>
                <el-button type="success">
                    <i class="fa fa-level-down" aria-hidden="true"></i>
                    导出数据
                </el-button>
                <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">
                    添加员工
                </el-button>
            </div>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    :data="emps"
                    stripe
                    border
                    v-loading="loading"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        fixed
                        align="left"
                        label="姓名"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="workId"
                        label="工号"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        label="出生日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        label="身份证号码"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        label="婚姻状况"
                        align="left"
                        width="70">
                </el-table-column>
                <el-table-column
                        prop="nation.name"
                        label="民族"
                        align="left"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="nativePlace"
                        label="籍贯"
                        align="left"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="politic.name"
                        label="政治面貌"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="email"
                        label="电子邮件"
                        align="left"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="电话号码"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="联系地址"
                        align="left"
                        width="220">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        label="所属部门"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="pos.name"
                        label="职位名称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="joblevel.name"
                        label="职称"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="engageForm"
                        label="聘用形式"
                        align="left"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        label="入职日期"
                        align="95"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="conversionTime"
                        label="转正日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="beginContract"
                        label="合同起始日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        prop="endContract"
                        label="合同终止日期"
                        align="left"
                        width="95">
                </el-table-column>
                <el-table-column
                        label="合同期限"
                        align="left"
                        width="100">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractTerm}}</el-tag>
                        年
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        label="最高学历">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                    <template slot-scope="scope">
                        <el-button style="padding: 3px" size="mini">编辑</el-button>
                        <el-button style="padding: 3px" size="mini" type="primary">查看高级资料</el-button>
                        <el-button style="padding: 3px" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content:flex-end">
                <el-pagination
                        background
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                title="添加员工"
                :visible.sync="dialogVisible"
                width="80%">
            <div>
                <el-form :model="emp" :rules="rules" ref="empForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名:" prop="name">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.name"
                                          placeholder="请输入员工姓名">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="性别:" prop="gender">
                                <el-radio-group style="width: 150px" v-model="emp.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="出生日期:" prop="birthday">
                                <el-date-picker
                                        v-model="emp.birthday"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 180px"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="政治面貌:" prop="politic">
                                <el-select v-model="emp.politic.id" placeholder="政治面貌" size="mini" style="width: 200px">
                                    <el-option
                                            v-for="item in politicsstatus"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族:" prop="nation">
                                <el-select v-model="emp.nation.id" placeholder="民族" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in nations"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="籍贯:" prop="nativePlace">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="emp.nativePlace"
                                          placeholder="请输入籍贯">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                                          v-model="emp.email"
                                          placeholder="请输入电子邮箱">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="联系地址:" prop="address">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                          v-model="emp.address"
                                          placeholder="请输入联系地址">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="职位:" prop="pos">
                                <el-select v-model="emp.pos.id" placeholder="职位" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in positions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="职称:" prop="joblevel">
                                <el-select v-model="emp.joblevel.id" placeholder="职称" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in joblevels"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属部门:" prop="department">
                                <el-popover
                                        placement="right"
                                        title="请选择部门"
                                        width="200"
                                        trigger="manual"
                                        v-model="popVisible">
                                    <el-tree default-expand-all :data="allDepts" :props="defaultProps"
                                             @node-click="handleNodeClick"></el-tree>
                                    <div slot="reference" style="width: 180px;display: inline-flex;font-size: 13px
;border:1px solid #dedede; height: 26px;border-radius: 5px;cursor: pointer;align-items: center;padding-left: 8px;box-sizing: border-box "
                                         @click="showDepView">{{inputDepName}}
                                    </div>
                                </el-popover>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="电话号码:" prop="phone">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                                          v-model="emp.phone"
                                          placeholder="电话号码">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="工号:" prop="workId">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit"
                                          v-model="emp.workId"
                                          placeholder="工号" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="学历:" prop="tiptopDegree">
                                <el-select v-model="emp.tiptopDegree" placeholder="学历" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in tiptopDegree"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="毕业院校:" prop="school">
                                <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                                          v-model="emp.school"
                                          placeholder="毕业院校名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="专业名称:" prop="specialty">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                          v-model="emp.specialty"
                                          placeholder="请输入专业名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="入职日期:" prop="beginDate">
                                <el-date-picker
                                        v-model="emp.beginDate"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="转正日期:" prop="conversionTime">
                                <el-date-picker
                                        v-model="emp.conversionTime"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同起始日期:" prop="beginContract">
                                <el-date-picker
                                        v-model="emp.beginContract"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同终止日期:" prop="endContract">
                                <el-date-picker
                                        v-model="emp.endContract"
                                        size="mini"
                                        type="date"
                                        value-format="yyyy-MM-dd"
                                        style="width: 130px"
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="身份证号码:" prop="idCard">
                                <el-input size="mini" style="width: 180px" prefix-icon="el-icon-edit"
                                          v-model="emp.idCard"
                                          placeholder="请输入身份证号码">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="聘用形式:" prop="engageForm">
                                <el-radio-group v-model="emp.engageForm">
                                    <el-radio label="劳动合同">劳动合同</el-radio>
                                    <el-radio label="劳务合同">劳务合同</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="婚姻状况:" prop="wedlock">
                                <el-radio-group v-model="emp.wedlock">
                                    <el-radio label="已婚">已婚</el-radio>
                                    <el-radio label="未婚">未婚</el-radio>
                                    <el-radio label="离异">离异</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="doAddEmp">确 定</el-button>
             </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "EmpBasic",
        data() {
            return {
                allDepts: [],
                emps: [],
                loading: false,
                popVisible: false,
                total: 0,
                page: 1,
                size: 10,
                keyword: '',
                nations: [],
                joblevels: [],
                politicsstatus: [],
                positions: [],
                tiptopDegree: ['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其它'],
                inputDepName: '',
                emp: {
                    name: "邓乐乐",
                    gender: "男",
                    birthday: "1990-01-01",
                    idCard: "430681199305252615",
                    wedlock: "已婚",
                    nation: {
                        id: 1,
                    },
                    nativePlace: "湖南",
                    politic: {
                        id: 13
                    },
                    email: "930441318@qq.com",
                    phone: "17352862905",
                    address: "长沙市星沙区",
                    department: {
                        id: 0
                    },
                    joblevel: {
                        id: 9
                    },
                    pos: {
                        id: 29
                    },
                    engageForm: "劳务合同",
                    tiptopDegree: "本科",
                    specialty: "信息管理与信息系统",
                    school: "上海海洋大学",
                    beginDate: "2019-05-20",
                    workState: "在职",
                    workId: "100",
                    contractTerm: 1.0,
                    conversionTime: "2019-07-20",
                    notworkDate: null,
                    beginContract: "2019-05-20",
                    endContract: "2020-05-20",
                    workAge: null
                },
                dialogVisible: false,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                rules: {
                    name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
                    birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
                    politic: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
                    idCard: [{required: true, message: '请输入身份证', trigger: 'blur'},{
                        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                        message:'身份证号码格式不正确',
                        trigger: 'blur'
                    }],
                    nation: [{required: true, message: '请输入民族', trigger: 'blur'}],
                    nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
                    email: [{required: true, message: '请输入邮箱', trigger: 'blur'}, {
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }],
                    address: [{required: true, message: '请输入地址', trigger: 'blur'}],
                    pos: [{required: true, message: '请输入职位', trigger: 'blur'}],
                    joblevel: [{required: true, message: '请输入职称', trigger: 'blur'}],
                    department: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
                    phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}],
                    tiptopDegree: [{required: true, message: '最高学历', trigger: 'blur'}],
                    school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
                    specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
                    beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
                    conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
                    beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
                    endContract: [{required: true, message: '请输入合同终止日期', trigger: 'blur'}],
                    engageForm: [{required: true, message: '请输入聘用形式', trigger: 'blur'}],
                    wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
                }
            }
        },
        mounted() {
            this.initEmps();
            this.initData();
        },
        methods: {
            doAddEmp() {
                this.$refs['empForm'].validate(valid => {
                    if (valid) {
                        this.postRequest("/emp/basic/", this.emp).then(resp => {
                            if (resp) {
                                this.dialogVisible = false;
                                this.initEmps();
                            }
                        })
                    }
                })
            },
            handleNodeClick(data) {
                this.inputDepName = data.name;
                this.emp.department.id = data.id;
                this.popVisible = !this.popVisible;
            },
            showDepView() {
                this.popVisible = !this.popVisible;
            },
            initPositions() {
                this.getRequest('/emp/basic/positions').then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            },
            getMaxWorkID() {
                this.getRequest("/emp/basic/maxWorkID").then(resp => {
                    if (resp) {
                        this.emp.workId = resp.data;
                    }
                })
            },
            initData() {
                if (!window.sessionStorage.getItem("nations")) {
                    this.getRequest('/emp/basic/nations').then(resp => {
                        if (resp) {
                            this.nations = resp;
                            window.sessionStorage.setItem("nations", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.nations = JSON.parse(window.sessionStorage.getItem("nations"));
                }
                if (!window.sessionStorage.getItem("joblevels")) {
                    this.getRequest('/emp/basic/joblevels').then(resp => {
                        if (resp) {
                            this.joblevels = resp;
                            window.sessionStorage.setItem("joblevels", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.joblevels = JSON.parse(window.sessionStorage.getItem("joblevels"));
                }
                if (!window.sessionStorage.getItem("politicsstatus")) {
                    this.getRequest('/emp/basic/politicsstatus').then(resp => {
                        if (resp) {
                            this.politicsstatus = resp;
                            window.sessionStorage.setItem("politicsstatus", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.politicsstatus = JSON.parse(window.sessionStorage.getItem("politicsstatus"));
                }
                if (!window.sessionStorage.getItem("deps")) {
                    this.getRequest('/emp/basic/deps').then(resp => {
                        if (resp) {
                            this.allDepts = resp;
                            window.sessionStorage.setItem("deps", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.allDepts = JSON.parse(window.sessionStorage.getItem("deps"));
                }
            },
            initEmps() {
                this.loading = true;
                this.getRequest("/emp/basic/?page=" + this.page + "&size=" + this.size + "&keyword=" + this.keyword).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.emps = resp.data;
                        this.total = resp.total;
                    }
                })
            },
            currentChange(currentPage) {
                this.page = currentPage;
                this.initEmps();
            },
            showAddEmpView() {
                this.initPositions();
                this.getMaxWorkID();
                this.dialogVisible = true;
            },
            sizeChange(currentSize) {
                this.size = currentSize;
                this.initEmps();
            }
        }
    }
</script>

<style scoped>

</style>
