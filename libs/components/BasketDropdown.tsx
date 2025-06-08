import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
	Box,
	Badge,
	Typography,
	IconButton,
	Divider,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useBasket } from '../hooks/useBasket';
import { REACT_APP_API_URL } from '../config';
import { MemberType } from '../enums/member.enum';

const BasketMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 350,
		maxWidth: 400,
		maxHeight: 500,
		color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '0',
		},
	},
}));

interface BasketDropdownProps {
	user: any;
}

const BasketDropdown: React.FC<BasketDropdownProps> = ({ user }) => {
	const { t } = useTranslation('common');
	const router = useRouter();
	const {
		basketItems,
		basketAnchor,
		basketOpen,
		handleBasketClick,
		handleBasketClose,
		updateItemQuantity,
		removeItem,
		getTotalPrice,
		getTotalItems,
		clearBasket,
	} = useBasket();

	if (user?.memberType !== MemberType.USER) {
		return null;
	}

	return (
		<>
			<IconButton onClick={handleBasketClick} className={'shopping_cart'}>
				<Badge badgeContent={getTotalItems()} color="error">
					<ShoppingCartIcon sx={{ width: '24px', height: '24px', color: '#000' }} />
				</Badge>
			</IconButton>

			<BasketMenu anchorEl={basketAnchor} open={basketOpen} onClose={handleBasketClose}>
				<Box sx={{ p: 2 }}>
					<Typography variant="h6" sx={{ mb: 1 }}>
						{t('Shopping Cart')} ({getTotalItems()} {t('items')})
					</Typography>
					<Divider />
				</Box>

				{basketItems.length === 0 ? (
					<Box sx={{ p: 3, textAlign: 'center' }}>
						<Typography variant="body2" color="text.secondary">
							{t('Your cart is empty')}
						</Typography>
					</Box>
				) : (
					<>
						<List sx={{ maxHeight: 300, overflow: 'auto' }}>
							{basketItems.map((item) => (
								<ListItem key={item._id} sx={{ py: 1 }}>
									<ListItemAvatar>
										<Avatar
											src={item.productImage ? `${REACT_APP_API_URL}/${item.productImage}` : '/img/product/default.svg'}
											alt={item.productTitle}
											variant="rounded"
										/>
									</ListItemAvatar>
									<ListItemText
										primary={
											<Typography variant="body2" noWrap>
												{item.productTitle}
											</Typography>
										}
										secondary={
											<Typography variant="caption" color="default">
												${item.productPrice}
											</Typography>
										}
									/>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
										<IconButton size="small" onClick={() => updateItemQuantity(item._id, item.quantity - 1)}>
											<RemoveIcon fontSize="small" />
										</IconButton>
										<Typography variant="body2" sx={{ minWidth: 20, textAlign: 'center' }}>
											{item.quantity}
										</Typography>
										<IconButton size="small" onClick={() => updateItemQuantity(item._id, item.quantity + 1)}>
											<AddIcon fontSize="small" />
										</IconButton>
										<IconButton size="small" onClick={() => removeItem(item._id)} color="error">
											<DeleteIcon fontSize="small" />
										</IconButton>
									</Box>
								</ListItem>
							))}
						</List>

						<Divider />

						<Box sx={{ p: 2 }}>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
								<Typography variant="subtitle1" fontWeight="bold">
									{t('Total')}: ${getTotalPrice().toFixed(2)}
								</Typography>
							</Box>

							<Box sx={{ display: 'flex', gap: 1 }}>
								<Button variant="outlined" size="small" onClick={clearBasket} fullWidth>
									{t('Clear Cart')}
								</Button>
								<Button
									variant="contained"
									size="small"
									onClick={() => {
										handleBasketClose();
										router.push('');
									}}
									fullWidth
								>
									{t('Checkout')}
								</Button>
							</Box>
						</Box>
					</>
				)}
			</BasketMenu>
		</>
	);
};

export default BasketDropdown;
