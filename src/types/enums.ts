// 最大用户数
// 由于 api 最大 pageSize 就是 100
export const MAX_USER_COUNT = 100

// 每个用户允许的数据最大保存数量
export const MAX_NOTE_COUNT = 1000

// 数据存储
// 本地使用数据类型与 issue 对应的类型
// 直接使用 github 默认的 label 进行映射
export enum DataLabels {
  // 用户数据
  User = 'wontfix',
}
