import { ShoppingCategoryType, ShoppingItemType } from './types';

export const LOCAL_STORAGE_KEY = 'shopping-list';
export const filterByCategory = (category: ShoppingCategoryType, products: ShoppingItemType[]) => {
	return products.filter((product) => product.category === category);
};

export const filterByPurchaseStatus = (
	purchaseStatus: boolean,
	shoppingList: ShoppingItemType[]
) => {
	return shoppingList.filter((product) => product.isPurchased === purchaseStatus);
};

export const searchByName = (name: string, shoppingList: ShoppingItemType[]) => {
	return shoppingList.filter((product) => product.name.toLowerCase().includes(name.toLowerCase()));
};
