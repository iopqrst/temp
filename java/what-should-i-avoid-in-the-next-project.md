## 下一个项目我应该避免的问题


1、sign + token 的设计 （接口不是永久有效，过期 +　敏感信息加密）
2、自增主键（用户信息用自增的其实不太好）
3、用户密码要加盐值（manage项目的实现）
4、规定接口返回值规范，如string的为空时返回“”而不是null, 数组类型的数据为空时也要返回[]等等
5、每个“大”版本对数据库、各端代码进行备份，保证可以正常运行。（后期回顾版本时可以作为回忆的一部分）




## android 

1. 必须有一个请求检查更新的接口（该接口会在每次打开软件app的时候请求），返回一些全局配置，最好有时间信息，前台可以根据时间来判断是否要启用新的策略。或者缓存什么信息。

2. 有些接口返回的数据是常量数据，前台可以保存在本地，每次接口请求的时候根据时间返回该时间以后修改的数据。如果没有数据返回表明数据没有发生变化。
