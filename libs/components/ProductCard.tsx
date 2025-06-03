import React from 'react';
import { Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { addToBasket } from '../utils/basket';

interface Product {
	_id: string;
	productName: string;
	productPrice: number;
	productImage?: string;
	// other product properties...
}

interface ProductCardProps {
	product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const { t } = useTranslation('common');

	const handleBuyClick = () => {
		addToBasket({
			_id: product._id,
			productTitle: product.productName,
			productPrice: product.productPrice,
			productImage: product.productImage,
		});
	};

	return (
		<div className="product-card">
			<img src={product.productImage} alt={product.productName} />
			<h3>{product.productName}</h3>
			<p>${product.productPrice}</p>
			<Button onClick={handleBuyClick}>{t('Add to Cart')}</Button>
		</div>
	);
};

export default ProductCard;
