import React, { useState } from 'react';
import { Stack, Box, Divider, IconButton, Typography, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Product } from '../../types/product/product';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'react-i18next';
import { Widgets } from '@mui/icons-material';

interface TrendProductCardProps {
	product: Product;
	likeProductHandler: any;
	buyProductHandler: any;
}

const TrendProductCard = (props: TrendProductCardProps) => {
	const { product, likeProductHandler, buyProductHandler } = props;
	const { t } = useTranslation('common');
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const [isAddingToCart, setIsAddingToCart] = useState(false);

	/** HANDLERS **/
	const pushDetailHandler = async (productId: string) => {
		console.log('productId: ', productId);
		await router.push({
			pathname: '/product/detail',
			query: { id: productId },
		});
	};

	const handleBuyClick = async (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsAddingToCart(true);

		try {
			await buyProductHandler(product);
		} finally {
			setIsAddingToCart(false);
		}
	};

	const imagePath = product?.productImages?.[0]
		? `${REACT_APP_API_URL}/${product.productImages[0]}`
		: '/img/product/default.svg';

	if (device === 'mobile') {
		return (
			<Stack className="trend-card-box" key={product._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${product?.productImages[0]})` }}
					onClick={() => {
						pushDetailHandler(product._id);
					}}
				>
					<div>${product.productPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong
						className={'title'}
						onClick={() => {
							pushDetailHandler(product._id);
						}}
					>
						{product.productTitle}
					</strong>
					<p className={'desc'}>{product.productDesc ?? 'no description'}</p>
					<Divider sx={{ mt: '10px', mb: '10px' }} />
					<div className={'bott'}>
						<div className="view-like-box">
							<IconButton color={'default'} style={{ width: '25px', height: '25px' }}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{product?.productViews}</Typography>
							<IconButton color={'default'} onClick={() => likeProductHandler(user, product?._id)}>
								{product?.meLiked && product?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red', width: '25px', height: '25px' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{product?.productLikes}</Typography>
						</div>
						<Button
							className={'buy-btn'}
							variant="contained"
							color="primary"
							onClick={handleBuyClick}
							disabled={isAddingToCart}
							size="small"
						>
							Buy
						</Button>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="trend-card-box" key={product._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${product?.productImages[0]})` }}
					onClick={() => {
						pushDetailHandler(product._id);
					}}
				>
					<div>${product.productPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong
						className={'title'}
						onClick={() => {
							pushDetailHandler(product._id);
						}}
					>
						{product.productTitle}
					</strong>
					<p className={'desc'}>{product.productDesc ?? 'no description'}</p>
					<Divider sx={{ mt: '5px', mb: '5px' }} />
					<div className={'bott'}>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{product?.productViews}</Typography>
							<IconButton color={'default'} onClick={() => likeProductHandler(user, product?._id)}>
								{product?.meLiked && product?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{product?.productLikes}</Typography>
						</div>
						<Button
							className={'buy-btn'}
							variant="contained"
							color="primary"
							onClick={handleBuyClick}
							disabled={isAddingToCart}
							size="small"
						>
							Buy
						</Button>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default TrendProductCard;
