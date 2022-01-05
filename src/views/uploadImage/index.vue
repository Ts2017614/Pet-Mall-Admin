<template>
  <div class="">
    <el-upload
      class="avatar-uploader"
      :http-request="uploadImage"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="avatar" :src="avatar" class="avatar" />
      <el-icon v-else class="el-icon-lx-add"></el-icon>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ElForm, ElMessage } from "element-plus";
import { upload } from "@/api/upload";
import { ref } from "vue";
const props = defineProps({
  avatar: {
    type: String,
    required: true
  }
});


const emit=defineEmits(['UploadcallBackUpload'])
const uploadImage = (param: any) => {
  const formData = new FormData();
  formData.append("file", param.file);
  formData.append("name", param.file.name);
  upload(formData).then((res) => {
    const img=res.data
    emit('UploadcallBackUpload',img)
  });
};
const beforeAvatarUpload = (file: any) => {
  const isJPG = file.type === "image/jpeg" || file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isJPG) {
    ElMessage.error("Avatar picture must be JPG format!");
  }
  if (!isLt2M) {
    ElMessage.error("Avatar picture size can not exceed 1MB!");
  }
  return isJPG && isLt2M;
};
</script>
<style lang="scss" scoped></style>
