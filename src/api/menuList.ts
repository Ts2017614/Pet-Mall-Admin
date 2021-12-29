import request from "../utils/request";
import { menuListType } from "@/type/menuList";
export const menuList = (isAdminOfPet = "admin", query: menuListType) => {
  return request({
    url: `/api/${isAdminOfPet}/customer-page`,
    method: "get",
    params: {
      ...query
    }
  });
};
