package com.demo.tg;

@SuppressWarnings("unchecked")
public class ModulePicker3 extends AbstractObjectPicker{

	public ModulePicker3() {
		super(true); //有鸡蛋
	}
	
	public TgMeals picker(PickerCondition pc) {
		System.out.println("---------ModulePicker3, getCalories = "
				+ pc.getCalories() + ", getClientId = " + pc.getClientId()
				+ ", isHasGruel = " + pc.isHasGruel() + ", isHasEgg = " + pc.isHasEggs());
		return null;
	}

	public Class picksTo() {
		return ModulePicker3.class;
	}

}
