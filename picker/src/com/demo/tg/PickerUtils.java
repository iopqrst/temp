package com.demo.tg;

import java.util.Random;

public class PickerUtils {

	private static final PickerRegistry pickerRegistry = new PickerRegistry();

	static {
		registerStandardPicker(pickerRegistry);
	}
	
	public static void registerStandardPicker(PickerRegistry pickerRegistry) {
		pickerRegistry.clear();

		pickerRegistry.registerPicker(new ModulePicker1());
		pickerRegistry.registerPicker(new ModulePicker2());
		pickerRegistry.registerPicker(new ModulePicker3());
		pickerRegistry.registerPicker(new ModulePicker4());
		pickerRegistry.registerPicker(new ModulePicker5());
	}

	public static PickerRegistry getPickerRegistry() {
		return pickerRegistry;
	}
	
	/**
	 * 挑选一个合适的食物
	 */
	public static TgMeals getTgMealssss(PickerCondition pc) {
		
		// 1. 判断是什么并合症
		//1.1 如果是对鸡蛋有限制的要去查询最近一周蛋的情况
			//1.1.1 可以有鸡蛋 ： 任意选
			//1.1.2 不能有鸡蛋 ： 任何餐次都不能不能选有鸡蛋的
	
			//1.1.3 判断最近一周是否有粥
	
				// 有 ： 不选有粥的模式  --> 传入有粥的条件（只能选汤）
				// 没有：任何模式
		
		if(null == pc || null == pc.getClientId() ||  pc.getCalories() <= 0 ) {
			return null;
		}
		
		String diseases = getMergingDisease(pc.getClientId());
		
		int eatingEggsCount = 0;
		//假如1为不能吃鸡蛋的并合症（该并合症一周最多可吃3个鸡蛋），其他都可以吃鸡蛋
		
		boolean eatingEggs = false;
		boolean drinkingGruel = false;
		
		// 判断什么并合症，并且根据并合症判断鸡蛋的量
		if("1".equals(diseases) 
				&& (eatingEggsCount = queryEatingEggsCount(pc.getClientId())) >= 3){ 
			
			System.out.println("最近一周吃了" + eatingEggsCount + "鸡蛋,不能再吃鸡蛋了！！");
			//不能选有鸡蛋的模式
			//只有模式4没有鸡蛋，其他的模式都有鸡蛋
		} else {
			//可以选有鸡蛋的模式
			System.out.println("最近一周没吃多少鸡蛋，还可以再吃！！");
			eatingEggs = true;
		}
		
		//判断最近一周是否有粥
		int queryDrinkingGruelCount = queryDrinkingGruelCount(pc.getClientId());
		if(queryDrinkingGruelCount > 0) {
			System.out.println("本周已经喝过粥了，本次不能再喝了！！");
			// 不能在喝粥了
			drinkingGruel = false;
		} else {
			System.out.println("本次可以喝粥");
			drinkingGruel =  true;
		}
		
		Picker relPic = pickerRegistry.selectPicker(eatingEggs);
		
		if(null == relPic) {
			System.out.println("没有周到是适合的选择器");
			return null;
		}
		
		pc.setHasEggs(eatingEggs);
		pc.setHasGruel(drinkingGruel);
		TgMeals tm = relPic.picker(pc);
		
		return tm;
	}

	/**
	 * 查询某用户最近一周吃蛋的情况
	 * @param clientId
	 * @return 吃蛋的次数
	 */
	private static int queryEatingEggsCount(Integer clientId) {
		
		int a = new Random().nextInt(4);
		
		return a;
	}
	
	/**
	 * 查询某用户最近一周喝粥的情况
	 * @param clientId
	 * @return 喝粥的次数
	 */
	private static int queryDrinkingGruelCount(Integer clientId) {
		
		int a = new Random().nextInt(2);
		
		return a;
	}

	/**
	 * 获取用户的合并症装
	 * @param clientId
	 * @return 合并症
	 */
	private static String getMergingDisease(Integer clientId) {
		
		int a = new Random().nextInt(2);
		
		return ""+a;
	}
	
	/**
	 * 随机获取一定范围内的随机数
	 * @param n 开始数字（包含）
	 * @param m 结束范围（不包含）
	 * @return
	 */
	public static int getRandom(int n, int m) {
		
		return (int) (Math.random() * (m - n) + n);
	}
}
