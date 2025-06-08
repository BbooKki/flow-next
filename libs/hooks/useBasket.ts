import { useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import { basketVar } from '../../apollo/store';

export const useBasket = () => {
	const basketItems = useReactiveVar(basketVar);
	const [basketAnchor, setBasketAnchor] = useState<null | HTMLElement>(null);
	const basketOpen = Boolean(basketAnchor);

	const handleBasketClick = (event: React.MouseEvent<HTMLElement>) => {
		setBasketAnchor(event.currentTarget);
	};

	const handleBasketClose = () => {
		setBasketAnchor(null);
	};

	const updateItemQuantity = (itemId: string, newQuantity: number) => {
		const currentBasket = basketVar();
		if (newQuantity <= 0) {
			basketVar(currentBasket.filter((item) => item._id !== itemId));
		} else {
			basketVar(currentBasket.map((item) => (item._id === itemId ? { ...item, quantity: newQuantity } : item)));
		}
	};

	const removeItem = (itemId: string) => {
		const currentBasket = basketVar();
		basketVar(currentBasket.filter((item) => item._id !== itemId));
	};

	const getTotalPrice = () => {
		return basketItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);
	};

	const getTotalItems = () => {
		return basketItems.reduce((total, item) => total + item.quantity, 0);
	};

	const clearBasket = () => {
		basketVar([]);
	};

	return {
		basketItems,
		basketAnchor,
		basketOpen,
		handleBasketClick,
		handleBasketClose,
		updateItemQuantity,
		removeItem,
		getTotalPrice,
		getTotalItems,
		clearBasket,
	};
};
