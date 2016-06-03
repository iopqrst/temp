## 参考文章

- [Apache如何提高并发连接请求数量](http://lijitaoccnu.iteye.com/blog/1948448)
- [Apache优化：修改最大并发连接数](http://www.365mini.com/page/apache-concurrency-configuration.htm)
- [Apache Prefork、Worker和Event三种工作模式分析 ](http://blog.chinaunix.net/xmlrpc.php?r=blog/article&uid=17238776&id=4327998)
- [Apache和Nginx运行原理解析](http://www.server110.com/nginx/201402/6543.html)


``` shell

# 查看进程中httpd进程的数量

ps -ef | grep httpd | wc -l

```

###　查看apache内部使用何种MPM模块

> 进入Apache安装目录\bin，然后键入命令httpd -l

```
[bxxxe@iZ25n44qciiZ bin]$ 
[bxxxe@iZ25n44qciiZ bin]$ httpd -l
Compiled in modules:
  core.c
  mod_so.c
  http_core.c
  prefork.c   <-- here
```

### 启用MPM模块配置文件

```
# 修改httpd.conf

# Server-pool management (MPM specific)
Include conf/extra/httpd-mpm.conf (去掉该行前面的注释符号"#")

# 为什么我的默认就是打开的呢？ 估计是版本的原因

```

### 修改对应MPM模块

```
# prefork MPM
# StartServers: number of server processes to start
# MinSpareServers: minimum number of server processes which are kept spare
# MaxSpareServers: maximum number of server processes which are kept spare
# MaxRequestWorkers: maximum number of server processes allowed to start
# MaxConnectionsPerChild: maximum number of connections a server process serves
#                         before terminating
<IfModule mpm_prefork_module>
    ServerLimit            1000  #服务连接数最大限制（不设置默认为256，对应MaxRequestWorkers的值）
    StartServers             20  #推荐设置：小=默认 中=20~50 大=50~100
    MinSpareServers          20  #推荐设置：与StartServers保持一致
    MaxSpareServers          50  #推荐设置：小=20 中=30~80 大=80~120
    MaxRequestWorkers      1000  #推荐设置：小=500 中=500~1500 大型=1500~3000
    MaxConnectionsPerChild  200  #推荐设置：小=500 中=500~1500 大型=1500~3000
</IfModule>
```



