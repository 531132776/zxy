<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" >查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;"  @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" >
				</el-table-column>
				<el-table-column prop="logo" label="logo" sortable>
				</el-table-column>
				<el-table-column prop="name" label="名称" sortable>
				</el-table-column>
				<el-table-column prop="country" label="国家" sortable>
				</el-table-column>
				<el-table-column prop="manufacturer" label="厂商" sortable>
				</el-table-column>
				<el-table-column prop="version" label="版本" sortable>
				</el-table-column>
				<el-table-column  label="操作" sortable>
					 <template slot-scope="scope">
						<el-button
						size="mini"
						@click="handleEdit(scope.$index, scope.row)">编辑</el-button>
						<el-button
						size="mini"
						type="danger"
						@click="handleDelete(scope.$index, scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>
		<!-- 分页 -->
		  <el-col :span="24" class="toolbar">
			  <el-button type="danger" @change="allRemove" :disabled="this.sels.lenght===0">批量删除</el-button>
               <div class="block" style="float:right">
					<el-pagination
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="page.currentPage"
					:page-sizes="[10, 20, 30, 40]"
					:page-size="page.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total">
					</el-pagination>
				</div>
		  </el-col>
		
        <!--新增弹窗-->
		<el-dialog class="addForm" title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" ref="addForm">
				<el-form-item label="名称" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="国家" prop="country">
					<el-input v-model="addForm.country" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item
						v-for="(manufacturer, index) in addForm.manufacturers"
						:label="'厂商' + index"
						:key="manufacturer.key"
						:prop="'manufacturers.' + index + '.value'"
					>
					<el-input v-model="manufacturer.value"></el-input>
					<el-button @click.prevent="addDomain(index)" v-if="index > 0 ? disabled : ! disabled">添加</el-button>
					<el-button @click.prevent="removeDomain(manufacturer,index)"  v-if="index == 0 ? disabled : ! disabled">删除</el-button>
				</el-form-item>
				<el-form-item 
				        v-for="(version, index) in addForm.versions"
						:label="'版本' + index"
						:key="version.key"
						:prop="'versions.' + index + '.value'"
				        >
					<el-input v-model="version.value" auto-complete="off"></el-input>
					<el-button @click.prevent="addVersion(index)" v-if="index > 0 ? disabled : ! disabled">添加</el-button>
					<el-button @click.prevent="removeVersion(version,index)"  v-if="index == 0 ? disabled : ! disabled">删除</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog class="addForm" title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" ref="editForm" :rules="editFormRules">
				<el-form-item label="名称" prop="name">
					<el-input  v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="国家" prop="country">
					<el-input  v-model="editForm.country" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item
						v-for="(manufacturer, index) in editForm.manufacturers"
						:label="'厂商' + index"
						:key="index"
						:prop="'manufacturers.' + index + '.value'"
					>
					<el-input  v-model="manufacturer.value"></el-input>
					<el-button @click.prevent="addDomain(index)" v-if="index > 0 ? disabled : ! disabled">添加</el-button>
					<el-button @click.prevent="removeDomain(manufacturer,index)"  v-if="index == 0 ? disabled : ! disabled">删除</el-button>
				</el-form-item>
				<el-form-item 
				        v-for="(version, index) in editForm.versions"
						:label="'版本' + index"
						:key="version.value"
						:prop="'versions.' + index + '.value'"
				        >
					<el-input v-model="version.value" auto-complete="off"></el-input>
					<el-button @click.prevent="addVersion(index)" v-if="index > 0 ? disabled : ! disabled">添加</el-button>
					<el-button @click.prevent="removeVersion(version,index)"  v-if="index == 0 ? disabled : ! disabled">删除</el-button>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSave" :loading="editLoading">保存</el-button>
			</div>
		</el-dialog>
	</section>
</template>
<script>
// import { getUserList } from '../../api/api';
import all from "../../api/all.js";
//import NProgress from 'nprogress'
export default {
  data() {
    return {
      filters: {
        name: ""
      },
      total: 0, //table总数量
      page: {
        pageSize: 10,
        currentPage: 1
      },
      loading: false,
      users: [], //tableData
      sels: [], //列表选中项
      addFormVisible: false, //新增弹窗
      editFormVisible: false, //编辑弹窗
      addLoading: false,
      editLoading: false,
      //   addFormRules: {
      //     name: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      //   },
      editFormRules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        country: [{ required: true, message: "请输入国家", trigger: "blur" }],
        manufacturers: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        versions: [{ required: true, message: "请输入姓名", trigger: "blur" }]
      },
      addForm: {
        //新增form
        name: "",
        country: "",
        manufacturers: [
          {
            value: ""
          }
        ],
        versions: [
          {
            value: ""
          }
        ]
      },
      editForm: {
        //编辑form
        name: "",
        country: "",
        manufacturers: [
          {
            value: ""
          }
        ],
        versions: [
          {
            value: ""
          }
        ]
      },
      disabled: false
    };
  },
  mounted() {
    //初始化+分页
    this.loading = true;
    all
      .carBrand(this.page)
      .then(res => {
        //    console.log(res)
        this.total = res.total;
        this.loading = false;
        for (let i = 0; i < res.data.length; i++) {
          this.users.push(res.data[i]);
          this.total = res.total;
        }
      })
      .catch(err => {
        console.log(err);
        this.$message.error("房东剪网线了！");
      });
  },
  methods: {
    //分页
    handleSizeChange(size) {
      // console.log(`每页 ${size} 条`);
      this.page.pageSize = size;
      all
        .carBrand(this.page)
        .then(res => {
          console.log(this.page.pageSize);
          this.total = res.total;
          this.users = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //当前页
    handleCurrentChange(currentPage) {
      // console.log(`当前页: ${currentPage}`);
      this.page.currentPage = currentPage;
      all
        .carBrand(this.page)
        .then(res => {
          this.total = res.total;
          this.users = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //全选
    handleSelectionChange(sels) {
      this.sels = sels;
      console.log(this.sels);
    },
    //选中单个
    handleCheckedCitiesChange(checkbox) {
      // console.log(val[0].id)
    },
    //批量删除
    allRemove(id) {
      console.log(id);
    },

    //编辑
    handleEdit(index, row) {
      this.editFormVisible = true;
      let manufacturers = row.manufacturers.map((v, i) => ({ value: v }));
      let versions = row.versions.map((v, i) => ({ value: v }));
      this.editForm = Object.assign({}, row, { manufacturers, versions });
      // console.dir(this.editForm);
		},
		
    //编辑保存
    editSave() {
      this.$refs["editForm"].validate(valid => {
        console.log(valid);
        if (valid) {
          this.$confirm("确定提交吗", "提示", {})
            .then(() => {
              // debugger
              this.editLoading = true;
              var pare = Object.assign({}, this.editForm);
              console.log(pare);
              var msParam = [];
              var msData = this.editForm.manufacturers;
              for (var i = 0; i < msData.length; i++) {
                msParam.push(msData[i].value);
              }

              var vsParam = [];
              var vsData = this.editForm.versions;
              for (var i = 0; i < vsData.length; i++) {
                vsParam.push(vsData[i].value);
              }

              var data = {
                manufacturers: msParam,
                name: this.editForm.name,
                country: this.editForm.country,
                versions: vsParam,
                id: pare.id
              };
              all
                .updateBrand(data)
                .then(res => {
                  this.$message({
                    message: "编辑成功",
                    type: "success"
                  });
                  this.$refs["editForm"].resetFields();
                  this.editFormVisible = false;
                  this.editLoading = false;
                  this.seach();
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    //删除当前项
    handleDelete: function(index, row) {
      var parm = {
        id: row.id
      };
      all
        .deleteBrand(parm)
        .then(res => {
          this.seach();
          if (res.success == true) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
          }
        })
        .catch(err => {
          this.$message.error("网费已欠费");
        });
    },
    //新增
    handleAdd: function() {
      this.addFormVisible = true;
    },

    //新增弹窗~添加厂商+编辑弹窗~添加厂商
    addDomain: function(index) {
      //   console.log(index);
      this.addForm.manufacturers.push({
        value: "",
        key: Date.now()
      });
      this.editForm.manufacturers.push({
        value: "",
        key: Date.now()
      });
      //   console.log(aa);
    },
    //新增弹窗~删除厂商+编辑弹窗~删除厂商
    removeDomain(item, index) {
      let addfoo = this.addForm.manufacturers.indexOf(item);
      let editfoo1 = this.editForm.manufacturers.indexOf(item);
      if (addfoo != -1 && index != 0) {
        this.addForm.manufacturers.splice(index, 1);
      }
      if (editfoo1 != -1 && index != 0) {
        this.editForm.manufacturers.splice(index, 1);
      }
    },
    //新增弹窗~添加版本+编辑弹窗~添加版本
    addVersion: function(index) {
      this.addForm.versions.push({
        value: "",
        key: Date.now()
      });
      this.editForm.versions.push({
        value: "",
        key: Date.now()
      });
    },
    //新增弹窗~删除版本+编辑弹窗~删除版本
    removeVersion(item, index) {
      let addfoo1 = this.addForm.versions.indexOf(item);
      let editfoo1 = this.editForm.versions.indexOf(item);
      if (addfoo1 != -1 && index != 0) {
        this.addForm.versions.splice(index, 1);
      }
      if (editfoo1 != -1 && index != 0) {
        this.editForm.versions.splice(index, 1);
      }
    },
    //新增
    addSubmit: function(index) {
      var msParam = [];
      var msData = this.addForm.manufacturers;
      for (var i = 0; i < msData.length; i++) {
        msParam.push(msData[i].value);
      }

      var vsParam = [];
      var vsData = this.addForm.versions;
      for (var i = 0; i < vsData.length; i++) {
        vsParam.push(vsData[i].value);
      }

      let data = {
        manufacturers: msParam,
        name: this.addForm.name,
        country: this.addForm.country,
        versions: vsParam
      };
      all
        .insertBrand(data)
        .then(res => {
          this.addFormVisible = false;
          this.seach();
        })
        .catch(err => {
          console.log(err);
        });
    },

    //查询
    seach() {
      all
        .carBrand(this.page)
        .then(res => {
          this.total = res.total;
          this.users = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
    //性别显示转换
    // formatSex: function (row, column) {
    // 	return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
    // },
    //获取用户列表
    // getUser: function () {
    // 	let para = {
    // 		name: this.filters.name
    // 	};
    // 	this.loading = true;
    // 	//NProgress.start();
    // 	getUserList(para).then((res) => {
    // 		this.users = res.data.users;
    // 		this.loading = false;
    // 		//NProgress.done();
    // 	});
    // }
  }
};
</script>

<style scoped>
.addForm .el-input {
  width: 70%;
  margin-right: 15px;
}
</style>