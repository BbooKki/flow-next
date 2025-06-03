import { basketVar, BasketItem } from '../../apollo/store';

export const addToBasket = (product: {
	_id: string;
	productTitle: string;
	productPrice: number;
	productImage?: string;
}) => {
	const currentBasket = basketVar();
	const existingItem = currentBasket.find((item) => item._id === product._id);

	if (existingItem) {
		// If item already exists, increase quantity
		basketVar(
			currentBasket.map((item) => (item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)),
		);
	} else {
		// Add new item to basket
		const newItem: BasketItem = {
			_id: product._id,
			productTitle: product.productTitle,
			productPrice: product.productPrice,
			productImage: product.productImage,
			quantity: 1,
		};
		basketVar([...currentBasket, newItem]);
	}
};

export const removeFromBasket = (productId: string) => {
	const currentBasket = basketVar();
	basketVar(currentBasket.filter((item) => item._id !== productId));
};

export const updateBasketItemQuantity = (productId: string, quantity: number) => {
	const currentBasket = basketVar();
	if (quantity <= 0) {
		removeFromBasket(productId);
	} else {
		basketVar(currentBasket.map((item) => (item._id === productId ? { ...item, quantity } : item)));
	}
};

export const clearBasket = () => {
	basketVar([]);
};

export const getBasketTotal = () => {
	const basket = basketVar();
	return basket.reduce((total, item) => total + item.productPrice * item.quantity, 0);
};

export const getBasketItemCount = () => {
	const basket = basketVar();
	return basket.reduce((total, item) => total + item.quantity, 0);
};
