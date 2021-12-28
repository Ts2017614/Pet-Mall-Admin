export interface menuListType {
  current: number | string
  size: number | string
}
// 规则类型
type rulestrigger = "blur" | "change"
export interface rulesConfig {
  required?: boolean
  message?: string
  trigger?: rulestrigger
  pattern?:RegExp
}
export interface rulesType<T = rulesConfig> {
  name:Array<T>
  url:Array<T>
  router:Array<T>
  parentIdName:Array<T>
}
