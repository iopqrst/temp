



public boolean validateSign(HttpServletRequest request) {
	String excludes = request.getParameter("excludes");
	String appKey = request.getParameter("appKey");
	String paramSign = request.getParameter("sign");

	String secret = "db16adf193f2448ba0ec0260e0c968f3"; // ����appKey��ȡsecret

	Enumeration tmp = request.getParameterNames();

	if (!StringUtils.isEmpty(excludes)) {
		excludes = "," + excludes + ",excludes,appKey,sign,";
	} else {
		excludes = ",excludes,appKey,sign,";
	}

	Map<String, String> paramMap = new HashMap<String, String>();

	while (tmp.hasMoreElements()) {
		String parameter = (String) tmp.nextElement();

		if (excludes.indexOf(parameter) < 0) { // �����ų�������ֶ�
			String value = request.getParameter(parameter);
			paramMap.put(parameter, value);
		}

	}

	StringBuilder stringBuilder = new StringBuilder();

	// �Բ����������ֵ�����
	String[] keyArray = paramMap.keySet().toArray(new String[0]);
	Arrays.sort(keyArray);
	
	// ƴ������Ĳ�����-ֵ��
	stringBuilder.append(appKey);
	for (String key : keyArray) {
		stringBuilder.append(key).append(paramMap.get(key));
	}
	String codes = stringBuilder.append(secret).toString();
	String sign = org.apache.commons.codec.digest.DigestUtils.shaHex(codes)
			.toUpperCase();

	System.out.println("���¼���sign : " + sign);
	System.out.println("�Ӳ����л�ȡ paramSign : " + paramSign);

	return paramSign.equals(sign);
}