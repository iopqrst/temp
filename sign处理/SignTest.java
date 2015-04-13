package com.bskcare.ch.util.jpush;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.bskcare.ch.util.CrmResponse;
import com.bskcare.ch.util.HttpClientUtils;

public class SignTest {

	public static void main(String[] args) throws Exception {

		String apiUrl = "http://localhost:8080/ofacade/sms_sendSMS.do";

		String appKey = "5589931241";
		String secret = "db16adf193f2448ba0ec0260e0c968f3";
		// 请替换为自己的 App Key 和 App secret

		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("city", "上海,北京");
		paramMap.put("latitude", "31.21524");
		paramMap.put("longitude", "121.420033");
		paramMap.put("category", "美食,电影");
		paramMap.put("region", "长宁区");
		paramMap.put("limit", "20");
		paramMap.put("radius", "2000");
		paramMap.put("offset_type", "0");
		paramMap.put("has_coupon", "1");
		paramMap.put("has_deal", "1");
		paramMap.put("keyword", "泰国菜");
		paramMap.put("sort", "7");
		paramMap.put("format", "json");

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

		// 以下三个参数或者其他不需计算sign的参数信息都放置在一下代码处
		paramMap.put("sign", sign);
		paramMap.put("appKey", appKey);
		paramMap.put("excludes", "");

		System.out.println("sign = " + sign);

		CrmResponse response = HttpClientUtils.getCrmResponse(apiUrl, paramMap);

		System.out.println(response.getCode());

	}
}
