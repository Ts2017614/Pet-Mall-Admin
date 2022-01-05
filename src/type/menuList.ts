// 规则类型
type rulestrigger = "blur" | "change";
export interface rulesConfig {
  required?: boolean;
  message?: string;
  trigger?: rulestrigger;
  pattern?: RegExp;
}
export interface rulesType<T = rulesConfig> {
  name: Array<T>;
  url: Array<T>;
  router: Array<T>;
  parentIdName?: Array<T>;
}
// 表格列类型
export interface tableItem {
  _id?: string;
  name?: string;
  parentId?: string;
  icon?: string;
  router?: string;
  url?: string;
  is_delete?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  children?: any[];
}

// 表单类型(和表单类型相似,也可以直接用表单类型)
export interface formType{
  _id:null|string
  name: string
  url: string
  router: null|string
  type?:number
  icon?: string
  parentId: null|string
  parentIdName?: string
}
