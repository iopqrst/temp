## Tomcat并发数优化，修改service.xml性能调优 增加最大并发连接数


参考文章地址：

+ [Tomcat并发数优化，修改service.xml性能调优 增加最大并发连接数](http://www.cnblogs.com/hyq0002013/p/6170074.html)

+ [Tomcat7 最大并发连接数修改方法](http://blog.csdn.net/qysh123/article/details/11678903)
### 修改运行模式

可以在控制台的启动信息里看见，默认状态下没有被打开nio配置，启动时的信息,如下： 

```
2010-2-1 12:59:40 org.apache.coyote.http11.Http11Protocol init 
信息: Initializing Coyote HTTP/1.1 on http-8080 
2010-2-1 12:59:40 org.apache.catalina.startup.Catalina load
```

修改成支持NIO的类型，配置如下：

```xml
<Connector port="8080" protocol="org.apache.coyote.http11.Http11NioProtocol"  
               connectionTimeout="20000"  
               redirectPort="8443" />
```

进行测试，被打开nio配置，启动时的信息，如下：

```
2010-2-1 13:01:01 org.apache.tomcat.util.net.NioSelectorPool getSharedSelector 
信息: Using a shared selector for servlet write/read 
2010-2-1 13:01:01 org.apache.coyote.http11.Http11NioProtocol init 
信息: Initializing Coyote HTTP/1.1 on http-8080 
```
### 修改maxThreads

打开server.xml可以看到如下配置：

``` 
<Connector port="8080" protocol="HTTP/1.1" 
               connectionTimeout="20000" 
               redirectPort="8443" /> 
```

官方文档默认说支持200

修改：

```
<Connector port="8080" protocol="HTTP/1.1"   
               connectionTimeout="20000"   
               redirectPort="8443" maxThreads="150"/>
```

在tomcat配置文件server.xml中的<Connector ... />配置中，和连接数相关的参数有： 
minProcessors：最小空闲连接线程数，用于提高系统处理性能，默认值为10 
maxProcessors：最大连接线程数，即：并发处理的最大请求数，默认值为75 
acceptCount：允许的最大连接数，应大于等于maxProcessors，默认值为100 
enableLookups：是否反查域名，取值为：true或false。为了提高处理能力，应设置为false 
connectionTimeout：网络连接超时，单位：毫秒。设置为0表示永不超时，这样设置有隐患的。通常可设置为30000毫秒。 

其中和最大连接数相关的参数为maxProcessors和acceptCount。如果要加大并发连接数，应同时加大这两个参数。 


### 大量的并发亦为之大量的服务器资源，所有需要修改JVM参数

错误提示： java.lang.OutOfMemoryError: Java heap space





## apache ab压力测试报错（apr_socket_recv: Connection reset by peer (104)）  

今天用apache 自带的ab工具测试，当并发量达到1000多的时候报错如下：

```
[root@aa~]# This is ApacheBench, Version 2.3 <$Revision: 655654 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/
 
Benchmarking 192.168.1.176 (be patient)
Completed 300 requests
Completed 600 requests
Completed 900 requests
apr_socket_recv: Connection reset by peer (104)
Total of 1085 requests completed
```
 
查看应用服务器和数据库均未报错，连接被重置，bingyi了以下，apr_socket_recv这个是操作系统内核的一个参数，在高并发的情况下，内核会认为系统受到了SYN flood攻击，会发送cookies（possible SYN flooding on port 80. Sending cookies），这样会减慢影响请求的速度，所以在应用服务武器上设置下这个参数为0禁用系统保护就可以进行大并发测试了：
```
# vim /etc/sysctl.conf 
net.ipv4.tcp_syncookies = 0
# sysctl -p
```

然后就可以超过1000个并发测试了。
 
另附其他系统内核参数说明：

``` 
net.ipv4.tcp_syncookies = 0  
#此参数是为了防止洪水攻击的，但对于大并发系统，要禁用此设置
 
net.ipv4.tcp_max_syn_backlog
#参数决定了SYN_RECV状态队列的数量，一般默认值为512或者1024，即超过这个数量，系统将不再接受新的TCP连接请求，一定程度上可以防止系统资源耗尽。可根据情况增加该值以接受更多的连接请求。
 
net.ipv4.tcp_tw_recycle
#参数决定是否加速TIME_WAIT的sockets的回收，默认为0。
 
net.ipv4.tcp_tw_reuse
#参数决定是否可将TIME_WAIT状态的sockets用于新的TCP连接，默认为0。
 
net.ipv4.tcp_max_tw_buckets
#参数决定TIME_WAIT状态的sockets总数量，可根据连接数和系统资源需要进行设置。 
```

参考：

http://www.cnblogs.com/archoncap/p/5883723.html
http://zhumeng8337797.blog.163.com/blog/static/100768914201262091634698/


## 安装ab