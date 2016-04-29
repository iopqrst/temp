#Java 编程规范

## 说明

> d
> d
> d
> d

## 1、Java命名规范


### package（包）命名

+ 包名采用域后缀倒置的加上自定义的包名，全部采用**小写字母**, 包名中不得包含 “-” ， “_” 等其他任意连接符号。

> 包名整体结构为：域名后 + 产品名 + 模块名。
> 
> 例如： com.xxxx.mall.order (xxxx一般项目上线域名，mall为产品名，order为订单模块）


### class（类）和 interface（接口）命名

+ 类名都以 `UpperCamelCase` 风格编写，如 `OrderInformation`, `CustomerList`, `LogManager`, `LogConfig`, `SmpTransaction`。

+ 类名和接口使用类意义完整的英文描述，每个英文单词的首字母使用大写、其余字母使用小写的大小写混合法。

+ 类名通常是名词或名词短语，接口名称有时可能是形容词或形容词短语。现在还没有特定的规则或行之有效的约定来命名注解类型。

+ 测试类的命名以它要测试的类的名称开始，以`Test`结束。例如，`HashTest`或`HashIntegrationTest`。

#### 常用类命名例子：

+ **普通类名**：首字母大写，需要两个、多个单词表达的，使用大驼峰命名法进行命名，eg：CategoryService

+ **抽象类名**：在普通类名的基础上对其命名后加上 Abstract，eg：CategoryAbstract

+ **自定义异常类名**：在普通类名的基础上对其命名后加上 Exception，eg：CategoryException

+ **队列类名**：在普通类名的基础上对其命名后加上 Queue，eg：CategoryQueue

+ **后台任务类名**：在普通类名的基础上对其命名后加上 Task 或 Job，eg：CategoryTask、CategoryJob、CategoryTimer

+ **Servlet 类名**：在普通类名的基础上对其命名后加上 Servlet，eg：CategoryServlet

+ **Filter 类名**：在普通类名的基础上对其命名后加上 Filter，eg：CategoryFilter

+ **Interceptor 类名**：在普通类名的基础上对其命名后加上 Filter，eg：CategoryInterceptor

+ **工厂类名**：在普通类名的基础上对其命名后加上 Factory，eg：CategoryFactory

+ **工具类名**：在普通类名的基础上对其命名后加上 Util，eg：CategoryUtil

+ **测试类名**：在普通类名的基础上对其命名后加上 Test，eg：CategoryServiceTest

+ **数据库访问层接口类名**：在普通类名的基础上对其命名后加上 Dao，eg：CategoryDao

+ **数据库访问层实现类名**：在普通类名的基础上对其命名后加上 DaoImpl，eg：CategoryDaoImpl

+ **业务层接口类名**：在普通类名的基础上对其命名后加上 Service，eg：CategoryService

+ **业务层实现类名**：在普通类名的基础上对其命名后加上 ServiceImpl，eg：CategoryServiceImpl

+ 控制层类名：在普通类名的基础上对其命名后加上 Controller，eg：CategoryController、CategoryAction、CategoryActivity


### 方法命名

+ 方法名都以lowerCamelCase风格编写。

+ 方法名通常是**动词**或**动词短语**。


+ junit 方法命名采用 `testXXXX` 形式命名。


#### 数据库访问层方法名 (有优先使用以下命名，不能满足对应方法可以使用其他命名）

```java
addCategory()
saveCategory()
createCategory()

deleteCategoryByObject()
deleteCategoryById()
deletexxxx...

updateCategoryByObject()
updateCategoryById() 
updateXXXX....

queryCategoryList()
queryCategory()
queryXXX...

findCategoryList()
findCategoryById()
find...
```

#### 其他

```java

initXXXX
generateXXXXX
loadingXXXXX
... 

```


### 常量命名

+ 常量名命名通常为名词或名词短语，模式为 `CONSTANT_CASE`，**字母全部大写，单词用下划线分隔**。

> ps: 
> 1、什么是常量？
> 2、why not Enum ?


### 属性命名

+ 属性名使用意义完整的英文描述，通常是名词或名词短语：第一个单词的字母使用小写、剩余单词首字母大写其
余字母小写的大小写混合法(以 `lowerCamelCase` 风格编写)。属性名不能与方法名相同。

> ps ： struts2 中 对 `sName` 解析会报错（xXxxxx这个格式都有问题），改成 `sname` 即可。

** 禁止以临时变量 如 i 、j 、temp 等毫无意义的词语作为属性名称。**

在 js 中有人有以下命名方式

```js

var icount = 0;  // 数字 （int) 

var smsg  = 'hello world'; // 字符串

var oStudent = new Object(); // 对象

var aStudnet = []; // 数组

```
> java中建议不要使用这种命名方式，公司项目禁止使用这种方式命名。

#### 例如：

``` java
private String customerName;
private String orderNumber;
private int index;
```

### 方法内局部变量

+ 以lowerCamelCase风格编写，比起其它类型的名称，局部变量名可以有更为宽松的缩写。虽然缩写更宽松，但还是要避免用单字符进行命名，除了临时变量和循环变量。




## 2、排版规范


## 3、代码注释

## 4、其他

+ 订单

## 参考文章：

+ [Google Java编程风格指南](http://www.cnblogs.com/lanxuezaipiao/p/3534447.html)
+ [Java 开发基础规范](http://code.youmeek.com/2016/03/15/2016/03/Java-Style/)