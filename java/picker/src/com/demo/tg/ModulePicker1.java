package com.demo.tg;

/**
 * 食物选择器模式一
 * 
 * @author Administrator
 * 
 */
@SuppressWarnings("unchecked")
public class ModulePicker1 extends AbstractObjectPicker {

	public ModulePicker1() {
		super(true); // 有鸡蛋
	}

	public TgMeals picker(PickerCondition pc) {

		System.out.println("---------ModulePicker1, getCalories = "
				+ pc.getCalories() + ", getClientId = " + pc.getClientId()
				+ ", isHasGruel = " + pc.isHasGruel() + ", isHasEgg = " + pc.isHasEggs());

		return null;
	}

	public Class picksTo() {
		return ModulePicker1.class;
	}

}
