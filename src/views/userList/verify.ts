import { rulesType } from "@/type/userList";
export const addRules: rulesType = {
  account: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur"
    }
  ],
  username: [
    {
      required: true,
      message: "请输入用户名",
      trigger: "blur"
    }
  ],
  avatar: [
    {
      required: true,
      message: "请上传用户图片",
      trigger: "change"
    }
  ],
  roleId: [
    {
      required: true,
      message: "请选择角色",
      trigger: "change"
    }
  ],
  phone: [
    {
      required: true,
      message: "请输入手机号",
      trigger: "blur",
    },
    {
      pattern: /^(?:(?:\+|00)86)?1[3-9]\d{9}$/,
      message: "请输入正确的手机号格式",
      trigger: "blur"
    }
  ],
  petsId: [
    {
      required: true,
      message: "请选择店铺",
      trigger: "blur"
    }
  ],
};
