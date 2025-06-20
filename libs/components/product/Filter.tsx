import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
	Menu,
	Collapse,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { ProductType, ProductSize, ProductGender } from '../../enums/product.enum';
import { ProductsInquiry } from '../../types/product/product.input';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface FilterType {
	searchFilter: ProductsInquiry;
	setSearchFilter: any;
	initialInput: ProductsInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [productGender, setProductGender] = useState<ProductGender[]>(Object.values(ProductGender));
	const [productType, setProductType] = useState<ProductType[]>(Object.values(ProductType));
	const [searchText, setSearchText] = useState<string>('');
	const [genderMenuAnchor, setGenderMenuAnchor] = useState<null | HTMLElement>(null);

	//FOR COLLAPSING SECTION
	const [genderExpanded, setGenderExpanded] = useState<boolean>(false);
	const [typeExpanded, setTypeExpanded] = useState<boolean>(false);
	/** LIFECYCLES **/
	// useEffect(() => {
	// 	if (searchFilter?.search?.genderList?.length == 0) {
	// 		delete searchFilter.search.genderList;
	// 		setShowMore(false);
	// 		router
	// 			.push(
	// 				`/product?input=${JSON.stringify({
	// 					...searchFilter,
	// 					search: {
	// 						...searchFilter.search,
	// 					},
	// 				})}`,
	// 				`/product?input=${JSON.stringify({
	// 					...searchFilter,
	// 					search: {
	// 						...searchFilter.search,
	// 					},
	// 				})}`,
	// 				{ scroll: false },
	// 			)
	// 			.then();
	// 	}

	// 	if (searchFilter?.search?.typeList?.length == 0) {
	// 		delete searchFilter.search.typeList;
	// 		router
	// 			.push(
	// 				`/product?input=${JSON.stringify({
	// 					...searchFilter,
	// 					search: {
	// 						...searchFilter.search,
	// 					},
	// 				})}`,
	// 				`/product?input=${JSON.stringify({
	// 					...searchFilter,
	// 					search: {
	// 						...searchFilter.search,
	// 					},
	// 				})}`,
	// 				{ scroll: false },
	// 			)
	// 			.then();
	// 	}

	// 	// HERE IMPLEMENT THE PRODUCT SIZE RANGE FILTER

	// 	// if (searchFilter?.search?.options?.length == 0) {
	// 	// 	delete searchFilter.search.options;
	// 	// 	router
	// 	// 		.push(
	// 	// 			`/product?input=${JSON.stringify({
	// 	// 				...searchFilter,
	// 	// 				search: {
	// 	// 					...searchFilter.search,
	// 	// 				},
	// 	// 			})}`,
	// 	// 			`/product?input=${JSON.stringify({
	// 	// 				...searchFilter,
	// 	// 				search: {
	// 	// 					...searchFilter.search,
	// 	// 				},
	// 	// 			})}`,
	// 	// 			{ scroll: false },
	// 	// 		)
	// 	// 		.then();
	// 	// }

	// 	if (searchFilter?.search?.genderList) setShowMore(true);
	// }, [searchFilter]);

	/** HANDLERS **/
	const handleGenderMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setGenderMenuAnchor(event.currentTarget);
	};

	const handleGenderMenuClose = () => {
		setGenderMenuAnchor(null);
	};

	//handlers for expand/collapse
	const handleGenderToggle = () => {
		setGenderExpanded(!genderExpanded);
	};

	const handleTypeToggle = () => {
		setTypeExpanded(!typeExpanded);
	};

	const productGenderSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, genderList: [...(searchFilter?.search?.genderList || []), value] },
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, genderList: [...(searchFilter?.search?.genderList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.genderList?.includes(value)) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								genderList: searchFilter?.search?.genderList?.filter((item: string) => item !== value),
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								genderList: searchFilter?.search?.genderList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('productGenderSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, productGenderSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/product?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('productTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, productTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const productPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/product?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/product?input=${JSON.stringify(initialInput)}`,
				`/product?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return (
			<Stack className={'container'}>
				<Stack className={'find-your-product-mobile'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Product</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'Search...'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-gender-type'}>
					<Stack className={'find-gender'} mb={'30px'} onClick={handleGenderToggle}>
						<Button
							// onClick={handleGenderToggle}
							endIcon={genderExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							sx={{
								justifyContent: 'space-between',
								textTransform: 'none',
								color: 'inherit',
								fontSize: 'inherit',
								fontWeight: 'inherit',
								padding: '8px 0',
								'&:hover': {
									backgroundColor: 'transparent',
								},
							}}
						>
							<Typography className={'title'}>Gender</Typography>
						</Button>
						<Collapse in={genderExpanded}>
							<Stack className={`product-gender`}>
								{productGender.map((gender: string) => {
									return (
										<Stack className={'input-box'} key={gender}>
											<Checkbox
												id={gender}
												className="product-checkbox"
												color="default"
												size="small"
												value={gender}
												checked={(searchFilter?.search?.genderList || []).includes(gender as ProductGender)}
												onChange={productGenderSelectHandler}
											/>
											<label htmlFor={gender} style={{ cursor: 'pointer' }}>
												<Typography className="product-type">{gender}</Typography>
											</label>
										</Stack>
									);
								})}
							</Stack>
						</Collapse>
					</Stack>
					<Stack className={'find-type'} mb={'30px'} onClick={handleTypeToggle}>
						<Button
							// onClick={handleTypeToggle}
							endIcon={typeExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							sx={{
								justifyContent: 'space-between',
								textTransform: 'none',
								color: 'inherit',
								fontSize: 'inherit',
								fontWeight: 'inherit',
								padding: '8px 0',
								'&:hover': {
									backgroundColor: 'transparent',
								},
							}}
						>
							<Typography className={'title'}>Product Type</Typography>
						</Button>
						<Collapse in={typeExpanded}>
							<Stack>
								{productType.map((type: string) => (
									<Stack className={'input-box'} key={type}>
										<Checkbox
											id={type}
											className="product-checkbox"
											color="default"
											size="small"
											value={type}
											onChange={productTypeSelectHandler}
											checked={(searchFilter?.search?.typeList || []).includes(type as ProductType)}
										/>
										<label htmlFor={type} style={{ cursor: 'pointer' }}>
											<Typography className="product_type">{type}</Typography>
										</label>
									</Stack>
								))}
							</Stack>
						</Collapse>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-product'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Product</Typography>
					<Stack className={'input-box'}>
						<OutlinedInput
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'Search...'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
						<img src={'/img/icons/search_icon.png'} alt={''} />
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>
				<Stack className={'find-your-product'} mb={'30px'}>
					<p className={'title'}>Gender</p>
					<Stack className={`product-gender`}>
						{productGender.map((gender: string) => {
							return (
								<Stack className={'input-box'} key={gender}>
									<Checkbox
										id={gender}
										className="product-checkbox"
										color="default"
										size="small"
										value={gender}
										checked={(searchFilter?.search?.genderList || []).includes(gender as ProductGender)}
										onChange={productGenderSelectHandler}
									/>
									<label htmlFor={gender} style={{ cursor: 'pointer' }}>
										<Typography className="product-type">{gender}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>
				<Stack className={'find-your-product'} mb={'30px'}>
					<Typography className={'title'}>Product Type</Typography>
					{productType.map((type: string) => (
						<Stack className={'input-box'} key={type}>
							<Checkbox
								id={type}
								className="product-checkbox"
								color="default"
								size="small"
								value={type}
								onChange={productTypeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(type as ProductType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="product_type">{type}</Typography>
							</label>
						</Stack>
					))}
				</Stack>
				<Stack className={'find-your-product'}>
					<Typography className={'title'}>Price Range</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productPriceHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									productPriceHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Filter;
