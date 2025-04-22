import { useForm } from 'react-hook-form';
import { ShoopingFormAddType, ShoopingFormEditType, ShopFormValues } from './types';
import styles from './styles.module.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useShopStore } from '../../../Store/shopStore';
import { ShoppingCategoryType, ShoppingItemType } from '../types';

const schema = yup
	.object()
	.shape({
		name: yup.string().required(),
		quantity: yup.number().required().min(1),
		category: yup.string().required(),
	})
	.required();

export function ShoppingFormAdd({ setCategory }: ShoopingFormAddType) {
	const { addProduct } = useShopStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ShopFormValues>({ resolver: yupResolver(schema) });

	const onSubmit = handleSubmit((data) => {
		const newData = { ...data };

		newData.id = Date.now().toString();
		newData.isPurchased = false;

		addProduct(newData as ShoppingItemType);
	});

	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<label htmlFor="name">
				<input {...register('name')} id="name" placeholder="Name" />
				{errors?.name && <p className={styles.error}>{errors.name.message}</p>}
			</label>

			<label htmlFor="quantity">
				<input
					{...register('quantity')}
					id="quantity"
					placeholder="Quantity"
					type="number"
					defaultValue={1}
				/>
				{errors?.quantity && <p className={styles.error}>{errors.quantity.message}</p>}
			</label>

			<select
				{...register('category')}
				onChange={(e) => setCategory?.(e.target.value as ShoppingCategoryType)}
			>
				<option value="Fruits">Fruits</option>
				<option value="Vegatables">Vegatables</option>
				<option value="Dairy">Dairy</option>
			</select>

			<button type="submit">Add item</button>
		</form>
	);
}

export function ShoppingFormEdit({ product, onBtnClick }: ShoopingFormEditType) {
	const { name, category, quantity } = product;

	const { editProduct } = useShopStore();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ShopFormValues>({ resolver: yupResolver(schema) });

	const onSubmit = handleSubmit((data) => {
		const updatedData = { ...data };

		updatedData.id = product.id;
		updatedData.isPurchased = product.isPurchased;

		onBtnClick();
		editProduct(updatedData as ShoppingItemType);
	});

	return (
		<form onSubmit={onSubmit} className={styles.form}>
			<label htmlFor="name">
				<input {...register('name')} id="name" defaultValue={name || ''} placeholder="Name" />
				{errors?.name && <p className={styles.error}>{errors.name.message}</p>}
			</label>

			<label htmlFor="quantity">
				<input
					{...register('quantity')}
					id="quantity"
					placeholder="Quantity"
					type="number"
					defaultValue={quantity || 1}
				/>
				{errors?.quantity && <p className={styles.error}>{errors.quantity.message}</p>}
			</label>

			<select {...register('category')} defaultValue={category || 'Fruits'}>
				<option value="Fruits">Fruits</option>
				<option value="Vegatables">Vegatables</option>
				<option value="Dairy">Dairy</option>
			</select>

			<button type="submit">Update item</button>
			<button type="button" onClick={onBtnClick}>
				Cancel
			</button>
		</form>
	);
}
