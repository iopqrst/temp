## 1. 创建logrotate分隔脚本文件夹

``` shell

cd /etc/

mkdir logrotate.d-xtgg

cd /logrotate.d-xtgg

```

> 为什么要创建一个新的文件夹，不是就有一个logrotate.d的文件吗，为什么不在里面直接写分隔叫本？
> 默认的脚本是通过cron.daily 执行的，执行时间都是在晚上3点左右，分隔日志不太合适，不会修改系统每天执行时间，只能通过cron 定时执行。

## 2. 创建脚本

``` shell
vi doctor-catalina

/home/crm/docTomcat/logs/catalina.out {
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

vi facade-catalina

/home/bskcare/facadeTomcat/logs/catalina.out {
    rotate 6
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

## 3. 创建执行 logrotate的 shell 脚本

``` shell

vi /usr/sbin/xtgg-logrotate.sh

#!/bin/sh
################################################################################
#                                                                              #
#                      Program    :  bskcare                                   #
#                      Author     :  houzhiqing                                #
#                      Email      :  houzhiqing@bskcare.com                    #
#                                                                              #
################################################################################

# 血糖高管Tomcat日志文件切割命令行，有cron定时任务执行

/usr/sbin/logrotate -f /etc/logrotate.d-xtgg/facade-catalina
/usr/sbin/logrotate -f /etc/logrotate.d-xtgg/doctor-catalina

``` 

退出，保存。修改执行权限。


```shell

chmod 700 xtgg-logrotate.sh

```


## 4. 添加到定时任务中，每天凌晨执行

``` shell

crontab -l
1 0 * * * sh /usr/sbin/xtgg-logrotate.sh

```