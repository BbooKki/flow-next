import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Box, Modal, Divider, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';

const HeaderInfo = () => {
	const device = useDeviceDetect();
	const { t, i18n } = useTranslation('common');

	if (device === 'mobile') {
		return <div>HEADER INFO MOBILE</div>;
	} else {
		return (
			<>
				<Stack className={'home-header-box'}>
					<Stack className={'home-header-category'}>
						<span>{t('MEN')}</span>
						<span>{t('WOMEN')}</span>
						<span>{t('KIDS')}</span>
					</Stack>
					<Stack className={'home-header-info'}>
						<Stack className={'home-header-elements'}>
							<Stack className={'home-header-text'}>
								<Box className={'home-collection'}>NEW COLLECTION</Box>
								<Box className={'home-time'}>Summer</Box>
								<Box className={'home-time'}>2024</Box>
							</Stack>

							<Link href={'/product'} className={'home-header-button-box'}>
								<Button className={'home-header-button'}>Go To Shop</Button>
								<div>
									<svg xmlns="http://www.w3.org/2000/svg" width="50" height="14" viewBox="0 0 50 14" fill="none">
										<path
											d="M1 7H48.5M48.5 7L42.5 1M48.5 7L42.5 13"
											stroke="black"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
							</Link>
						</Stack>
						<Stack className={'home-header-img'} flexDirection={'row'}>
							<Link href={'/product'} className={'img-box-one'}></Link>
							<Link href={'/product'} className={'img-box-two'}></Link>
						</Stack>
					</Stack>
				</Stack>
			</>
		);
	}
};

export default HeaderInfo;
