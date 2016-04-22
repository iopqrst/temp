package com.demo.tg;

@SuppressWarnings("unchecked")
public class ModulePicker4 extends AbstractObjectPicker{

	public ModulePicker4() {
		super(false); //没鸡蛋
	}
	
	public TgMeals picker(PickerCondition pc) {
		System.out.println("---------ModulePicker4, getCalories = "
				+ pc.getCalories() + ", getClientId = " + pc.getClientId()
				+ ", isHasGruel = " + pc.isHasGruel() + ", isHasEgg = " + pc.isHasEggs());
		return null;
	}

	@Override
	public Class picksTo() {
		return ModulePicker4.class;
	}

}
