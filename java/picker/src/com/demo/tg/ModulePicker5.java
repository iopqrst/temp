package com.demo.tg;

@SuppressWarnings("unchecked")
public class ModulePicker5 extends AbstractObjectPicker{

	public ModulePicker5() {
		super(true); //没鸡蛋
	}
	
	public TgMeals picker(PickerCondition pc) {
		System.out.println("---------ModulePicker5, getCalories = "
				+ pc.getCalories() + ", getClientId = " + pc.getClientId()
				+ ", isHasGruel = " + pc.isHasGruel() + ", isHasEgg = " + pc.isHasEggs());
		return null;
	}

	@Override
	public Class picksTo() {
		return ModulePicker5.class;
	}

}
