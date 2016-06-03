``` sh

netstat -ntlp   //查看当前所有tcp端口

vi /etc/ssh/sshd_config

# 修改或添加
Port 2222(或者其他没有使用的端口,默认值为22）

# 禁止root直接登录
PermitRootLogin no (默认值为yes)
```
