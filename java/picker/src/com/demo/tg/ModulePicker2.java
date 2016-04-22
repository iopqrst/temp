package com.demo.tg;

@SuppressWarnings("unchecked")
public class ModulePicker2 extends AbstractObjectPicker{

	public ModulePicker2() {
		super(true); //有鸡蛋
	}
	
	public TgMeals picker(PickerCondition pc) {
		System.out.println("---------ModulePicker2, getCalories = "
				+ pc.getCalories() + ", getClientId = " + pc.getClientId()
				+ ", isHasGruel = " + pc.isHasGruel() + ", isHasEgg = " + pc.isHasEggs());
		return null;
	}

	public Class picksTo() {
		return ModulePicker2.class;
	}

}
