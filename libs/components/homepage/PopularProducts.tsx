import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import PopularProductCard from './PopularProductCard';
import { Product } from '../../types/product/product';
import Link from 'next/link';
import { ProductsInquiry } from '../../types/product/product.input';
import { GET_PRODUCTS } from '../../../apollo/user/query';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { useTranslation } from 'react-i18next';
import { LIKE_TARGET_PRODUCT } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';
import { addToBasket } from '../../utils/basket';

interface PopularProductsProps {
	initialInput: ProductsInquiry;
}

const PopularProducts = (props: PopularProductsProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const { t } = useTranslation('common');
	const [popularProducts, setPopularProducts] = useState<Product[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);

	/** APOLLO REQUESTS **/
	const {
		loading: getProducts,
		data: getProductsData,
		error: getProductsError,
		refetch: getProductsRefetch,
	} = useQuery(GET_PRODUCTS, {
		fetchPolicy: 'cache-and-network',
		variables: {
			input: initialInput,
		},
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setPopularProducts(data?.getProducts?.list);
		},
	});

	/** HANDLERS **/
	const likeProductHandler = async (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			await likeTargetProduct({
				variables: { input: id },
			});

			await getProductsRefetch({ input: initialInput });

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeProductHandler: ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	const buyProductHandler = async (product: Product) => {
		try {
			if (!product) return;

			addToBasket({
				_id: product._id,
				productTitle: product.productTitle,
				productPrice: product.productPrice,
				productImage: product.productImages?.[0],
			});

			await sweetTopSmallSuccessAlert(t('Product added to cart!'), 1500);
		} catch (err: any) {
			console.log('ERROR, buyProductHandler: ', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};

	if (!popularProducts) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'popular-products'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>POPULAR</span>
						<span>COLLECTIONS</span>
						<span>24-25</span>
					</Stack>
					<Stack className={'card-box'}>
						{popularProducts.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Popular Empty
							</Box>
						) : (
							<Swiper
								className={'popular-product-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{popularProducts.map((product: Product) => {
									return (
										<SwiperSlide key={product._id} className={'popular-product-slide'}>
											<PopularProductCard
												product={product}
												likeProductHandler={likeProductHandler}
												buyProductHandler={buyProductHandler}
											/>
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'popular-products'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>POPULAR</span>
							<span>COLLECTIONS</span>
							<span>24-25</span>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<Link href={'/product'}>
									<span>See All Categories</span>
								</Link>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{popularProducts.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'popular-product-swiper'}
								slidesPerView={'auto'}
								spaceBetween={15}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-popular-next',
									prevEl: '.swiper-popular-prev',
								}}
								pagination={{
									el: '.swiper-popular-pagination',
								}}
							>
								{popularProducts.map((product: Product) => {
									return (
										<SwiperSlide key={product._id} className={'popular-product-slide'}>
											<PopularProductCard
												product={product}
												likeProductHandler={likeProductHandler}
												buyProductHandler={buyProductHandler}
											/>
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-popular-prev'} />
						<div className={'swiper-popular-pagination'}></div>
						<EastIcon className={'swiper-popular-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

PopularProducts.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'productViews',
		direction: 'DESC',
		search: {},
	},
};

export default PopularProducts;
