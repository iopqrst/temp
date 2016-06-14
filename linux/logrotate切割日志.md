## 参考文章

[- Linux日志文件总管——logrotate](https://linux.cn/article-4126-1.html)
[- 简单好用的日志管理工具 logrotate](http://www.cnblogs.com/futeng/p/4785206.html)
[-使用logrotate分割tomcat日志](http://www.52os.net/articles/using-logrotate-manage-tomcat-logs.html)

## logrotate 是做什么的?

自动对日志进行截断（或轮循）、压缩以及删除旧的日志文件。例如，你可以设置logrotate，让/var/log/foo日志文件每30天轮循，并删除超过6个月的日志。配置完后，logrotate的运作完全自动化，不必进行任何进一步的人为干预。

## 为什么会使用logrotate ?

> 服务器监控系统报警，内存占用超过80%，分析各个程序所占内存综合远远不到80%，一直很郁闷，不知什么原因导致内存在短时间内上升如此快。某天整理项目文件目录时发现Tomcat日志文件很大，将项目日志备份移动到其他目录后，发现内存明显下降，很快恢复到暴涨之前的水平。


## 安装logrotate

+ 首先需要确认一下系统是否已经安装了logrotate（centos6.5默认已经安装,也许是aliyun给安装的）

```shell

logrotate -v

## 是不是表示已经安装？！
logrotate 3.7.8 - Copyright (C) 1995-2001 Red Hat, Inc.

```

使用 yum 安装：

``` shell
yum install logrotate crontabs
```

+ 安装后的文件及目录

	- /usr/sbin/logrotate 程序所在位置；
	- /etc/cron.daily/logrotate 默认让Cron每天执行logrotate一次；
	- /etc/logrotate.conf 全局配置文件；
	- /etc/logrotate.d 应用自个的配置文件存放目录，覆盖全局配置；


## 配置

+ 短短的

+ 点点滴滴



## logroate 参数说明

``` shell

参数名称    含义
compress                 通过gzip 压缩转储以后的日志
nocompress               不压缩转储
copytruncate             打开中的日志转储
copytruncate             打开中的日志转储
nocopytruncate           备份日志文件，但是不截断
nocreate                 不建立新日志
delaycompress            延迟压缩，和compress一起使用时，转储的日志文件到下一次转储时才压缩
nodelaycompress          转储并压缩
errors address           转储时错误信息发送指定地址
ifempty                  文件为空也转储
notifempty               如果文件为空，不转储
mail address             发送转储日志到指定邮箱
nomail                   转储不发邮件
olddir directory         转储后的日志文件放入指定的目录，必须和当前日志文件在同一个文件系统
noolddir                 转储后的日志文件和当前日志文件放在同一个目录下
prerotate/endscript      在转储以前需要执行的命令可以放入这个对，这两个关键字必须单独成行
postrotate/endscript     在转储以后需要执行的命令可以放入这个对，这两个关键字必须单独成行
daily                    按天存储
weekly                   按周存储
monthly                  按月存储
rotate count             日志转存保留的前多少份，多余的会被删除
tabootext [+] list       让logrotate 不转储指定扩展名的文件，缺省的扩展名是：.rpm-orig, .rpmsave, v, 和 ~
size size           	 当日志文件到达指定的大小时才转储，Size 可以指定 bytes (缺省)以及KB (sizek)或者MB
extension            	 指定转存日志后缀名，例如 .log
dateformat           	 设置日志文件名日期格式默认为 %Y%m%d

```








