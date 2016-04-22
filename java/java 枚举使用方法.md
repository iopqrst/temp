+ 为什么要使用枚举类型？
+ 静态常量和枚举有什么区别？


```java

package com.test.bo.liveness;

public class MyEnumTest {

	public enum ImageQuality {
		max(1.0f), high(0.75f), medium(0.5f), low(0.25f);

		private Float quality;

		public Float getQuality() {
			return this.quality;
		}

		public Float getHalfQuality() {
			return this.quality / 2;
		}

		ImageQuality(Float quality) {
			this.quality = quality;
		}
	}

	public enum InterfaceStatus {
		succ(1), fail(0), cm_empty(-1), not_match(-2), param_error(-3), forbidden(
				-4);

		private int status;

		InterfaceStatus(int status) {
			this.status = status;
		}

		public int getStatus() {
			return this.status;
		}
	}

	public enum Color {
		BLACK("black"), YELLOW("yellow"), PINK("pink"), GREEN("green"), RED(
				"red");

		private String color;

		Color(String color) {
			this.color = color;
		}

		public String init() {
			return color;
		}
	}

	public static void main(String[] args) {

		float f = ImageQuality.high.getQuality();
		float halfF = ImageQuality.low.getHalfQuality();

		int status = InterfaceStatus.succ.getStatus();

		System.out.println(status);

		String color = Color.YELLOW.init();
		String color2 = Color.GREEN.init();
		String color3 = Color.PINK.init();

		System.out.println(color + " ," + color2 + " ," + color3);

		System.out.println(f);
		System.out.println(halfF);
		
		
		System.out.println(MyEnumTest2.MON.toString());
		
		MyEnumTest2 test2 = MyEnumTest2.MON;
		System.out.println(test2);

		System.out.println(MyEnumTest2.THU);
	}
}


package com.test.bo.liveness;

public enum MyEnumTest2 {

	MON, TUE, WED, THU, FRI, SAT, SUN;
}

```

