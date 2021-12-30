import { rulesType } from "@/type/menuList";
export const addRules: rulesType = {
  name: [
    {
      required: true,
      message: "请输入菜单标题",
      trigger: "blur"
    }
  ],
  url: [
    {
      required: true,
      message: "请输入路由地址",
      trigger: "blur"
    }
  ],
  router: [
    {
      required: true,
      message: "请输入组件路径",
      trigger: "blur"
    }
  ],
};
