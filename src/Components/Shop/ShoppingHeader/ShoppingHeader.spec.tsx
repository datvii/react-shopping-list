import { render, fireEvent } from '@testing-library/react';
import { ShoppingHeader } from '.';

jest.mock('../../../Store/shopStore', () => ({
	useShopStore: jest.fn(() => ({
		products: [],
		filteredProducts: [],
		productsHistory: [],
	})),
}));
describe('ShoppingHeader component', () => {
	it('renders with required props', () => {
		const props = {
			filterByCategory: jest.fn(),
			filterByPurchaseStatus: jest.fn(),
			undoLastAction: jest.fn(),
			resetFilters: jest.fn(),
			searchByName: jest.fn(),
		};

		const { getByText } = render(<ShoppingHeader {...props} />);

		expect(getByText('Shopping List')).toBeInTheDocument();
	});
	it('disables search input when no products or filtered products', () => {
		const props = {
			filterByCategory: jest.fn(),
			filterByPurchaseStatus: jest.fn(),
			undoLastAction: jest.fn(),
			resetFilters: jest.fn(),
			searchByName: jest.fn(),
		};

		const { getByPlaceholderText } = render(<ShoppingHeader {...props} />);
		const searchInput = getByPlaceholderText('Search an item');

		expect(searchInput).toBeDisabled();
	});

	it('renders filter buttons and they are clickable', () => {
		const props = {
			filterByCategory: jest.fn(),
			filterByPurchaseStatus: jest.fn(),
			undoLastAction: jest.fn(),
			resetFilters: jest.fn(),
			searchByName: jest.fn(),
		};

		const { getByText } = render(<ShoppingHeader {...props} />);
		const filterByCategoryButton = getByText('Filter by Category');
		const filterByPurchaseStatusButton = getByText('Filter by Purchase Status');
		const resetFiltersButton = getByText('Reset Filters');

		fireEvent.click(filterByCategoryButton);
		fireEvent.click(filterByPurchaseStatusButton);
		fireEvent.click(resetFiltersButton);

		expect(props.filterByCategory).toHaveBeenCalledTimes(1);
		expect(props.filterByPurchaseStatus).toHaveBeenCalledTimes(1);
		expect(props.resetFilters).toHaveBeenCalledTimes(1);
	});
	it('disables undo last action button when no products history', () => {
		const props = {
			filterByCategory: jest.fn(),
			filterByPurchaseStatus: jest.fn(),
			undoLastAction: jest.fn(),
			resetFilters: jest.fn(),
			searchByName: jest.fn(),
		};

		const { getByText } = render(<ShoppingHeader {...props} />);
		const undoLastActionButton = getByText('Undo last action');

		expect(undoLastActionButton).toBeDisabled();
	});
	it('enables undo last action button when products history exists', () => {
		const props = {
			filterByCategory: jest.fn(),
			filterByPurchaseStatus: jest.fn(),
			undoLastAction: jest.fn(),
			resetFilters: jest.fn(),
			searchByName: jest.fn(),
		};

		jest.mock('../../../Store/shopStore', () => ({
			useShopStore: jest.fn(() => ({
				products: [],
				filteredProducts: [],
				productsHistory: [{ id: 1, name: 'Product 1' }],
			})),
		}));

		const { getByText } = render(<ShoppingHeader {...props} />);
		const undoLastActionButton = getByText('Undo last action');

		expect(undoLastActionButton).toBeDisabled();
	});
});
