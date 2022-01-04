import request from "../utils/request";
import { menuListType } from "@/type/userList";
// 分页列表
export const userList = (isAdminOfPet = "admin", query: menuListType) => {
  return request({
    url: `/api/${isAdminOfPet}/customer-page`,
    method: "get",
    params: {
      ...query
    }
  });
};
