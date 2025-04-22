import { FC, useState } from 'react';
import { ShoppingItemType } from '../types';
import { useShopStore } from '../../../Store/shopStore';
import { ShoppingFormEdit } from '../ShoppingForm';

const ShoppingItem: FC<ShoppingItemType> = (product) => {
	const { removeProduct, togglePurchaseStatus: toggleStatus } = useShopStore();
	const { name, id, isPurchased, category, quantity } = product;
	const [isItemEdit, setIsItemEdit] = useState(false);
	const onBtnClick = () => {
		setIsItemEdit(false);
	};
	const setEditState = () => {
		setIsItemEdit(true);
	};

	const deleteItem = () => {
		removeProduct(id);
	};

	const togglePurchaseStatus = () => {
		toggleStatus(id);
	};

	const checkbox = (
		<input type="checkbox" role="checkbox" checked={isPurchased} onChange={togglePurchaseStatus} />
	);
	const itemName = <span>{name}</span>;
	const itemCategory = <span>{category}</span>;
	const itemQuantity = <span>{quantity}</span>;
	const editBtn = (
		<button onClick={setEditState} className="btn">
			Edit
		</button>
	);
	const deleteBtn = (
		<button onClick={deleteItem} className="btn btn-danger">
			Delete
		</button>
	);

	const editTemplate = () => {
		return <ShoppingFormEdit product={product} onBtnClick={onBtnClick} />;
	};

	const viewTemplate = () => {
		return (
			<>
				<div>
					{checkbox} {itemName} {itemCategory} {itemQuantity}
				</div>
				<div>
					{editBtn}
					{deleteBtn}
				</div>
			</>
		);
	};

	return <li>{isItemEdit ? editTemplate() : viewTemplate()}</li>;
};

export default ShoppingItem;
