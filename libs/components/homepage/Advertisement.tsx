import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Box, Stack } from '@mui/material';
import Link from 'next/link';

const Advertisement = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return <Stack className={'approach'}>"ADVERTISEMENT MOBILE"</Stack>;
	} else {
		return (
			<Stack className={'approach'} flexDirection={'column'}>
				<Stack className={'container'}>
					<Stack className={'approach-box'}>
						<Box className={'approach-title'}>Our Approach to fashion design</Box>
						<Box className={'approach-text'}>
							at elegant vogue , we blend creativity with craftsmanship to create fashion that transcends trends and
							stands the test of time each design is meticulously crafted, ensuring the highest quelity exqulsite finish
						</Box>
					</Stack>
					<Stack className={'approach-images'} flexDirection={'row'}>
						<Link href={'/product'} className={'approach-image-upper'}>
							<img src="/img/home/fash1.jpg" alt="" />
						</Link>
						<Link href={'/product'} className={'approach-image-lower'}>
							<img src="/img/home/fash2.jpg" alt="" />
						</Link>
						<Link href={'/product'} className={'approach-image-upper'}>
							<img src="/img/home/fash3.jpg" alt="" />
						</Link>
						<Link href={'/product'} className={'approach-image-lower'}>
							<img src="/img/home/fash4.jpg" alt="" />
						</Link>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Advertisement;
