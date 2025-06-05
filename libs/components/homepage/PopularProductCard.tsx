import React, { useState } from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Product } from '../../types/product/product';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topProductRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useTranslation } from 'react-i18next';

interface PopularProductCardProps {
	product: Product;
	likeProductHandler: any;
	buyProductHandler: any;
}

const PopularProductCard = (props: PopularProductCardProps) => {
	const { product, likeProductHandler, buyProductHandler } = props;
	const device = useDeviceDetect();
	const { t } = useTranslation('common');
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
			<Stack className="popular-card-box" key={product._id}>
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
						<Box className={'buy-btn'} color={'default'} onClick={handleBuyClick} disabled={isAddingToCart}>
							Buy
						</Box>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${product?.productImages[0]})` }}
					onClick={() => pushDetailHandler(product._id)}
				>
					<div>${product?.productPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'} onClick={() => pushDetailHandler(product._id)}>
						{product.productTitle}
					</strong>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
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
						<Box className={'buy-btn'} color={'default'} onClick={handleBuyClick} disabled={isAddingToCart}>
							Buy
						</Box>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default PopularProductCard;
