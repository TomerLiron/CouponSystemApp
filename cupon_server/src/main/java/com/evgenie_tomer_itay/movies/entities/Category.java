package com.evgenie_tomer_itay.movies.entities;

public enum Category {
	FOOD(1), ELECTRICITY(2), RESTAURANT(3), VACATION(4), FURNITURES(5), HARDWARE(6);
	private int id;
	
	Category(final int id) {
		this.id = id;
	}

	public int getCategoryId() {
		return id;
	}

	public static Category getCategoryById(int id) {
		for (Category category : values()) {
			if (category.id == id)
				return category;
		}
		return null;
	}

}
