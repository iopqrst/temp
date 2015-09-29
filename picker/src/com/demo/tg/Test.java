package com.demo.tg;

import java.util.Random;

public class Test {

	public static void main(String[] args) {
//		ModulePicker1 m1 = new ModulePicker1();
//		System.out.println(m1.hasEgg);
//
//		ModulePicker2 m2 = new ModulePicker2();
//		System.out.println(m2.hasEgg);
//
//		ModulePicker3 m3 = new ModulePicker3();
//		System.out.println(m3.hasEgg);
//
//		ModulePicker4 m4 = new ModulePicker4();
//		System.out.println(m4.hasEgg);
//
//		ModulePicker5 m5 = new ModulePicker5();
//		System.out.println(m5.hasEgg);
//		
//		for (int i = 0; i < 10; i++) {
//			int a = new Random().nextInt(2);
//			System.out.println(a);
//		}
		
		
		for(int i = 0; i < 500; i++) {
			
			System.out.println("================第" + i + "开始=================");
			
			PickerCondition pc = new PickerCondition();
			pc.setCalories(1000);
			pc.setClientId(10001);
			pc.setHasGruel(i % 2 == 0 ? true : false);
//			if(i == 100) {
//				PickerUtils.getPickerRegistry().registerPicker(new ModulePicker6());
//			}
			PickerUtils.getTgMealssss(pc);
//			if(i == 110) {
//				PickerUtils.getPickerRegistry().clear(new ModulePicker6().picksTo());
//			}
			
			//System.out.println("================第" + i + "结束=================");
		}
		
	}
}
