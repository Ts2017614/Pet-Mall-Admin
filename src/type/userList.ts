export interface menuListType {
  current: number | string;
  size: number | string;
  name?:string
}
// 规则类型
type rulestrigger = "blur" | "change";
export interface rulesConfig {
  required?: boolean;
  message?: string;
  trigger?: rulestrigger;
  pattern?: RegExp;
}
export interface rulesType<T = rulesConfig> {
  account: Array<T>;
  password: Array<T>;
  username: Array<T>;
  avatar?: Array<T>;
  roleId?: Array<T>;
  phone?: Array<T>;
  petsId?: Array<T>;
}

// 表格
export interface PetsId {
  _id?: string;
  name?: string;
  imgUrl?: string;
  address?: string;
  longitude?: number;
  latitude?: number;
  phone?: string;
  detail?: string;
  email?: string;
  is_delete?: boolean;
  status?: boolean;
  verify?: number;
  tags?: string[];
  dailyHours?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  __v: number;
  adminId: string;
}
export interface tableItem {
  _id: string;
  account: string;
  password: string;
  username: string;
  avatar: string;
  roleId: string;
  phone: string;
  password_salt?: string;
  petsId?: PetsId;
  status: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
// 表单类型(和表单类型相似,也可以直接用表单类型)
export interface formType {
  _id:null|string
  account: string
  password: string
  username: string
  avatar: string
  roleId: string
  phone: string
  petsId: any
  status?:Boolean
}
