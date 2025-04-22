import { useShopStore } from '../../../Store/shopStore';
import styles from './styles.module.scss';
import { ShoppingHeaderProps } from './types';
export const ShoppingHeader = ({
	filterByCategory,
	filterByPurchaseStatus,
	undoLastAction,
	resetFilters,
	searchByName,
}: ShoppingHeaderProps) => {
	const { products, filteredProducts, productsHistory } = useShopStore();

	return (
		<header className={styles.header}>
			<h1>Shopping List</h1>
			<div className={styles.header__search}>
				<input
					type="search"
					disabled={(products || filteredProducts).length === 0}
					onChange={searchByName}
					placeholder="Search an item"
				/>
			</div>
			<div className={styles.header__filters}>
				<button onClick={filterByCategory}>Filter by Category</button>
				<button onClick={filterByPurchaseStatus}>Filter by Purchase Status</button>
				<button onClick={resetFilters}>Reset Filters</button>
				<button onClick={undoLastAction} disabled={productsHistory.length === 0}>
					Undo last action
				</button>
			</div>
		</header>
	);
};

export default ShoppingHeader;
