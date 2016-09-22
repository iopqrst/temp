== java 远程连接


1、配置服务器，添加权限

在jdk安装目录/bin目录下创建jstatd.all.policy

``` shell

grant codebase "file:${java.home}/../lib/tools.jar" {
    permission java.security.AllPermission;
};

```

2、配置到这里其实就可以直接使用（visualvm-1.png 所示， 执行垃圾回收，堆Dump等功能无法使用，无法分析类和实例）。此时执行的命令行为：

``` shell

jstatd -J-Djava.security.policy=jstatd.all.policy -p 10999（自定义的端口号） -J-Djava.rmi.server.hostname=123.xxx.xxx.xxx 

```

3、如果想要看更多内容需要在JVM启动时配置更多的选项 ， 比如 

```shell
-Djava.rmi.server.hostname=123.xxx.xxx.xxx
-Dcom.sun.management.jmxremote.port=xxxxx
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.authenticate=true
-Dcom.sun.management.jmxremote.password.file=/home/jvm-config/jmxremote.password
-Dcom.sun.management.jmxremote.access.file=/home/jvm-config/jmxremote.access
```
这里首先要将 jmxremote.password 和 jmxremote.access 配置好

这两个文件可以在 `jdk` 安装根目录 的 `jre` 根目录下`jre/lib/management`下（jmxremote.password.template 自行修改, 之所以复制到一份到指定用户目录下的原因是因为jstatd启动使用的是root账号，对应的access、password原始文件也是在对应目录下，普通用户是没有权限访问的。）

将两个文件复制到指定目录下，修改`jmxremote.password`

``` shell
monitorRole  QED
controlRole   R&D
```

修改文件后需要将文件修改归属和权限

``` shell

chmod 600 *  （关键的）
chown bxxx:bxxxx *

```

此处如果不修改的会会报 `Error: Password file read access must be restricted` 的异常。

前面是用户名，后面是登录密码，稍后查看更多信息是需要账号密码。


修改tomcat/bin目录下的catalina.sh，在一下位置添加以上配置 

``` shell

# Bugzilla 37848: only output this if we have a TTY
if [ $have_tty -eq 1 ]; then

JAVA_OPTS="-server -Xms256m -Xmx512m -XX:PermSize=128M -XX:MaxPermSize=512m
        -Djava.rmi.server.hostname=123.xxx.xxx.xxx
        -Dcom.sun.management.jmxremote.port=19999
        -Dcom.sun.management.jmxremote.ssl=false
        -Dcom.sun.management.jmxremote.authenticate=true
        -Dcom.sun.management.jmxremote.password.file=/home/jvm-config/jmxremote.password
        -Dcom.sun.management.jmxremote.access.file=/home/jvm-config/jmxremote.access
    "

```

如果有多个tomcat 只需要修改 对应端口号就好，端口号不能重复。配置好重启tomcat。等`jstatd`启动后，打开VisualVM就能访问到。


4、启动`jstatd` 


进入bin目录以后

``` shell

jstatd -J-Djava.security.policy=jstatd.all.policy -p 10999 -J-Djava.rmi.server.hostname=123.xxx.xxx.xxxx -J-Dcom.sun.management.jmxremote.ssl=false  -J-Dcom.sun.management.jmxremote.authenticate=true & （后台启动）

```

### 参考文章：

- [Java虚拟机性能管理神器 - VisualVM（6） 排查JAVA应用程序内存泄漏](http://blog.csdn.net/chwshuang/article/details/44202491)
- [利用VisualVM监视远程JVM](http://www.iteye.com/topic/1117986)




