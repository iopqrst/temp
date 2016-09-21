# 项目代码规范（内部）

---

## 关于注释掉的代码

+ 没用的代码就删掉，不要注释。 如果你觉得有用，可以查看svn的历史记录。如果SVN没有记录，自己保存这部分代码。


## 所有的类都要求有注释

## 关于测试类

### service 的方法要求有对应的测试类

### test 包命名

+ 按照service所在包命名，测试类名为“接口名+Test”

### test 方法命名

例如：为TeacherService创建测试类，TeacherService所有包为

```java
com.xtgg.demo.service.teacher;

public interface TeacherService {
	
	Teacher add(Teacher teacher);
    List<Teacher> queryTeacherList(Teacher teacher);

}

// test 对应的测试包名和类为：

com.xtgg.demo.service.teacher;

public class TeacherServiceTest {
	
	@Test
	public void testAdd() {
		// ......
	}
	
	@Test
    public void testQueryTeacherList() {
		// ......
	}

}
```

## xtgg 项目的vo bo 说明

> vo bo 使用与网上大部分说明有些出入，鉴于项目已经运行很久就不再按照网上说的介绍修改。

+ 解释vo bo

> vo 实体类； bo 业务对象（数据传输）


## 方法重载的使用

+ 不要忘记有一个功能叫做重载

+ 代码示例1 （JsonUtils.java)

```java

/**
 * 将JSONObject对象转化为JAVA对象
 * @param jsonObject
 * @param pojoCalss
 * @return
 */
public static Object getObject4JsonObject(JSONObject jsonObject, Class pojoCalss) {
	return getObject4JsonObject(jsonObject, pojoCalss,null);
}

/**
 * 将JSONObject对象转化为JAVA对象
 * @param jsonObject
 * @param pojoCalss
 * @param format
 * @return
 */
public static Object getObject4JsonObject(JSONObject jsonObject, Class 	pojoCalss,String format) {

	if(null == jsonObject) return null;
	
	if(format == null){
		format = JsonUtils.LONG_DATE_PATTERN;
	}
	
	Object pojo;
	JSONUtils.getMorpherRegistry().registerMorpher( new MyDateMorpher(new String[] { format }), true);  
	pojo = JSONObject.toBean(jsonObject, pojoCalss);
	JSONUtils.getMorpherRegistry().deregisterMorpher( new MyDateMorpher(new String[] { format }));  
	return pojo;
}

```

+ 代码示例2 （BaseDaoImpl.java)

```java

public List executeNativeQuery(String sql, Object[] args) {
	return executeNativeQuery(sql, null, null, args, null);
}

public List executeNativeQuery(String sql, Map entities, Object[] args) {
	return executeNativeQuery(sql, entities, null, args, null);
}

public List executeNativeQuery(String sql, Object[] args, Class aliasBean) {
	return executeNativeQuery(sql, null, null, args, aliasBean);
}

public List executeNativeQuery(String sql, Map entities, Map scalars,
		Object[] args, Class aliasBean) {
	
	// 真正处理的代码
}

```

## svn 提交规范

### svn 分支命名 

> -项目名-yyMMdd[-功能描述(可有可无)] 
> 例如：mall-160704-api 、doctor-160704-huanxin、doctor-160704等等
  
### 其他注意事项

+ 开发新功能和修改bug禁止直接在trunk上修改

+ 提交代码按照模块提交，并写明提交代码修改内容。

+ 不再使用的分支不要删除，将分支改为: 分支名称.bak 

> 如： 1. 添加删除用户功能 2. 修改前台不能显示vip bug。

上面的代码最好提交两次，删除用户功能的代码提交一次，修改bug的代码提交一次。


** 为什么要分模块分功能提交？ ** 

方面在svn记录里查看代码和回滚代码。（没有注释都不知道提交的什么，有注释以后直接看注释就知道提交内容,所以注释一定要能简洁并能概括提交的内容）


## 开发环境和文件编码统一设置为 : UTF-8


包括（*.jsp、*.java、*.properties等文件）


## service类中只能调用其他Service 或者 自己的Dao ，不能越过其他Service,掉用dao.


比如 ： ClientInfoService中有用到添加积分的逻辑

此时不能在ClientInfoService中直接调用ScoreDao.add方法，需要通过ScoreService调用add

1. 避免代码混乱
2. 为以后扩展做准备

> ps 网上的说法有很多，有的人说无所谓在那个service调用dao，有的则建议只能通过serviced“间接”调用另外一个service。至于各自的理由大家自己搜去。


## 目录结构介绍

+ 所有文件目录必须采用“驼峰”命名。

> 如： mp/clientMedal、mp/onlineSubscribe、cp/resourceDownload等等。

+ jsp、properties等文件采用小写字母，单词与单词之间用 "_" 分隔。

> 如：cp/agentUser/agent_add.jsp、cp/agentUser/agent_list.jsp等


## 其他


## 字符串过多是拼接使用： StringBuffer