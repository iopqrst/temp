



public boolean validateSign(HttpServletRequest request) {
	String excludes = request.getParameter("excludes");
	String appKey = request.getParameter("appKey");
	String paramSign = request.getParameter("sign");

	String secret = "db16adf193f2448ba0ec0260e0c968f3"; // 根据appKey获取secret

	Enumeration tmp = request.getParameterNames();

	if (!StringUtils.isEmpty(excludes)) {
		excludes = "," + excludes + ",excludes,appKey,sign,";
	} else {
		excludes = ",excludes,appKey,sign,";
	}

	Map<String, String> paramMap = new HashMap<String, String>();

	while (tmp.hasMoreElements()) {
		String parameter = (String) tmp.nextElement();

		if (excludes.indexOf(parameter) < 0) { // 存在排除在外的字段
			String value = request.getParameter(parameter);
			paramMap.put(parameter, value);
		}

	}

	StringBuilder stringBuilder = new StringBuilder();

	// 对参数名进行字典排序
	String[] keyArray = paramMap.keySet().toArray(new String[0]);
	Arrays.sort(keyArray);
	
	// 拼接有序的参数名-值串
	stringBuilder.append(appKey);
	for (String key : keyArray) {
		stringBuilder.append(key).append(paramMap.get(key));
	}
	String codes = stringBuilder.append(secret).toString();
	String sign = org.apache.commons.codec.digest.DigestUtils.shaHex(codes)
			.toUpperCase();

	System.out.println("重新计算sign : " + sign);
	System.out.println("从参数中获取 paramSign : " + paramSign);

	return paramSign.equals(sign);
}