import { useMemo, useState } from 'react';

import debounce from 'lodash.debounce';
import { useShopStore } from '../../Store/shopStore';
import { ShoppingFormAdd } from './ShoppingForm';
import ShoppingHeader from './ShoppingHeader';
import ShoppingList from './ShoppingList';
import { ShoppingCategoryType } from './types';

const Shop = () => {
	const {
		products,
		filteredProducts,
		filterProductsByCategory,
		filterProductsByStatus,
		searchProductsByText,
		resetFilters,
		undoAction,
	} = useShopStore();
	const [category, setCategory] = useState<ShoppingCategoryType>('Fruits');

	const filterByItemCategory = () => {
		filterProductsByCategory(category);
	};

	const filterByItemPurchaseStatus = () => {
		filterProductsByStatus(true);
	};

	const undoLastAction = () => {
		undoAction();
	};

	const searchByTextName = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		searchProductsByText(e.target.value);
	}, 100);

	const data = useMemo(() => filteredProducts || products, [filteredProducts, products]);

	return (
		<div className="container">
			<ShoppingHeader
				filterByCategory={filterByItemCategory}
				filterByPurchaseStatus={filterByItemPurchaseStatus}
				undoLastAction={undoLastAction}
				resetFilters={resetFilters}
				searchByName={searchByTextName}
			/>
			<ShoppingFormAdd setCategory={(value: ShoppingCategoryType) => setCategory(value)} />
			{data.length ? (
				<ShoppingList items={data} />
			) : (
				<h2 style={{ padding: '20px 0', color: '#ff9800', textTransform: 'uppercase' }}>
					You have no items!
				</h2>
			)}
		</div>
	);
};

export default Shop;
