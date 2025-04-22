import { ShoppingCategoryType, ShoppingItemType } from '../types';

export type ShopFormValues = {
	name: string;
	quantity: number;
	category: string;
	isPurchased?: boolean;
	id?: string;
};

export type ShoopingFormAddType = {
	setCategory: (category: ShoppingCategoryType) => void;
};

export type ShoopingFormEditType = {
	product: ShoppingItemType;
	onBtnClick: () => void;
};
