## 参考文章地址

[](http://www.codeceo.com/article/log4j-usage.html）
[](http://blog.csdn.net/meng2602956882/article/details/16951643)

## log4j 基本使用方法

日志信息的优先级(level)：ERROR > WARN > INFO > DEBUG （其他较为少用）

Log4j 由三个重要的组件构成：日志信息的优先级、日志信息的输出目的地，日志信息的输出格式。

1. 定义配置文件

+ 配置根Logger

```
log4j.rootLogger = [level], appenderName, appenderName, ...
```

如level定义的界别为INFO，则应用程序中所有DEBUG级别的日志信息将不被打印出来。

+ 配置输出目录 appender 

```
log4j.appender.appenderName = fully.qualified.name.of.appender.class

log4j.appender.appenderName.option1 = value1
log4j.appender.appenderName.option = valueN
...

# 其中，Log4j提供的appender有以下几种：
org.apache.log4j.ConsoleAppender（控制台）
org.apache.log4j.FileAppender（文件）
org.apache.log4j.DailyRollingFileAppender（每天产生一个日志文件）
org.apache.log4j.RollingFileAppender（文件大小到达指定尺寸的时候产生一个新的文件）
org.apache.log4j.WriterAppender（将日志信息以流格式发送到任意指定的地方）
```

+ 日志信息的格式

```
log4j.appender.appenderName.layout = fully.qualified.name.of.layout.class  
log4j.appender.appenderName.layout.option1 = value1    
log4j.appender.appenderName.layout.option = valueN
...

# Log4j提供的layout有以e几种：

org.apache.log4j.HTMLLayout（以HTML表格形式布局），  
org.apache.log4j.PatternLayout（可以灵活地指定布局模式），  
org.apache.log4j.SimpleLayout（包含日志信息的级别和信息字符串），  
org.apache.log4j.TTCCLayout（包含日志产生的时间、线程、类别等等信息）
```

+ 参数信息

``` 
%p 输出优先级，即DEBUG，INFO，WARN，ERROR，FATAL  
%r 输出自应用启动到输出该log信息耗费的毫秒数  
%t 输出产生该日志事件的线程名  
%n 输出一个回车换行符，Windows平台为“rn”，Unix平台为“n”  
%d 输出日志时间点的日期或时间，默认格式为ISO8601，也可以在其后指定格式，比如：%d{yyy MMM dd HH:mm:ss,SSS}，输出类似：2002年10月18日 22：10：28，921  
%l 输出日志事件的发生位置，包括类目名、发生的线程，以及在代码中的行数（相当于%c.%M(%F:%L)的组合）。举例：Testlog4.main(TestLog4.java:10)
%c 输出所属的类目，通常就是所在类的全名
%M 输出产生日志信息的方法名
%F 输出日志消息产生时所在的文件名称
%L 输出代码中的行号
%m 输出代码中指定的具体日志信
%% 输出一个%字符

```

+ Threshold 过滤日志的输出级别

> Threshold=WARN：指定日志信息的最低输出级别(低于这个级别的不输出），默认为DEBUG。










## log4j 实例
``` 
log4j.rootLogger=DEBUG,console,D,E

log4j.appender.console=org.apache.log4j.ConsoleAppender
log4j.appender.console.Target=System.out

# 它将把低于所设置的level的信息过滤不显示出来
log4j.appender.console.Threshold=DEBUG
log4j.appender.console.layout=org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=[%-5p][%d{yyyy-MM-dd HH\:mm\:ss,SSS}] - (%F.%M\:%L) %m%n

# 每天打印的日志
#log4j.appender.dailyFile=org.apache.log4j.DailyRollingFileAppender
#log4j.appender.dailyFile.encoding=UTF-8
#log4j.appender.dailyFile.File=c:/bscade.log
#log4j.appender.dailyFile.Append=true
#log4j.appender.dailyFile.Threshold=DEBUG
#log4j.appender.dailyFile.DatePattern='.'yyyyMMdd
#log4j.appender.dailyFile.layout=org.apache.log4j.PatternLayout
#log4j.appender.dailyFile.layout.ConversionPattern=[%-5p][%d{yyyy-MM-dd HH\:mm\:ss,SSS}] - (%F.%M\:%L) %m%n

### 输出DEBUG 级别以上的日志到=E://logs/error.log ###
log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.File = c://hzq-logs/log.log
log4j.appender.D.Append = true
log4j.appender.D.Threshold = DEBUG
log4j.appender.D.layout = org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern = [%-5p][%d{yyyy-MM-dd HH\:mm\:ss,SSS}] - (%F.%M\:%L) %m%n

### 输出ERROR 级别以上的日志到=E://logs/error.log ###
log4j.appender.E = org.apache.log4j.DailyRollingFileAppender
log4j.appender.E.File =c://hzq-logs/error.log
log4j.appender.E.Append = true
log4j.appender.E.Threshold = ERROR
log4j.appender.E.layout = org.apache.log4j.PatternLayout
log4j.appender.E.layout.ConversionPattern = [%-5p][%d{yyyy-MM-dd HH\:mm\:ss,SSS}] - (%F.%M\:%L) %m%n
```