## 1、young

年轻代分3个去，一个Eden区，两个Survivor区。大部分对象在Eden区中生成。当Eden区满时，还存活的对象将被复制到Survivor区（两个中的一个），当这个Survivor区满时，此时的存活对象将被复制到另外一个Survivor区，当这个Survivor区也满的时候，从第一个Survivor区复制过来并且此时还存活的对象将被复制到“老年区（Tenured）”。 需要注意，Survivor 的两个区是对称的，没有先后的关系，所以同一个区中可能同时存在从Eden复制过来的对象，和从前一个Survivor 复制过来的对象，而复制到老年区的只有从第一个Survivor复制过来的对象。而且，Survivor 区总有一个是空的。

## 2、old

年老代存放从年轻代存活的对象。一般来说年老代存放的都是生命周期较长的对象。

## 3、Perm （持久代）

用于存放静态文件，如Java类、方法等。持久代对垃圾回收有没有显著影响，但是有些应用可能动态生成或调用一些class，例如Hibernate等，在这种时候需要设置一个比较大的持久代空间来存放这些运行过程中新增的类。持久代大小通过 -XX:MaxPermSize=xxx进行设置。

## 4、GC的基本概念

	gc分为full gc 跟 minor gc，当每一块区满的时候都会引发gc。

## Scavenge GC
	一般情况下，当新对象生成，并且在Eden申请空间失败时，就触发了Scavenge GC，堆Eden区域进行GC，清除非存活对象，并且把尚且存活的对象移动到Survivor区。然后整理Survivor的两个区。

## Full GC
	对整个堆进行整理，包括Young、Tenured和Perm。Full GC比Scavenge GC要慢，因此应该尽可能减少Full GC。有如下原因可能导致Full GC：

 上一次GC之后Heap的各域分配策略动态变化

	- System.gc()被显示调用
	- Perm域被写满
	- Tenured被写满



## 5、内存溢出  out of memory，

是指程序在申请内存时，没有足够的内存空间供其使用，出现out of memory；比如申请了一个integer,但给它存了long才能存下的数，那就是内存溢出。

## 6、内存泄露  memory leak，是指程序在申请内存后，无法释放已申请的内存空间，一次内存泄露危害可以忽略，但内存泄露堆积后果很严重，无论多少内存,迟早会被占光。其实说白了就是该内存空间使用完毕之后未回收。

``` shell
jdk 安装目录 /usr/java/jdk1.6.0_45/bin


jmap -heap [pid] 查看内存分布
jstat -gcutil [pid] 1000 每隔1s输出java进程的gc情况

jstat -gcutil 878 5000 1000  ( 进程878的每5000毫秒执行一次，执行1000次)


1.jstat -gc 878

可以显示gc的信息，查看gc的次数，及时间。
其中最后五项，分别是young gc的次数，young gc的时间，full gc的次数，full gc的时间，gc的总时间。


 S0C    S1C    S0U    S1U      EC       EU        OC         OU       PC     PU    		YGC     YGCT    FGC    FGCT     GCT   
6336.0 6336.0  0.0   6330.9 336832.0 201491.4  699072.0   354578.8  178496.0 112508.2   6692   54.894   8      5.049   59.943

 S0C    S1C    S0U    S1U      EC       EU        OC         OU       PC      PU    	YGC     YGCT    FGC    FGCT     GCT   
7808.0 5312.0  0.0   5277.0 334912.0 192983.8  699072.0   581174.7  131072.0 109665.3  32959  169.467  98    156.152  325.619

2.jstat -gccapacity pid
   可以显示，VM内存中三代（young,old,perm）对象的使用和占用大小，
   如：PGCMN显示的是最小perm的内存使用量，PGCMX显示的是perm的内存最大使用量，
   PGC是当前新生成的perm内存占用量，PC是但前perm内存占用量。
   其他的可以根据这个类推， OC是old内纯的占用量。
3.jstat -gcutil pid
	统计gc信息统计。
4.jstat -gcnew pid
	年轻代对象的信息。
5.jstat -gcnewcapacity pid
   年轻代对象的信息及其占用量。
6.jstat -gcold pid
	old代对象的信息。
7.stat -gcoldcapacity pid
   old代对象的信息及其占用量。
8.jstat -gcpermcapacity pid
   perm对象的信息及其占用量。
9.jstat -class pid
   显示加载class的数量，及所占空间等信息。
10.jstat -compiler pid
   显示VM实时编译的数量等信息。
11.stat -printcompilation pid
  当前VM执行的信息。
一些术语的中文解释：
 S0C：年轻代中第一个survivor（幸存区）的容量 (字节)
 S1C：年轻代中第二个survivor（幸存区）的容量 (字节)
 S0U：年轻代中第一个survivor（幸存区）目前已使用空间 (字节)
 S1U：年轻代中第二个survivor（幸存区）目前已使用空间 (字节)
  EC：年轻代中Eden（伊甸园）的容量 (字节)
  EU：年轻代中Eden（伊甸园）目前已使用空间 (字节)
  OC：Old代的容量 (字节)
  OU：Old代目前已使用空间 (字节)
  PC：Perm(持久代)的容量 (字节)
  PU：Perm(持久代)目前已使用空间 (字节)
 YGC：从应用程序启动到采样时年轻代中gc次数
YGCT：从应用程序启动到采样时年轻代中gc所用时间(s)
 FGC：从应用程序启动到采样时old代(全gc)gc次数
FGCT：从应用程序启动到采样时old代(全gc)gc所用时间(s)
 GCT：从应用程序启动到采样时gc用的总时间(s)
NGCMN：年轻代(young)中初始化(最小)的大小 (字节)
NGCMX：年轻代(young)的最大容量 (字节)
 NGC：年轻代(young)中当前的容量 (字节)
OGCMN：old代中初始化(最小)的大小 (字节) 
OGCMX：old代的最大容量 (字节)
OGC：old代当前新生成的容量 (字节)
PGCMN：perm代中初始化(最小)的大小 (字节) 
PGCMX：perm代的最大容量 (字节)   
 PGC：perm代当前新生成的容量 (字节)
 S0：年轻代中第一个survivor（幸存区）已使用的占当前容量百分比
  S1：年轻代中第二个survivor（幸存区）已使用的占当前容量百分比
 E：年轻代中Eden（伊甸园）已使用的占当前容量百分比
 O：old代已使用的占当前容量百分比
 P：perm代已使用的占当前容量百分比
S0CMX：年轻代中第一个survivor（幸存区）的最大容量 (字节)
S1CMX ：年轻代中第二个survivor（幸存区）的最大容量 (字节)
ECMX：年轻代中Eden（伊甸园）的最大容量 (字节)
 DSS：当前需要survivor（幸存区）的容量 (字节)（Eden区已满）
  TT：持有次数限制
 MTT ：最大持有次数限制

```
 
MAT 参考文章：

[内存分析工具 MAT 的使用](http://blog.csdn.net/truelove12358/article/details/49493405)

[Shallow heap & Retained heap【Import!】](http://bjyzxxds.iteye.com/blog/1532937)  

Shallow size 

对象自身占用的内存大小，不包括它引用的对象

针对非数组类型的对象，它的大小就是对象与它所有的成员变量大小的总和。当然这里还会包含一些java语言特性的数据存储单元。
针对数组类型的对象，它的大小是数组元素对象的大小总和。


Retained size

Retained Size = 当前对象大小 + 当前对象可直接或间接引用到对象的大小总和。(间接引用的含义： A - > B - > C ， C就是间接引用) 换句话说，Retained Size 就是当前对象被GC后，从Heap上总共能释放掉的内存。不过，释放的时候还要排除被GC Roots 直接或间接引用的对象。 他们暂时不会被当作Garbage。

http://www.cnblogs.com/walson/p/3913055.html


http://blog.csdn.net/rachel_luo/article/details/8992461 明天做一下测试...





## 四种引用类型：

	参考文章：https://my.oschina.net/Bruce370/blog/511707（java中四种引用类型（对象的强、软、弱和虚引用））

### 1、强引用

	强引用是使用最普遍的引用。如果一个对象具有强引用，那垃圾回收器绝不会回收它。当内存空间不足，Java虚拟机宁愿抛出OutOfMemoryError错误，使程序异常终止，也不会随意回收具有强引用的对象来解决内存不足的问题。(强引用其实就是我们平时A a = new A())
	
### 2、软引用
 
	如果一个对象只具有软引用，当内存空间足够时，垃圾回收器不会回收它； 如果内存空间不足，就会回收这些对象的内存。只要垃圾回收器没有回收它，该对象就可以被程序使用。软引用可以用来实现内存敏感的高速缓存。
	
	软引用可以和一个引用队列（ReferenceQueue）联合使用，如果软引用所引用的对象被垃圾回收器回收，Java虚拟机就会把这个软引用加入到与之关联的引用队列中。
	
### 3、弱引用

	弱引用与软引用的区别在于：只具有弱引用的对象拥有更短暂的生命周期。在垃圾回收器线程扫描它所管辖的内存区域的过程中。一旦发现了只具有弱引用的对象，不管当前内存空间是否足够，都会回收它的内存。不过，由于垃圾回收器是一个优先级很低的线程，因此不一定会很快发现那些只具有弱引用的对象。
	
	弱引用可以和一个引用队列（ReferenceQueue）联合使用，如果弱引用所引用的对象被垃圾回收，Java虚拟机就会把这个弱引用加入到与之关联的引用队列中。
	
### 4、虚引用

	“虚引用”顾名思义，就是形同虚设，与其他几种引用都不同，虚引用并不会决定对象的生命周期，如果一个对象仅持有虚引用，那么它就和没有任何引用一样，在任何时候都可能被垃圾回收器回收。
	
	虚引用主要用来跟踪对象被垃圾回收器回收的活动。虚引用与软引用和弱引用的区别在于：虚引用必须和引用队列（ReferenceQueue)联合使用。当垃圾回收器准备回收一个对象是，如果发现他还有虚引用，就会在回收对象内存之前，把这个虚引用加入到与之关联的引用队列中。

	
	ReferenceQueue queue = new ReferenceQueue ();

	PhantomReference pr = new PhantomReference (object, queue); 
	程序可以通过判断引用队列中是否已经加入了虚引用，来了解被引用的对象是否将要被垃圾回收。如果程序发现某个虚引用已经被加入到引用队列，那么就可以在所引用的对象的内存被回收之前采取必要的行动。