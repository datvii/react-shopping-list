export type ShoppingHeaderProps = {
	filterByCategory: () => void;
	filterByPurchaseStatus: () => void;
	searchByName: (e: React.ChangeEvent<HTMLInputElement>) => void;
	resetFilters: () => void;
	undoLastAction: () => void;
};
