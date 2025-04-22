import { ShoppingItemType, ShoppingCategoryType } from '../Components/Shop/types';

export interface ShopState {
	products: ShoppingItemType[];
	filteredProducts: ShoppingItemType[] | null;
	productsHistory: ShoppingItemType[];
	addProduct: (product: ShoppingItemType) => void;
	removeProduct: (id: string) => void;
	editProduct: (updatedProduct: ShoppingItemType) => void;
	togglePurchaseStatus: (id: string) => void;
	filterProductsByCategory: (category: ShoppingCategoryType) => void;
	filterProductsByStatus: (status: boolean) => void;
	resetFilters: () => void;
	searchProductsByText: (text: string) => void;
	undoAction: () => void;
}
