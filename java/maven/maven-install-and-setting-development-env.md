
## maven 安装

### 从官网下载maven版本（3.0以上版本，注意各个版本依赖的软件不同，比如jdk）

+ 解压maven文件到任意盘,配置maven环境变量

```
//添加系统变量
M2_HOME ： C:\java-dev\apache-maven-3.2.5

//在系统变量path后添加
;%M2_HOME%\bin

```

![maven 环境变量1](https://github.com/iopqrst/temp/blob/master/java/maven/enveriment-var-1.png)
![maven 环境变量2](https://github.com/iopqrst/temp/blob/master/java/maven/enveriment-var-2.png)
 

## maven 配置 

### 修改maven本地仓库的存储位置

```
<localRepository>D:/java-dev/maven-repo/repository</localRepository>

```

### 配置从私有仓库获取文件(私有仓库搭建参考另外文章）

#### 方式一: 配置以后可以不用在每个对应pom文件中做相应配置即可是全局都访问私有仓库

```
<!--maven/config/setting.xml-->
<mirror>
	<id>central</id>
	<mirrorOf>*</mirrorOf>
	<name>Human Readable Name for this Mirror.</name>
	<url>http://192.168.1.114:8888/nexus/content/groups/public/</url>
</mirror>

<!--上面mirror已经配置地址，这里只要声明就好-->

<profile>
	<id>my-central-repos</id>
	<repositories>
		<repository>
			<id>central</id>
			<name>Central Repository</name>
			<url>http://whatever</url>
			<!--
			<releases><enable>true</enable></releases>
			<snapshots><enabled>true</enabled></snapshots>
			-->
		</repository>
	</repositories>
</profile>


<!-- active customer settings -->
<activeProfiles>
	<activeProfile>my-central-repos</activeProfile>
</activeProfiles>

```

#### 方式二: 为单个项目设置

```
<!--修改pom.xml文件-->

<repositories>
    <!-- 公司服务器仓库 -->
    <repository>
        <id>nexus</id>
        <name>BSK Repository</name>
        <url>http://192.168.1.114:8888/nexus/content/groups/public/</url>
        <layout>default</layout>
        <releases>
            <enabled>true</enabled>
        </releases>
        <snapshots>
            <enabled>true</enabled>
        </snapshots>
    </repository>
</repositories>

```

#### 修改配置，使项目可以发布SNAPSHOTS 和 RELEASES

```
<!--maven/config/setting.xml-->

<server>
  <id>user-snapshots</id>
  <username>xxxxx</username>
  <password>xxxx</password>
</server>

<server>
  <id>user-releases</id>
  <username>xxxxx</username>
  <password>xxxxx</password>
</server>


<!--修改项目的pom文件-->

<distributionManagement>
    <snapshotRepository>
        <id>user-snapshots</id>
        <name>PROJECT SNAPSHOTS</name>
        <url>http://192.168.1.114:8888/nexus/content/repositories/snapshots/</url>
    </snapshotRepository>

    <repository>
        <id>user-releases</id>
        <name>PROJECT RELEASES</name>
        <url>http://192.168.1.114:8888/nexus/content/repositories/releases/</url>
    </repository>
</distributionManagement>

```