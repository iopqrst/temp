# XXXX项目代码规范


## test 包命名

## test 方法命名

## xtgg 项目的vo bo 说明

## 解释vo bo 

## 方法重载的使用

## svn 提交规范
## UTF-8 环境


## 一个service类中只能调用其他Service 或者 自己的Dao ，不能越过其他Service,掉用dao. 

比如 ： ClientInfoService中有用到添加积分的逻辑

此时不能在ClientInfoService中直接调用ScoreDao.add方法，需要通过ScoreService调用add

1. 避免代码混乱
2. 

