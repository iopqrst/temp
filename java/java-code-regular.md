#Java 编程规范

## 说明

> 1. 所有加重标出的地方需要注意
> 2. 所有未标注“建议”的项的必须严格按照规范执行

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

+ **控制层类名**：在普通类名的基础上对其命名后加上 Controller，eg：CategoryController、CategoryAction、CategoryActivity


### 方法命名

+ 方法名都以lowerCamelCase风格编写。

+ 方法名通常是**动词**或**动词短语**。


+ junit 方法命名采用 `testXXXX` 形式命名。


#### 数据库访问层方法名 (有优先使用以下命名，不能满足对应方法再使用其他命名）

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
isExistXXX
isXXXXX
... 

``` 

### 参数命名

+ 参数名以lowerCamelCase风格编写。参数应该避免用单个字符命名。


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


+ 程序块要采用缩进风格编写，缩进的空格数为4个。说明：对于由开发工具自动生成的代码可以有不一致。（ide设置tab为4个空格）

+ 较长的语句、表达式或参数（>80字符）要分成多行书写，长表达式要在低优先级操作符处划分新行，操作符放在新行之首，划分出的新行要进行适当的缩进，使排版整齐，语句可读。

```java
if (filename != null 
    && new File(logPath + filename).length() < fileSize) {

    System.out.println("这里是代码");
}

``` 

+ 不允许把多个短语句写在一行中，即一行只写一条语句示例：如下例子不符合规范。

```java
String name = null; int age = 0;
``` 
应如下书写：

```java
String name = null; 
int age = 0;
```

+ if, for, do, while等语句的执行语句无论多少都要加括号{}。

```java
// 禁止写法
if (true) 
	System.out.println("hello java");

// 改为一下写法：
if (true) {
	System.out.println("hello java");
}
```

+ 相对独立的程序块之间、变量说明之后必须加空行。示例：如下例子不符合规范。

```java
// part 1
LivenessGroup lg = new LivenessGroup();
lg.setGroupId(3); // 查询3组
List<LivenessGroup> lgList = livenessGroupDao.queryGroupList(lg);
String whichDays = null;
String howMuchMoney = null;
Map<String, List<String>> map = new HashMap<String, List<String>>();
if(true) {
   System.out.println('逻辑');
}
```
// 改为:

```java
LivenessGroup lg = new LivenessGroup();
lg.setGroupId(3); // 查询3组
List<LivenessGroup> lgList = livenessGroupDao.queryGroupList(lg);

String whichDays = null;
String howMuchMoney = null;
Map<String, List<String>> map = new HashMap<String, List<String>>();

if(true) {
   System.out.println('逻辑');
}

```

// part 2
```java
public void method1(String param1) {
	//方法体
	int age = 0;
	int count = 0;
	userService.queryUserInfo();
}
public void method2() {
    //方法体
}
```

// 改为：
```java
public void method1(String param1) {
	//方法体
	int age = 0;
	int count = 0;

	//变量与其他逻辑方法，空行分割
	userService.queryUserInfo();
}

// 空行分割
public void method2() {
    //方法体
}

```

**方法与方法之间空行分割，方法内变量与其他逻辑空行分割, 独立的逻辑之间以空行分割（最终目的是方便阅读代码）**

+ 在两个以上的关键字、变量、常量进行对等操作时，它们之间的操作符之前、之后或者前后要加空格；进行非对等操作时，如果是关系密切的立即操作符（如.），后不应加空格。

	- 逗号、分号只在后面加空格。
```java
int a, b, c; //只为举例，禁止在实际项目中使用该方式声明变量
```
	- 比较操作符, 赋值操作符"="、 "+="， 算术操作符"+"、"%"， 逻辑操作符"&&"、"&"，位域操作符"<<"、"^"等双目操作符的前后加空格。
```java
if (current_time >= MAX_TIME_VALUE) {
	a = b + c; 
	a *= 2; 
	a = b ^ 2;
} 
```



> 采用这种松散方式编写代码的目的是使代码更加清晰。由于留空格所产生的清晰性是相对的，所以，在已经非常清晰的语句中没有必要再留空格，如果语句已足够清晰则括号内侧(即左括号后面和右括号前面)不需要加空格，多重括号间不必加空格，因为在Java语言中括号已经是最清晰的标志了。在长语句中，如果需要加的空格非常多，那么应该保持整体清晰，而在局部不加空格。给操作符留空格时不要连续留两个以上空格。

+ if、for、while、switch等与后面的括号间应加空格，使if等关键字更为突出、明显。

+ 类属性和类方法不要交叉放置，不同存取范围的属性或者方法也尽量不要交叉放置。格式：类定义

```java
public void methodA(String ... params) {
	// 类的公有属性定义
	// 类的保护属性定义
	// 类的私有属性定义
	// 类的公有方法定义
	// 类的保护方法定义
	// 类的私有方法定义
}

```
**私有方法放在所有共有方法后面**
** 虽然 IDE 格式化代码工具基本可以完成一下的排版规范, **

## 3、代码注释


+ 【重要】一般情况下，源程序有效注释量必须在30％以上。注释的原则是有助于对程序的阅读理解，在该加的地方都加了，注释不宜太多也不能太少，注释语言必须准确、易懂、简洁。

> 如何判断该不该写注释？
 
> 1、如果没有注释两个月以后你修改你的代码你能否记得， 如果能看下一条。 
> 2、如果别人修改你的代码，会不会骂你？ 如果不会，你就可以不写，否则你还是乖乖写注释。

 

** 修改参数、返回值时要相应的修改对应的注释。添加注释真正意图是帮助开发者理解程序，注释错误很有可能将开发者引向错误的方向 ，这样的注释还不如没有注释，至少不会误导开发者 。**


如：
> cid： 项目中的开发人员都知道的就无需写注释

bad 注释

```java 
// RandomUtils.java 代码片段

/**
 * 生成某个范围的随机数
 * @param start
 * @param end
 * @return
 */
public static int getRandom(int start, int end) {
	return (int) Math.round((Math.random() * (end - start) + start));
}
``` 

> 虽然添加了相应的注释，但是并没有解释清楚一些细节问题，如传入的参数是： 5，10， 返回的随机数会包含5或者10吗？
这让人很困惑，除非去看代码才能知道结果，使用者没次使用都会产生疑问，这就是一个bad注释。

good 注释

```java
/**
 * 生成某个范围内的随机数
 * 
 * @param start
 * @param end
 * @return [start, end] 包括开始结束位置
 */
public static int getRandom(int start, int end) {
	return (int) Math.round((Math.random() * (end - start) + start));
}
```
> 虽然注释里并没有解释 start 和 end , 相信使用者不会对着两个参数产生疑问。 同时也添加了使用者可能会产生疑问的注释。

bad 注释

```java
public String addOrderXXXX(String clientId, String params) {}
```

> 不加注释谁知道params什么意思，也许项目组成员知道应该是json字符串，但是属性谁又知道呢，想知道就得去看代码。
> 有时候转换json的pojo属性不一定与params中属性完全匹配，要确定属性及属性值就必须走读完代码，如果是一个复杂的逻辑，如果不是你开发的，如果是你开发的，也许你早已经忘记了。


good 注释

``` java
/**
 * 创建支付订单
 * 
 * <pre>
 * 1. 充值	
 * cid=ESd000193eaeeXseoo1&mobile=xxx&params= 
 * {
 * 	"pid": 1000,	// 必填 商品Id
 * 	"payment" : 1,	// 0：必填	支付宝，1：微信 
 *  "type": 0		// 必填 对应操作 （0.充值
 * }
 * 
 * 2. 升级vip	
 * cid=ESd000193eaeeXseoo1&mobile=xxx&params= 
 * {
 * 	"pid": 1000,	//必填
 * 	"payment" : 1,	//必填    0：支付宝，1：微信 2:银联（暂无） 3：余额支付
 *  "type": 1,		//必填
 *  "redEnvelopId": 111 //可选
 * }
 * 
 * 3. 购买产品	
 * cid=ESd000193eaeeXseoo1&mobile=xxxx&params= 
 * {
 * 	"pid": 1000,
 * 	"payment" : 1, // 0：支付宝，1：微信 2:银联（暂无） 3：余额支付 ...
 *  "type": 2
 * }
 * </pre>
 */
public String addOrderXXXX(String clientId, String params) {}

```

#### 类或接口注释, 放在 `package` 关键字之后，`class` 或者 `interface` 关键字之前。

``` java
/**
 * 客户分组记录 <简单描述，必须尤其一些实体类>
 *
 * 如果有详细内容，可以在这里详细描述一下，如果没有可以省略。
 * 
 * @author hzq
 */
```

#### 方法注释，注释主要是一句话功能简述、功能详细描述以及你需要叮嘱自己或者其他开发者的内容。

>【重要】对于难以理解或者容易忘记的参数和返回值需要表明参数的注释及返回值的信息，如果方法有接口，直接将注释写在接口中即可，无需在实现类中再次注释。

+ 注释应与其描述的代码相近，对代码的注释应放在其上方或右方（对单条语句的注释）相邻位置，不可放在下面，如放于上方则需与其上面的代码用空行隔开。

如下：

```java
/**
 * 修改负责人id
 *
 * 如果有详细内容，可以在这里详细描述一下，如果没有可以省略。
 */
public void XXXX1(String client,Integer principalId) {
	System.out.println("hello world");  //这里输出了一段话

	//这里还输入了一段代码 (这段注释上空了一行）
	System.out.println("hello java");

    /*
     * 这里是多行注释  (注释上空了一行）
     * 这里是多行注释
     * 这里是多行注释
     */
    System.out.println("hello javascript");
}

```

+ 变量的定义和分支语句（条件分支、循环语句等）必须编写注释。

> 这些语句往往是程序实现某一特定功能的关键，对于维护人员来说，**良好的注释帮助更好的理解程序，有时甚至优于看设计文档。**

+ 对于switch语句下的case语句，如果因为特殊情况需要处理完一个case后进入下一个case处理，必须在该case语句处理完、下一个case语句前加上明确的注释。

> 这样比较清楚程序编写者的意图，有效防止无故遗漏break语句。

+ 【重要】边写代码边注释，**修改代码同时修改相应的注释**，以保证注释与代码的一致性。不再有用的注释要删除。不在使用的代码要删除，你不删别人更不敢轻易删了。

+ 注释的内容要清楚、明了，含义准确，防止注释二义性。说明：错误的注释不但无益反而有害。（**修改代码时要及时修改对应的注释**）

+ 避免在注释中使用缩写，特别是不常用缩写。说明：在使用缩写时或之前，应对缩写进行必要的说明。

+ 【建议】避免在一行代码或表达式的中间插入注释。说明：除非必要，不应在代码或表达中间插入注释，否则容易使代码可理解性变差。

+ 通过对函数或过程、变量、结构等正确的命名以及合理地组织代码的结构，使代码成为自注释的。说明：清晰准确的函数、变量等的命名，可增加代码可读性，并减少不必要的注释。

+ 在代码的功能、意图层次上进行注释，提供有用、额外的信息。

> 说明：注释的目的是解释代码的目的、功能和采用的方法，提供代码以外的信息，帮助读者理解代码，防止没必要的重复注释信息。

如：

```

// 如果 asyncSucc 为真       如下注释意义不大。
if (asyncSucc) 

// 如果用户信息同步成功       而如下的注释则给出了额外有用的信息。
if (asyncSucc)

```

+ 【建议】注释应考虑程序易读及外观排版的因素，使用的语言若是中、英兼有的，建议多使用中文，除非能用非常流利准确的英文表达。

> 注释语言不统一，影响程序易读性和外观排版，出于对维护人员的考虑，建议使用中文。

+ 【强烈推荐，尤其逻辑复杂的】顺序实现流程的说明使用1、2、3、4在每个实现步骤部分的代码前面进行注释。

```java
示例：如下是对设置属性的流程注释
// 1、判断输入参数是否有效。
// 2、设置本地变量。

示例：这里主要是对闰年算法的说明。	
//1. 如果能被4整除，是闰年；	
//   1.1 巴拉巴拉
//   1.2 叭叭叭叭叭啦
//2. 如果能被100整除，不是闰年；	
//3. 如果能被400整除，是闰年。	
```

## 4、编码规范

+ 【重要】明确方法功能，精确（而不是近似）地实现方法设计。一个函数仅完成一件功能，即使简单功能也应该编写方法实现。

> 说明：虽然为仅用一两行就可完成的功能去编方法好象没有必要，但用方法可使功能明确化，增加程序可读性，亦可方便维护、测试。

+ 【重要】应明确规定对接口方法参数的合法性检查应由方法的调用者负责还是由接口方法本身负责，缺省是由方法调用者负责。

> 对于模块间接口方法的参数的合法性检查这一问题，往往有两个极端现象，即：要么是调用者和被调用者对参数均不作合法性检查，结果就遗漏了合法性检查这一必要的处理过程，造成问题隐患；要么就是调用者和被调用者均对参数进行合法性检查，这种情况虽不会造成问题，但产生了冗余代码，降低了效率。
>
> PS：这就是通常说的，我们要不相信任何调用方法的人传给你的参数，即使你自己调用自己，因为你无法保证程序不出错，所以对参数的有效性校验很有必要。常见的 `NullPointerException` 大部分都是因此导致的。

+ 【重要】明确类的功能，精确（而不是近似）地实现类的设计。一个类仅实现一组相近的功能。与该类无关的方法，不要放到该类中。

> 划分类的时候，应该尽量把逻辑处理、数据和显示分离，实现类功能的单一性。
> 示例：1. 数据类不能包含数据处理的逻辑。 

> 2. 用户上传数据的方法uploadMonitoringData() 方法 放到 用户 Service 中虽然可以实现功能，但是放到上传数据对应的 Service 中更合适。

如： 

```java
/**
 * 查询用户信息运动数据部分
 * @param clientId 用户Id
 * @return 用户运动详情
 */
public String queryClientInfoSport(Integer clientId);

/**
 * 修改用户信息运动数据部分
 * @param csport 运动实体类 
 * @return 上传运动结果
 */
public String updateClientInfoSport(ClientInfoSport csport);

```

+ 【重要】所有的数据类必须重载toString() 方法，返回该类有意义的内容。说明：父类如果实现了比较合理的toString() ，子类可以继承不必再重写。 (注：IDE一般都自带重写的快捷键）

+ 【重要】数据库操作、IO操作等需要使用结束close()的对象必须在try-catch-finally 的finally中close()。

```java

try { 
 // hello
 //  
} catch(IOException ioe) {

 // java
} finally {

	try {
 		out.close();
 	} catch (IOException ioe) {
		//... ...
 	}
}

```

+ 【重要！！】异常捕获后，如果不对该异常进行处理，则应该纪录日志或者ex.printStackTrace()。**对于重要的逻辑则需要添加对应的报警处理，如邮件或短信推送（程序已经提供了对外方法）。**

+ 当一个类有多个构造函数，或是多个同名方法，这些函数 / 方法应该按顺序出现在一起，中间不要放进其它函数 / 方法

+ 导入包的时候，import 后面不要使用通配符 * 来代替有些包的导入

+ 大括号与 if, else, for, do, while 语句一起使用，即使只有一条语句(或是空)，也应该把大括号写上

+ 不要使用组合声明，比如 int a, b;

+ 需要时才声明，并尽快进行初始化

+ 注解紧跟在文档块后面，应用于类、方法和构造函数，一个注解独占一行

## 4、其他

+ 【必须】准确地确定成员函数的存取控制符号，不是必须使用 `public` 属性的，请使用 `protected`，不是必须使用 `protected`, 请使用 `private`。  被 `private` 修饰的方法名称需要放在所有 `public` 方法后。

+ 【必须】方法命名是尽量能概括方法所做的事情，**禁止** 方法命名 与 方法内的代码无关。

+ 【建议】如果函数名超过15 个字母，可采用以去掉元音字母的方法或者以行业内约定俗成的缩写方式缩写函数名。

``` java
示例： getCustomerInformation() 改为 getCustomerInfo()
```
+ 【建议】含有集合意义的属性命名，尽量包含其复数的意义。示例：customers, orderItems。

+ 在switch 中每个 case 语句都应该包含 break 或者 return 。

+ 不要使用空的for 、if 、while 语句。

+ 在运算中不要减小数据的精度(**所有返回的数字**)。

+ switch 语句中的 case 关键字要和后面的常量保持一个空格，switch 语句中不要定义case 之外的无用标签。

+ 不要在if 语句中使用等号= 进行赋值操作。

+ 静态成员或者方法使用类名访问，不使用句柄访问。

``` java
Foo aFoo = ...;
Foo.aStaticMethod(); // good
aFoo.aStaticMethod(); // bad
somethingThatYieldsAFoo().aStaticMethod(); // very bad
```

+ 方法重载的时候，一定要注意方法名相同，避免类中使用两个非常相似的方法名。

+ 不要定义不会被用到的局部变量、类私有属性、类私有方法和方法参数

+ 把 main() 方法放在类的最后。

+ 在进行比较的时候，总是把常量放在左边。

+ 使用大写'L'表示 long 常量。

+ 不要在循环体内定义变量。

+ 尽可能的使用局部变量进行运算。


## 参考文章：

+ [Google Java编程风格指南](http://www.cnblogs.com/lanxuezaipiao/p/3534447.html)
+ [Java 开发基础规范](http://code.youmeek.com/2016/03/15/2016/03/Java-Style/)