export type ShoppingCategoryType = 'Fruits' | 'Vegatables' | 'Dairy';

export type ShoppingItemType = {
	id: string;
	name: string;
	quantity: number;
	isPurchased: boolean;
	category: ShoppingCategoryType;
};

export type ShoppingListType = ShoppingItemType[] | [];
