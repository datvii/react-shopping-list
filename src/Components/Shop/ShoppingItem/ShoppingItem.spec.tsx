import { render, fireEvent } from '@testing-library/react';
import { ShoppingItemType } from '../types';
import ShoppingItem from '.';

jest.mock('../../../Store/shopStore', () => ({
	useShopStore: jest.fn(() => ({
		removeProduct: jest.fn(),
		togglePurchaseStatus: jest.fn(),
	})),
}));

describe('ShoppingItem component', () => {
	const product: ShoppingItemType = {
		id: '1',
		name: 'Test Product',
		isPurchased: false,
		category: 'Fruits',
		quantity: 2,
	};

	it('renders shopping item with correct name, category, and quantity', () => {
		const { getByText } = render(<ShoppingItem {...product} />);

		expect(getByText(product.name)).toBeInTheDocument();
		expect(getByText(product.category)).toBeInTheDocument();
		expect(getByText(String(product.quantity))).toBeInTheDocument();
	});

	it('toggles purchase status when checkbox is clicked', () => {
		const store = {
			togglePurchaseStatus: jest.fn(),
		};
		const togglePurchaseStatusMock = store.togglePurchaseStatus;

		store.togglePurchaseStatus('1');
		expect(togglePurchaseStatusMock).toHaveBeenCalledTimes(1);
	});

	it('deletes item when delete button is clicked', () => {
		const store = {
			removeProduct: jest.fn(),
		};
		const removeProductMock = store.removeProduct;

		store.removeProduct('1');
		expect(removeProductMock).toHaveBeenCalledTimes(1);
	});

	it('edits item when edit button is clicked', () => {
		const { getByText } = render(<ShoppingItem {...product} />);
		const editButton = getByText('Edit');

		fireEvent.click(editButton);
		expect(getByText('Update item')).toBeInTheDocument();
	});

	it('renders edit template when edit button is clicked', () => {
		const { getByText } = render(<ShoppingItem {...product} />);
		const editButton = getByText('Edit');

		fireEvent.click(editButton);
		expect(getByText('Update item')).toBeInTheDocument();
	});

	it('renders view template when edit is cancelled', () => {
		const { getByText } = render(<ShoppingItem {...product} />);
		const editButton = getByText('Edit');

		fireEvent.click(editButton);

		const cancelButton = getByText('Cancel');

		fireEvent.click(cancelButton);
		expect(getByText(product.name)).toBeInTheDocument();
	});
});
