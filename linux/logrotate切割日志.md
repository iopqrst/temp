## 参考文章

[- 【全面】简单好用的日志管理工具 logrotate](http://www.cnblogs.com/futeng/p/4785206.html)
[- Linux日志文件总管——logrotate](https://linux.cn/article-4126-1.html)
[-使用logrotate分割tomcat日志](http://www.52os.net/articles/using-logrotate-manage-tomcat-logs.html)

## 注意事项

logrotate都是需要使用root来执行的，（但是可以通过配置项来指定生成的日志文件为普通用户的）。

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

## logroate 参数说明 （` man logrotate ` 查看更多)

``` shell

参数名称    含义
compress                 通过gzip 压缩转储以后的日志
nocompress               不压缩转储
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
dateformat           	 设置日志文件名日期格式默认为 -%Y%m%d （仅支持%Y、%m、%d 和 %s[估计是个时间戳]，默认为test.log-20160615, 当设置为 -%Y%m%d%s后格式为test.log-201606151465960021）

```

## 配置

+ 简单示例：

``` shell
# 要切割文件的路径 ， 最终生成文件格式 ：catalina.out-yyyyMMdd
/home/bskcare/facadeTomcat/logs/catalina.out {
    rotate 2
    copytruncate
    nocompress
    notifempty
    missingok
    nomail
    noolddir 
    daily
    dateext
    dateformat -%Y%m%d.%s
}

```

+ 自定义配置文件存放目录/etc/logrotate.d/

``` shell
# ls /etc/logrotate.d/
cups  debug  dracut  httpd  iptraf  mysqld  ppp  psacct  sssd  subscription-manager  syslog  tomcat6  up2date  vsftpd  wpa_supplicant  yum
```

例如查看下sssd配置文件的内容：

``` shell
# cat /etc/logrotate.d/sssd

/var/log/sssd/*.log {
    weekly
    missingok
    notifempty
    sharedscripts
    rotate 2
    compress
    postrotate
        /bin/kill -HUP `cat /var/run/sssd.pid  2>/dev/null`  2> /dev/null || true
    endscript
}
```

可以发现基本格式与全局配置文件/etc/logrotate.conf一致，不难想象单独为某个日志配置的要求优先级肯定更高，如果与全局配置中出现相同项目的配置，单独的肯定覆盖全局的。

+ cron 执行 `/etc/cron.daily/logrotate`

配置文件都指定完毕，logrotate可单独执行了，当然也可以通过cron来定时执行；

``` shell
# cat /etc/cron.daily/logrotate

#!/bin/sh

/usr/sbin/logrotate /etc/logrotate.conf >/dev/null 2>&1
EXITVALUE=$?
if [ $EXITVALUE != 0 ]; then
    /usr/bin/logger -t logrotate "ALERT exited abnormally with [$EXITVALUE]"
fi
exit 0
```

默认的logrotate已经放在/etc/cron.daily/logrotate目录，很明显是让cron每天执行一次logrotate程序；
当然你也可以将该脚本放到其他时间，比如每分钟执行，甚至可以单独写crontab表达式来让logrotate指定配置文件和指定时间执行；

+ 小结

至此，我们看过了logrotate的全局配置文件，单独配置文件，已经如何配合cront来定时执行。
为了加深记忆，我们先小结下：

	1. logrotate是个程序，专门用来处理日志文件；
	2. 处理需要用户配置规则，比如指定超出10M则做什么动作；
	3. 规则可配置到独立的配置文件中，当然全局还有个全局默认配置文件，要知道每个配置文件都放在哪哦；
	4. logrotate一被执行，就会搜索所有的配置文件按要求处理日志；
	5. 可以配合cron让logrotate定时执行；


##　实例

man过logrotate的同学大概知道logrotate该怎么用了，常见的选项使用如下：

``` shell

# 1. 调试 （d = debug）参数为配置文件，不指定则执行全局配置文件
logrotate -d /etc/logrotate.d/test.conf

# 2. 强制执行（-f = force），可以配合-v(-v =verbose）使用，注意调试信息默认携带-v；
logrotate -v -f /etc/logrotate.d/test.conf

```

本例通过自定义配置文件来压缩指定日志文件来测试logrotate的使用。
注意logrotate都是需要使用root来执行的，（但是可以通过配置项来指定生成的日志文件为普通用户的）。

``` shell
# 1. 生成一个日志文件

man ps > test.log
ll -h test.log
-rw-r--r-- 1 root root 54K Sep  6 11:36 test.log

# 2. 编写对该日志文件如何处理的logrotate配置文件
cat /etc/logrotate.d/test.conf

/var/log/test.log {
 compress
 rotate 4
 size 30k
 create 0600 root root
}

# 3. 调试是否可以按照配置文件要求生成压缩文件

logrotate -d /etc/logrotate.d/test.conf

reading config file /etc/logrotate.d/test.conf
reading config info for /var/log/test.log

Handling 1 logs

rotating pattern: /var/log/test.log  30720 bytes (4 rotations)
empty log files are rotated, old logs are removed
considering log /var/log/test.log
  log needs rotating
rotating log /var/log/test.log, log->rotateCount is 4
dateext suffix '-20150906'
glob pattern '-[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'
renaming /var/log/test.log.4.gz to /var/log/test.log.5.gz (rotatecount 4, logstart 1, i 4),
renaming /var/log/test.log.3.gz to /var/log/test.log.4.gz (rotatecount 4, logstart 1, i 3),
renaming /var/log/test.log.2.gz to /var/log/test.log.3.gz (rotatecount 4, logstart 1, i 2),
renaming /var/log/test.log.1.gz to /var/log/test.log.2.gz (rotatecount 4, logstart 1, i 1),
renaming /var/log/test.log.0.gz to /var/log/test.log.1.gz (rotatecount 4, logstart 1, i 0),
renaming /var/log/test.log to /var/log/test.log.1
creating new /var/log/test.log mode = 0600 uid = 0 gid = 0
compressing log with: /bin/gzip
removing old log /var/log/test.log.5.gz
error: error opening /var/log/test.log.5.gz: No such file or directory

# 4. 调试结果正常，实际测试下
logrotate -f /etc/logrotate.d/test.conf
ll -h test.log*

-rw------- 1 root root   0 Sep  6 11:44 test.log
-rw-r--r-- 1 root root 14K Sep  6 11:44 test.log.1.gz

```

测试正常；以上 ` logrotate -f /etc/logrotate.d/test.conf ` 指令完全可以写入crontab中，按照要求时间来执行，此处暂时不拆开讲了。

> 注：将test.conf改为一下，验证也可通过

``` shell
/var/log/test.log {
    rotate 5
    copytruncate
    nocompress
    notifempty
    missingok
    nomail
    noolddir 
    daily
    dateext
    dateformat -%Y%m%d.%s
}
```

### 轮转

我们从上述debug信息中，摘录轮转部分的日志来理解下，什么叫轮转。

``` shell
rotating log /var/log/test.log, log->rotateCount is 4

renaming /var/log/test.log.4.gz to /var/log/test.log.5.gz (rotatecount 4, logstart 1, i 4),
renaming /var/log/test.log.3.gz to /var/log/test.log.4.gz (rotatecount 4, logstart 1, i 3),
renaming /var/log/test.log.2.gz to /var/log/test.log.3.gz (rotatecount 4, logstart 1, i 2),
renaming /var/log/test.log.1.gz to /var/log/test.log.2.gz (rotatecount 4, logstart 1, i 1),
renaming /var/log/test.log.0.gz to /var/log/test.log.1.gz (rotatecount 4, logstart 1, i 0),
renaming /var/log/test.log to /var/log/test.log.1

emoving old log /var/log/test.log.5.gz
error: error opening /var/log/test.log.5.gz: No such file or directory

```

根据配置文件要求，轮转4份；
以伪代码在简写上述日志为：

```
rotateCount=4
mv 4 5
mv 3 4
mv 2 3
mv 1 2
rm 5

```

这就很容易理解了，所谓轮转，就是类似二级制向右位移一样不断的重命名；


### 清空但不删除日志文件

copytruncate的作用在于先复制一份当前日志文件用做处理，再清空源日志文件，让其继续接收日志。
当然在复制和清空的空隙可能会有若干

``` shell
$ cat logrotate.conf 

/tmp/output.log {        
    size k        
    copytruncate        
    create 700 bala bala        
    rotate 4        
    compress 
}

```
### 日志处理完执行自定义脚本

postrotate和endscript中间可以编写自定义脚本，用来对日志或者其他其定义处理，扩展性非常强；
例如由于logrotate对压缩日志可指定的时间戳只能到天，于是可以再自定义脚本里面对文件做时分等细化命名；

``` shell

$ cat logrotate.conf 

/tmp/output.log {        
    size 1k        
    copytruncate        
    rotate 4        
    compress        
    postrotate               
        /home/bala/myscript.sh        
    endscript 
}

```

### 更改压缩程序

默认压缩程序使用.gz，当然可以自定义，需要制定压缩程序和后缀名；

``` shell 
$ cat logrotate.conf 

/tmp/output.log {        
    size 1k        
    copytruncate        
    create        
    compress        
    compresscmd /bin/bzip2        
    compressext .bz2        
    rotate 4 
}
```