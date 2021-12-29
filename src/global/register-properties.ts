import { App } from "vue";
import timeFun from "@/utils/data-format";
// 类型补充声明
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $filter: any;
  }
}
export default function registerProperties(app: App) {
  app.config.globalProperties.$filter = {
    formatTime(value: string) {
      return timeFun.formatUtcString(value);
    }
  };
}
