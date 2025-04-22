import { ShoppingItemType } from '../types';
import ShoppingItem from '../ShoppingItem';
import styles from './styles.module.scss';

const ShoppingList = ({ items }: { items: ShoppingItemType[] }) => {
	return (
		<ul className={styles.list}>
			{items.map((product) => {
				return <ShoppingItem key={product.id} {...product} />;
			})}
		</ul>
	);
};

export default ShoppingList;
