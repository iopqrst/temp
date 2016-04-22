package com.demo.tg;

public class PickerCondition {

	/**
	 * 总消耗的热卡
	 */
	private double calories;

	/**
	 * 是否可以喝粥
	 */
	private boolean hasGruel;
	/**
	 * 是否可以吃鸡蛋
	 */
	private boolean hasEggs;

	private Integer clientId;

	public double getCalories() {
		return calories;
	}

	public void setCalories(double calories) {
		this.calories = calories;
	}

	public boolean isHasGruel() {
		return hasGruel;
	}

	public void setHasGruel(boolean hasGruel) {
		this.hasGruel = hasGruel;
	}

	public Integer getClientId() {
		return clientId;
	}

	public void setClientId(Integer clientId) {
		this.clientId = clientId;
	}

	public boolean isHasEggs() {
		return hasEggs;
	}

	public void setHasEggs(boolean hasEggs) {
		this.hasEggs = hasEggs;
	}

}
