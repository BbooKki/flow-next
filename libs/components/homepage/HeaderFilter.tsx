import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Stack, Box, Modal, Divider, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { productYears } from '../../config';
import { ProductGender, ProductSize, ProductType } from '../../enums/product.enum';
import { ProductsInquiry } from '../../types/product/product.input';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 'auto',
	bgcolor: 'background.paper',
	borderRadius: '12px',
	outline: 'none',
	boxShadow: 24,
};

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

const thisYear = new Date().getFullYear();

interface HeaderFilterProps {
	initialInput: ProductsInquiry;
}

const HeaderFilter = (props: HeaderFilterProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');
	const [searchFilter, setSearchFilter] = useState<ProductsInquiry>(initialInput);
	// const genderRef: any = useRef();
	// const typeRef: any = useRef();
	const roomsRef: any = useRef();
	const router = useRouter();
	const [openAdvancedFilter, setOpenAdvancedFilter] = useState(false);
	// const [openGender, setOpenGender] = useState(false);
	// const [openType, setOpenType] = useState(false);
	const [openRooms, setOpenRooms] = useState(false);
	// Here implement the productSize filter
	// const [productGender, setProductGender] = useState<ProductGender[]>(Object.values(ProductGender));
	// const [productType, setProductType] = useState<ProductType[]>(Object.values(ProductType));
	const [yearCheck, setYearCheck] = useState({ start: 1970, end: thisYear });
	const [optionCheck, setOptionCheck] = useState('all');

	/** LIFECYCLES **/
	useEffect(() => {
		const clickHandler = (event: MouseEvent) => {
			// if (!genderRef?.current?.contains(event.target)) {
			// 	setOpenGender(false);
			// }

			// if (!typeRef?.current?.contains(event.target)) {
			// 	setOpenType(false);
			// }

			if (!roomsRef?.current?.contains(event.target)) {
				setOpenRooms(false);
			}
		};

		document.addEventListener('mousedown', clickHandler);

		return () => {
			document.removeEventListener('mousedown', clickHandler);
		};
	}, []);

	/** HANDLERS **/
	const advancedFilterHandler = (status: boolean) => {
		// setOpenGender(false);
		// setOpenType(false);
		setOpenAdvancedFilter(status);
	};

	// const genderStateChangeHandler = () => {
	// 	setOpenGender((prev) => !prev);
	// 	setOpenType(false);
	// };

	// const typeStateChangeHandler = () => {
	// 	setOpenType((prev) => !prev);
	// 	setOpenGender(false);
	// 	setOpenRooms(false);
	// };

	const roomStateChangeHandler = () => {
		setOpenRooms((prev) => !prev);
		// setOpenType(false);
		// setOpenGender(false);
	};

	const disableAllStateHandler = () => {
		setOpenRooms(false);
		// setOpenType(false);
		// setOpenGender(false);
	};

	// const productGenderSelectHandler = useCallback(
	// 	async (value: any) => {
	// 		try {
	// 			setSearchFilter({
	// 				...searchFilter,
	// 				search: {
	// 					...searchFilter.search,
	// 					genderList: [value],
	// 				},
	// 			});
	// 			typeStateChangeHandler();
	// 		} catch (err: any) {
	// 			console.log('ERROR, productGenderSelectHandler:', err);
	// 		}
	// 	},
	// 	[searchFilter],
	// );

	// const productTypeSelectHandler = useCallback(
	// 	async (value: any) => {
	// 		try {
	// 			setSearchFilter({
	// 				...searchFilter,
	// 				search: {
	// 					...searchFilter.search,
	// 					typeList: [value],
	// 				},
	// 			});
	// 			roomStateChangeHandler();
	// 		} catch (err: any) {
	// 			console.log('ERROR, productTypeSelectHandler:', err);
	// 		}
	// 	},
	// 	[searchFilter],
	// );

	// const productOptionSelectHandler = useCallback(
	// 	async (e: any) => {
	// 		try {
	// 			const value = e.target.value;
	// 			setOptionCheck(value);

	// 			if (value !== 'all') {
	// 				setSearchFilter({
	// 					...searchFilter,
	// 					search: {
	// 						...searchFilter.search,
	// 						options: [value],
	// 					},
	// 				});
	// 			} else {
	// 				delete searchFilter.search.options;
	// 				setSearchFilter({
	// 					...searchFilter,
	// 					search: {
	// 						...searchFilter.search,
	// 					},
	// 				});
	// 			}
	// 		} catch (err: any) {
	// 			console.log('ERROR, productOptionSelectHandler:', err);
	// 		}
	// 	},
	// 	[searchFilter],
	// );

	const yearStartChangeHandler = async (event: any) => {
		setYearCheck({ ...yearCheck, start: Number(event.target.value) });

		setSearchFilter({
			...searchFilter,
			search: {
				...searchFilter.search,
				periodsRange: { start: Number(event.target.value), end: yearCheck.end },
			},
		});
	};

	const yearEndChangeHandler = async (event: any) => {
		setYearCheck({ ...yearCheck, end: Number(event.target.value) });

		setSearchFilter({
			...searchFilter,
			search: {
				...searchFilter.search,
				periodsRange: { start: yearCheck.start, end: Number(event.target.value) },
			},
		});
	};

	const resetFilterHandler = () => {
		setSearchFilter(initialInput);
		setOptionCheck('all');
		setYearCheck({ start: 1970, end: thisYear });
	};

	const pushSearchHandler = async () => {
		try {
			if (searchFilter?.search?.genderList?.length == 0) {
				delete searchFilter.search.genderList;
			}

			if (searchFilter?.search?.typeList?.length == 0) {
				delete searchFilter.search.typeList;
			}

			await router.push(
				`/product?input=${JSON.stringify(searchFilter)}`,
				`/product?input=${JSON.stringify(searchFilter)}`,
			);
		} catch (err: any) {
			console.log('ERROR, pushSearchHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>HEADER FILTER MOBILE</div>;
	} else {
		return (
			<>
				<Stack className={'search-box'}>
					<Stack>
						<span>{t('MEN')}</span>
						<span>{t('WOMEN')}</span>
						<span>{t('KIDS')}</span>
					</Stack>
					<Stack className={'search-box-other'}>
						<input type="text" />
						<Box className={'search-btn'} onClick={pushSearchHandler}>
							<img src="/img/icons/search_white.svg" alt="" />
						</Box>
					</Stack>

					{/*MENU */}
					{/* <div className={`filter-gender ${openGender ? 'on' : ''}`} ref={genderRef}>
						{productGender.map((gender: string) => {
							return (
								<div onClick={() => productGenderSelectHandler(gender)} key={gender}>
									<img src={`img/banner/cities/${gender}.webp`} alt="" />
									<span>{gender}</span>
								</div>
							);
						})}
					</div>

					<div className={`filter-type ${openType ? 'on' : ''}`} ref={typeRef}>
						{productType.map((type: string) => {
							return (
								<div
									style={{ backgroundImage: `url(/img/banner/types/${type.toLowerCase()}.webp)` }}
									onClick={() => productTypeSelectHandler(type)}
									key={type}
								>
									<span>{type}</span>
								</div>
							);
						})}
					</div> */}
				</Stack>

				{/* ADVANCED FILTER MODAL */}
				<Modal
					open={openAdvancedFilter}
					onClose={() => advancedFilterHandler(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					{/* @ts-ignore */}
					<Box sx={style}>
						<Box className={'advanced-filter-modal'}>
							<div className={'close'} onClick={() => advancedFilterHandler(false)}>
								<CloseIcon />
							</div>
							<div className={'top'}>
								<span>Find your home</span>
								<div className={'search-input-box'}>
									<img src="/img/icons/search.svg" alt="" />
									<input
										value={searchFilter?.search?.text ?? ''}
										type="text"
										placeholder={'What are you looking for?'}
										onChange={(e: any) => {
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: e.target.value },
											});
										}}
									/>
								</div>
							</div>
							<Divider sx={{ mt: '30px', mb: '35px' }} />
							<div className={'middle'}>
								<div className={'row-box'}>{/* YOU CAN WRITE THE LOGIC HERE */}</div>
								<div className={'row-box'} style={{ marginTop: '44px' }}>
									<div className={'box'}>
										<span>Year Built</span>
										<div className={'inside space-between align-center'}>
											<FormControl sx={{ width: '122px' }}>
												<Select
													value={yearCheck.start.toString()}
													onChange={yearStartChangeHandler}
													displayEmpty
													inputProps={{ 'aria-label': 'Without label' }}
													MenuProps={MenuProps}
												>
													{productYears?.slice(0)?.map((year: number) => (
														<MenuItem value={year} disabled={yearCheck.end <= year} key={year}>
															{year}
														</MenuItem>
													))}
												</Select>
											</FormControl>
											<div className={'minus-line'}></div>
											<FormControl sx={{ width: '122px' }}>
												<Select
													value={yearCheck.end.toString()}
													onChange={yearEndChangeHandler}
													displayEmpty
													inputProps={{ 'aria-label': 'Without label' }}
													MenuProps={MenuProps}
												>
													{productYears
														?.slice(0)
														.reverse()
														.map((year: number) => (
															<MenuItem value={year} disabled={yearCheck.start >= year} key={year}>
																{year}
															</MenuItem>
														))}
												</Select>
											</FormControl>
										</div>
									</div>
									{/* <div className={'box'}>
										<span>square meter</span>
										<div className={'inside space-between align-center'}>
											<FormControl sx={{ width: '122px' }}>
												<Select
													value={searchFilter?.search?.sizeRange?.start}
													onChange={(e: any) => producHandler(e, 'start')}
													displayEmpty
													inputProps={{ 'aria-label': 'Without label' }}
													MenuProps={MenuProps}
												>
													{productSquare.map((square: number) => (
														<MenuItem
															value={square}
															disabled={(searchFilter?.search?.squaresRange?.end || 0) < square}
															key={square}
														>
															{square}
														</MenuItem>
													))}
												</Select>
											</FormControl>
											<div className={'minus-line'}></div>
											<FormControl sx={{ width: '122px' }}>
												<Select
													value={searchFilter?.search?.squaresRange?.end}
													onChange={(e: any) => productSquareHandler(e, 'end')}
													displayEmpty
													inputProps={{ 'aria-label': 'Without label' }}
													MenuProps={MenuProps}
												>
													{productSquare.map((square: number) => (
														<MenuItem
															value={square}
															disabled={(searchFilter?.search?.squaresRange?.start || 0) > square}
															key={square}
														>
															{square}
														</MenuItem>
													))}
												</Select>
											</FormControl>
										</div>
									</div> */}
								</div>
							</div>
							<Divider sx={{ mt: '60px', mb: '18px' }} />
							<div className={'bottom'}>
								<div onClick={resetFilterHandler}>
									<img src="/img/icons/reset.svg" alt="" />
									<span>Reset all filters</span>
								</div>
								<Button
									startIcon={<img src={'/img/icons/search.svg'} />}
									className={'search-btn'}
									onClick={pushSearchHandler}
								>
									Search
								</Button>
							</div>
						</Box>
					</Box>
				</Modal>
			</>
		);
	}
};

HeaderFilter.defaultProps = {
	initialInput: {
		page: 1,
		limit: 9,
		search: {
			squaresRange: {
				start: 0,
				end: 500,
			},
			pricesRange: {
				start: 0,
				end: 2000000,
			},
		},
	},
};

export default HeaderFilter;
