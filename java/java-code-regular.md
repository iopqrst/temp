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



## 3、代码注释


## 4、编码规范

+ 【重要】明确方法功能，精确（而不是近似）地实现方法设计。一个函数仅完成一件功能，即使简单功能也应该编写方法实现。

> 说明：虽然为仅用一两行就可完成的功能去编方法好象没有必要，但用方法可使功能明确化，增加程序可读性，亦可方便维护、测试。

+ 【重要】应明确规定对接口方法参数的合法性检查应由方法的调用者负责还是由接口方法本身负责，缺省是由方法调用者负责。

> 对于模块间接口方法的参数的合法性检查这一问题，往往有两个极端现象，即：要么是调用者和被调用者对参数均不作合法性检查，结果就遗漏了合法性检查这一必要的处理过程，造成问题隐患；要么就是调用者和被调用者均对参数进行合法性检查，这种情况虽不会造成问题，但产生了冗余代码，降低了效率。
>
> PS：这就是通常说的，我们要不相信任何调用方法的人传给你的参数，即使你自己调用自己，因为你无法保证程序不出错，所以对参数的有效性校验很有必要。常见的 `NullPointerException` 大部分都是因此导致的。

+ 【重要】明确类的功能，精确（而不是近似）地实现类的设计。一个类仅实现一组相近的功能。与该类无关的方法，不要放到该类中。

> 划分类的时候，应该尽量把逻辑处理、数据和显示分离，实现类功能的单一性。
> 示例：1. 数据类不能包含数据处理的逻辑。 2. 用户上传数据的方法uploadMonitoringData() 方法 放到 用户 Service 中虽然可以实现功能，但是放到上传数据对应的 Service 中更合适。 

具体参考：bad_code.md中的代码说明

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

+ 【重要！！】异常捕获后，如果不对该异常进行处理，则应该纪录日志或者ex.printStackTrace()。对于重要的逻辑则需要添加对应的报警处理，如邮件或短信推送（程序已经提供了对外方法）。

## 4、其他

+ 【必须】准确地确定成员函数的存取控制符号，不是必须使用 `public` 属性的，请使用 `protected`，不是必须使用 `protected`, 请使用 `private`。  被 `private` 修饰的方法名称需要放在所有 `public` 方法后。

+ 【必须】方法命名是尽量能概括方法所做的事情，**禁止** 方法命名 与 方法内的代码无关。

+ 【建议】如果函数名超过15 个字母，可采用以去掉元音字母的方法或者以行业内约定俗成的缩写方式缩写函数名。

``` java
示例： getCustomerInformation() 改为 getCustomerInfo()
```
+ 【建议】含有集合意义的属性命名，尽量包含其复数的意义。示例：customers, orderItems。

## 4、编程实践 （未完成）

+ @Override：能用则用

+ 捕获的异常：不能忽视

+ 静态成员：使用类进行调用 

``` java
Foo aFoo = ...;
Foo.aStaticMethod(); // good
aFoo.aStaticMethod(); // bad
somethingThatYieldsAFoo().aStaticMethod(); // very bad
```


























不符合规范的注释

```java
/**查询用户信息运动数据部分**/
public String queryClientInfoSport(Integer clientId);

/**修改用户信息运动数据部分**/
public String updateClientInfoSport(ClientInfoSport csport);

```

修改为：

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




``` java

public String queryUserManageClient(String clientIds) {
	if (StringUtils.isEmpty(clientIds)) {
		return "";
	}
	// 查询当前管理客户的用户
	List<ClientVsUserExtend> lstManageUser = clientVsUserDao
			.queryClientVsUser(clientIds);
	JSONObject json = new JSONObject();
	JSONArray manageJa = new JSONArray();

	String[] cidStr = clientIds.split(",");

	// 获取管理健康管理师
	Integer hmRoleId = Integer.parseInt(CrmURLConfig
			.getString("role_type_health_manger"));
	// 获取管理医生
	Integer docRoleId = Integer.parseInt(CrmURLConfig
			.getString("role_type_doctor"));
	// 代理商角色id
	Integer agentRoleId = Integer.parseInt(CrmURLConfig
			.getString("role_type_agent"));
	// 名医
	Integer fdocRoleId = Integer.parseInt(CrmURLConfig
			.getString("role_famous_doctor"));
	// 助理医师
	Integer medRoleId = Integer.parseInt(CrmURLConfig
			.getString("role_mediastinus"));
	// 市场支持
	Integer msRoleId = Integer.parseInt(CrmURLConfig
			.getString("role_market_support"));
	
	Integer chmRoleId = Integer.parseInt(CrmURLConfig
			.getString("common_health_manager"));
	Integer cdocRoleId = Integer.parseInt(CrmURLConfig
			.getString("common_doctor"));
	Integer cfdocRoleId = Integer.parseInt(CrmURLConfig
			.getString("common_famous_doctor"));
	Integer cmedRoleId = Integer.parseInt(CrmURLConfig
			.getString("common_mediastinus"));
	Integer cmsRoleId = Integer.parseInt(CrmURLConfig
			.getString("common_market_support"));

	if (!CollectionUtils.isEmpty(lstManageUser)) {

		// 查询可以分配管理客户的用户
		List<UserInfo> lstUser = null;
		// 医馆部管理员管理
		int userCount = 0;
		// 医馆部管理客户信息
		Map<Integer, String> mapUserClient = new HashMap<Integer, String>();

		// 代理商自己人管理
		int agentCount = 0;
		// 代理商自己管理客户信息
		Map<Integer, String> mapAgentClient = new HashMap<Integer, String>();

		// 自己管理客户的代理商信息
		List<Integer> lstAgentId = new ArrayList<Integer>();
		String createUserChain = "";

		List<Integer> lstUserId = new ArrayList<Integer>();
		for (String clientId : cidStr) {
			Integer cid = Integer.parseInt(clientId);
			// 查询是否有代理商
			ClientVsUserExtend agentUser = new ClientVsUserExtend();
			for (ClientVsUserExtend user : lstManageUser) {
				Integer thisCid = user.getClientId();
				String cname = user.getClientName();
				String cmobile = user.getClientMobile();
				if (thisCid.equals(cid)) {
					Integer roleId = user.getRoleId();
					Integer userId = user.getUserId();

					if (roleId == agentRoleId) {
						agentUser = user;
					} else {
						if (cidStr.length == 1
								&& CollectionUtils.isEmpty(lstUserId)
								|| !CollectionUtils.isEmpty(lstUserId)
								&& !lstUserId.contains(userId)) {

							JSONObject jo = new JSONObject();
							jo.put("userId", user.getUserId());
							jo.put("name", user.getName());
							jo.put("roleId", user.getRoleId());

							manageJa.add(jo.toString());
						}
					}
					String name = StringUtils.isEmpty(cname) ? cmobile
							: cname;
					if (agentUser == null
							|| (agentUser != null && agentUser
									.getIsSelfManage() == UserInfo.SELF_MANAGE_NO)) {
						if (CollectionUtils.isEmpty(mapUserClient)
								|| (!CollectionUtils.isEmpty(mapUserClient) && !mapUserClient
										.containsKey(cid))) {
							userCount += 1;
							mapUserClient.put(cid, name);
						}
					} else {
						if (CollectionUtils.isEmpty(mapAgentClient)
								|| (!CollectionUtils
										.isEmpty(mapAgentClient) && !mapAgentClient
										.containsKey(cid))) {
							agentCount += 1;
							mapAgentClient.put(cid, name);
							agentCount += 1;
						}

						Integer agentId = agentUser.getUserId();
						if (CollectionUtils.isEmpty(lstAgentId)
								|| (!CollectionUtils.isEmpty(lstAgentId) && !lstAgentId
										.contains(agentId + ","))) {
							lstAgentId.add(agentId);
						}
						createUserChain = agentUser.getCreateUserChain();
					}
				}
			}
		}

		json.put("lstManageUser", manageJa.toArray());

		JSONObject jo = new JSONObject();
		if (userCount > 0 && agentCount > 0) {
			if (userCount > agentCount) {
				jo.put("type", 1);
				jo.put("name", getClientNames(mapUserClient));
				return jo.toString();
			} else {
				jo.put("type", 2);
				jo.put("name", getClientNames(mapAgentClient));
				return jo.toString();
			}
		} else {
			if (agentCount > 0) {
				if (!CollectionUtils.isEmpty(lstAgentId)
						&& lstAgentId.size() > 1) {
					jo.put("type", 3);
					return jo.toString();
				} else {
					String roleIds = chmRoleId + "," + cdocRoleId + ","
							+ cfdocRoleId + "," + cmedRoleId + ","
							+ cmsRoleId;
					lstUser = userInfoDao.queryUserInfo(createUserChain,
							roleIds);
				}
			} else {
				String roleIds = hmRoleId + "," + docRoleId + ","
						+ fdocRoleId + "," + medRoleId + "," + msRoleId;
				lstUser = userInfoDao.queryUserInfo(null, roleIds);
			}
		}
		
		JSONArray hmJa = new JSONArray();
		JSONArray docJa = new JSONArray();
		JSONArray fdocJa = new JSONArray();
		JSONArray medJa = new JSONArray();
		JSONArray msJa = new JSONArray();
		
		if (!CollectionUtils.isEmpty(lstUser)) {
			for (UserInfo user : lstUser) {
				JSONObject ujo = new JSONObject();
				ujo.put("userId", user.getId());
				ujo.put("name", user.getName());
				ujo.put("roleId", user.getRoleId());
				ujo.put("createUserChain", user.getCreateUserChain());
				Integer roleId = user.getRoleId();
				
				if(roleId.equals(hmRoleId) || roleId.equals(chmRoleId)){
					hmJa.add(ujo.toString());
				}else if(roleId.equals(docRoleId) || roleId.equals(cdocRoleId)){
					docJa.add(ujo.toString());
				}else if(roleId.equals(fdocRoleId) || roleId.equals(cfdocRoleId)){
					fdocJa.add(ujo.toString());
				}else if(roleId.equals(medRoleId) || roleId.equals(cmedRoleId)){
					medJa.add(ujo.toString());
				}else if(roleId.equals(msRoleId) || roleId.equals(cmsRoleId)){
					msJa.add(ujo.toString());
				}
			}
			
			json.put("hmUser", hmJa.toArray());
			json.put("docUser", docJa.toArray());
			json.put("fdocUser", fdocJa.toArray());
			json.put("medUser", medJa.toArray());
			json.put("msUser", msJa.toArray());
		}
	}
	System.out.println(json.toString());
	return json.toString();
}

```
+ 订单

## 参考文章：

+ [Google Java编程风格指南](http://www.cnblogs.com/lanxuezaipiao/p/3534447.html)
+ [Java 开发基础规范](http://code.youmeek.com/2016/03/15/2016/03/Java-Style/)