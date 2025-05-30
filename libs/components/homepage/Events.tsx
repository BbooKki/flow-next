import React from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';

interface EventData {
	eventTitle: string;
	city: string;
	description: string;
	imageSrc: string;
}
const eventsData: EventData[] = [
	{
		eventTitle: 'Busan Grand Sale',
		city: 'Incheon',
		description:
			'Don’t miss Busan’s biggest shopping extravaganza! The Busan Grand Sale features major discounts across top brands, local shops, and department stores citywide.',
		imageSrc: '/img/events/sale.webp',
	},
	{
		eventTitle: 'Haeundae Summer Shopping Week',
		city: 'Seoul',
		description:
			'Enjoy a week of unbeatable summer deals near Haeundae Beach! From fashion to souvenirs, shop your favorites while soaking in the sun and sea breeze.',
		imageSrc: '/img/events/sale.avif',
	},
	{
		eventTitle: 'Seomyeon Style Festival',
		city: 'Busan',
		description:
			'Head to Seomyeon for massive fashion discounts, beauty giveaways, and limited-time brand pop-ups. Your ultimate destination for trendy shopping in Busan!',
		imageSrc: '/img/events/sale2.jpg',
	},
	{
		eventTitle: 'Busan Night Market Sale',
		city: 'Busan',
		description:
			'Experience the charm of Busan’s night markets with exclusive evening discounts, street food, and live performances. A perfect blend of shopping and culture!',
		imageSrc: '/img/events/sale.avif',
	},
];

const EventCard = ({ event }: { event: EventData }) => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack
				className="event-card"
				style={{
					backgroundImage: `url(${event?.imageSrc})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<Box component={'div'} className={'info'}>
					<strong>{event?.city}</strong>
					<span>{event?.eventTitle}</span>
				</Box>
				<Box component={'div'} className={'more'}>
					<span>{event?.description}</span>
				</Box>
			</Stack>
		);
	}
};

const Events = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return <div>EVENT CARD</div>;
	} else {
		return (
			<Stack className={'events'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span className={'white'}>Events</span>
							<p className={'white'}>Events waiting your attention!</p>
						</Box>
					</Stack>
					<Stack className={'card-wrapper'}>
						{eventsData.map((event: EventData) => {
							return <EventCard event={event} key={event?.eventTitle} />;
						})}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default Events;
