import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ShoppingCategoryType } from '../Components/Shop/types';
import {
	filterByCategory,
	filterByPurchaseStatus,
	LOCAL_STORAGE_KEY,
	searchByName,
} from '../Components/Shop/utils';
import { ShopState } from './types';

export const useShopStore = create(
	persist<ShopState>(
		(set, get) => ({
			products: [],
			productsHistory: [],
			filteredProducts: null,
			addProduct: (product) =>
				set((state) => ({
					products: [...state.products, product],
					productsHistory: [...state.productsHistory, product],
				})),
			removeProduct: (id: string) =>
				set((state) => ({
					products: state.products.filter((product) => product.id !== id),
					productsHistory: [...state.productsHistory, ...state.products],
				})),
			editProduct: (updatedProduct) => {
				const { id } = updatedProduct;
				const products = get().products;
				const updatedProducts = products.filter((product) => product.id !== id);

				set((state) => ({
					products: [...updatedProducts, updatedProduct],
					productsHistory: [...state.productsHistory, ...state.products],
				}));
			},
			togglePurchaseStatus: (id: string) =>
				set((state) => ({
					products: state.products.map((product) =>
						product.id === id ? { ...product, isPurchased: !product.isPurchased } : product
					),
					productsHistory: [...state.productsHistory, ...state.products],
				})),
			filterProductsByCategory: (category: ShoppingCategoryType) => {
				const products = get().products;
				const filteredProducts = filterByCategory(category, products);

				set((state) => ({
					filteredProducts,
					productsHistory: [...state.productsHistory, ...state.products],
				}));
			},
			filterProductsByStatus: (status: boolean) => {
				const products = get().products;
				const filteredProducts = filterByPurchaseStatus(status, products);

				set((state) => ({
					filteredProducts,
					productsHistory: state.filteredProducts
						? [...state.productsHistory, ...state.filteredProducts]
						: [...state.productsHistory, ...state.products],
				}));
			},
			resetFilters: () =>
				set((state) => ({
					filteredProducts: null,
					productsHistory: state.filteredProducts
						? [...state.productsHistory, ...state.filteredProducts]
						: [...state.productsHistory, ...state.products],
				})),
			searchProductsByText: (text: string) => {
				const products = get().products;
				const filteredProducts = searchByName(text, products);

				set((state) => ({
					filteredProducts,
					productsHistory: state.filteredProducts
						? [...state.productsHistory, ...state.filteredProducts]
						: [...state.productsHistory, ...state.products],
				}));
			},
			undoAction: () => {
				const productsHistory = get().productsHistory;

				if (productsHistory.length === 0) return;

				const previousState =
					productsHistory.length > 1 &&
					productsHistory[0] !== productsHistory[productsHistory.length - 1]
						? productsHistory[productsHistory.length - 1]
						: null;

				set(() => ({
					products: previousState ? [previousState] : [],
					productsHistory: productsHistory.slice(0, -1),
				}));
			},
		}),
		{
			name: LOCAL_STORAGE_KEY,
			storage: createJSONStorage(() => localStorage),
		}
	)
);
