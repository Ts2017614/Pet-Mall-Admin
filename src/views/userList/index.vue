<template>
  <div class="content">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-copy"></i> 权限/用户列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 内容 -->
    <div class="container">
      <div class="handle-box">
        <div class="btn">
          <el-button
            @click="addEdit()"
            class="add-button"
            type="primary"
            icon="el-icon-plus"
            >新增</el-button
          >
        </div>
        <div>
          <el-button
            @click="getDataList"
            type="primary"
            icon="el-icon-lx-refresh"
            circle
          ></el-button>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" border class="table" ref="multipleTable">
        <el-table-column
          prop="account"
          label="账号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="roleId.remark"
          label="用户"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="petsId.name"
          label="宠物店"
          align="center"
        ></el-table-column>
        <el-table-column prop="avatar" label="头像" align="center">
          <template #default="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.avatar||'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1017%2Ff2c759e6j00r13ups0057c000zk00hwm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643899751&t=2063296fba233849855204962a8a5265'"
              fit="cover"
              :preview-src-list="[scope.row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建日期" align="center">
          <template #default="scope">
            {{ $filter.formatTime(scope.row.createdAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updatedAt" label="更新日期" align="center">
          <template #default="scope">
            {{ $filter.formatTime(scope.row.updatedAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="addEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-popconfirm
              @confirm="handleDelete(scope.$index, scope.row)"
              title="Are you sure to delete this?"
            >
              <template #reference>
                <el-button type="text" icon="el-icon-delete" class="red"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <Pagination
          @changeSize="changeSize"
          @changeCurrent="changeCurrent"
          :page="page"
        />
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog
      :close-on-click-modal="false"
      v-model="dialogVisible"
      title="Tips"
      width="580px"
      :before-close="handleClose"
    >
      <div style="margin: 20px"></div>
      <el-form
        ref="menuForm"
        :rules="addRules"
        label-width="100px"
        :model="form"
      >
        <el-form-item prop="account" label="账号">
          <el-input v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="roleId" label="角色">
          <el-select
            clearable
            v-model="form.roleId"
            class="m-2"
            placeholder="选择角色"
            size="large"
          >
            <el-option
              v-for="item in roleListOption"
              :key="item._id"
              :label="item.remark"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item prop="petsId" label="宠物店">
          <el-select
            clearable
            v-model="form.petsId"
            class="m-2"
            placeholder="选择宠物店"
            size="large"
          >
            <el-option
              v-for="item in petStoreOption"
              :key="item._id"
              :label="item.name"
              :value="item._id"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item prop="status" label="状态">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </el-form-item>
        <el-form-item prop="avatar" label="上传图像">
            <UplaodImage :avatar="form.avatar" @UploadcallBackUpload="UploadcallBackUpload"></UplaodImage>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="addConfig">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, getCurrentInstance } from "vue";
import { ElForm, ElMessage } from "element-plus";
import Config from "@/settings";
// 类型
import { pageItem } from "@/components/pagination/type";
import { addRules } from "./verify";
import { tableItem, formType } from "@/type/userList";

// 接口
// import { menuList, add, detail, edit, del, treeList } from "@/api/menuList";
import { currentPage, add, edit, detail, del } from "@/api";
import { roleList, petsStoreList } from "@/api/index";
// 组件
import Pagination from "@/components/pagination/index.vue";
import UplaodImage from "@/views/uploadImage/index.vue"

//NOTE:生命周期
onMounted(() => {
  getDataList();
  getRoleList();
  getPetsStoreList();
});
// NOTE:声明变量
const tableData = ref<tableItem[]>([]); //表格
const dialogVisible = ref<boolean>(false); //弹窗
const menuForm = ref<InstanceType<typeof ElForm>>(); //表单ref
const form = ref<formType>({
  _id: null,
  account: "",
  password: "",
  username: "",
  avatar: "",
  roleId: "",
  phone: "",
  petsId: null,
  status: true
});
// 角色列表
const roleListOption = ref();
// 宠物店
const petStoreOption = ref();
const page = ref<pageItem>({
  size: 10,
  total: null,
  current: 1
});
// NOTE:声明方法
const UploadcallBackUpload=(avatar:string)=>{
  console.log(avatar,'avatar');
  form.value.avatar=avatar
}
// 列表数据,分页
const getDataList = () => {
  let { current, size } = page.value;
  currentPage(Config.isAmdin, { current, size }).then((res) => {
    // res.data.data[0].avatar =
    //   "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%3A%2F%2Fdingyue.ws.126.net%2F2021%2F1017%2Ff2c759e6j00r13ups0057c000zk00hwm.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1643899751&t=2063296fba233849855204962a8a5265";
    tableData.value = res.data.data;
    page.value.total = res.data.total;
  });
};
// 关闭弹窗
const handleClose = (done: () => void) => {
  done();
};
// 新增，编辑展示
const addEdit = (index?: number | string, row?: any) => {
  if (!row) {
    menuForm.value?.resetFields();
    form.value._id = null;
  } else {
    detail(Config.isAmdin, row._id).then((res) => {
      for (const key in form.value) {
        for (const keys in res.data) {
          if (key == keys) {
            (form.value as any)[key] = res.data[key];
          }
        }
      }
    });
  }
  dialogVisible.value = true;
};
// 新增,编辑确认
const addConfig = () => {
  menuForm.value?.validate((valid) => {
    if (valid) {
      console.log(form.value.roleId);
      const addIsEdit = form.value._id ? edit : add;
      addIsEdit(Config.isAmdin, form.value).then((res) => {
        dialogVisible.value = false;
        ElMessage.success("成功-success");
        getDataList();
      });
    }
  });
};
// 删除
const handleDelete = (index: number | string, row: any) => {
  del(Config.isAmdin, row._id).then((res) => {
    ElMessage.warning("删除成功");
    getDataList();
  });
};
// 分页器：改变条数
const changeSize = (val: number) => {
  page.value.size = val;
  getDataList();
};
// 分页器：改变页数
const changeCurrent = (val: number) => {
  page.value.current = val;
  getDataList();
};
// 角色列表
const getRoleList = () => {
  roleList().then((res) => {
    roleListOption.value = res.data;
  });
};
// 宠物店列表
const getPetsStoreList = () => {
  petsStoreList().then((res) => {
    petStoreOption.value = res.data;
  });
};
</script>
<script lang="ts">
export default {
  name: "menuList"
};
</script>
<style lang="scss" scoped>
.handle-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.add-button {
  margin-right: 10px;
}

:deep(.el-upload) {
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.el-select) {
  width: 100%;
}
</style>
