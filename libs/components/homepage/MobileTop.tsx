import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import {
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	Drawer,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Box,
	Stack,
	Badge,
	Button,
	Menu,
	MenuItem,
	Avatar,
	Divider,
} from '@mui/material';
import {
	Menu as MenuIcon,
	Home as HomeIcon,
	Inventory as ProductsIcon,
	Business as BrandsIcon,
	Forum as CommunityIcon,
	Person as MyPageIcon,
	Support as CSIcon,
	ShoppingCart as ShoppingCartIcon,
	Notifications as NotificationsIcon,
	AccountCircle as AccountCircleIcon,
	Language as LanguageIcon,
	Logout,
} from '@mui/icons-material';
import { useReactiveVar } from '@apollo/client';
import { userVar, basketVar } from '../../../apollo/store';
import { getJwtToken, updateUserInfo, logOut } from '../../auth';
import { REACT_APP_API_URL } from '../../config';
import { MemberType } from '../../enums/member.enum';

const MobileTop = () => {
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const user = useReactiveVar(userVar);
	const basketItems = useReactiveVar(basketVar);

	// State management
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [langAnchor, setLangAnchor] = useState(null);
	const [userMenuAnchor, setUserMenuAnchor] = useState(null);
	const [lang, setLang] = useState('en');

	// Computed values
	const getTotalItems = () => basketItems.reduce((total, item) => total + item.quantity, 0);
	const langOpen = Boolean(langAnchor);
	const userMenuOpen = Boolean(userMenuAnchor);

	// Lifecycle
	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	useEffect(() => {
		const locale = localStorage.getItem('locale') || 'en';
		setLang(locale);
	}, [router]);

	useEffect(() => {
		localStorage.setItem('basket', JSON.stringify(basketItems));
	}, [basketItems]);

	// Handlers
	const toggleDrawer = (open: any) => (event: any) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawerOpen(open);
	};

	const handleLangClick = (event: any) => {
		setLangAnchor(event.currentTarget);
	};

	const handleLangClose = () => {
		setLangAnchor(null);
	};

	const handleUserMenuClick = (event: any) => {
		setUserMenuAnchor(event.currentTarget);
	};

	const handleUserMenuClose = () => {
		setUserMenuAnchor(null);
	};

	const langChoice = useCallback(
		async (langCode: any) => {
			setLang(langCode);
			localStorage.setItem('locale', langCode);
			setLangAnchor(null);
			await router.push(router.asPath, router.asPath, { locale: langCode });
		},
		[router],
	);

	const handleNavigation = (path: any) => {
		setDrawerOpen(false);
		router.push(path);
	};

	const handleLogout = () => {
		logOut();
		setUserMenuAnchor(null);
	};

	// Navigation items
	const navigationItems = [
		{ text: t('Home'), icon: <HomeIcon />, path: '/' },
		{ text: t('Products'), icon: <ProductsIcon />, path: '/product' },
		{ text: t('Brands'), icon: <BrandsIcon />, path: '/agent' },
		{ text: t('Community'), icon: <CommunityIcon />, path: '/community?articleCategory=FREE' },
		...(user?._id ? [{ text: t('My Page'), icon: <MyPageIcon />, path: '/mypage' }] : []),
		{ text: t('CS'), icon: <CSIcon />, path: '/cs' },
	];

	const languageOptions = [
		{ code: 'en', name: t('English'), flag: '/img/flag/langen.png' },
		{ code: 'kr', name: t('Korean'), flag: '/img/flag/langkr.png' },
		{ code: 'ru', name: t('Russian'), flag: '/img/flag/langru.png' },
	];

	const DrawerContent = (
		<Box sx={{ width: 280, height: '100%', backgroundColor: '#fff' }}>
			{/* Header */}
			<Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
				<Stack direction="row" alignItems="center" spacing={2}>
					<Box component={Link} href="/">
						<img src="/img/logo/logo-70.svg" alt="Flow" style={{ width: '40px', height: '40px' }} />
					</Box>
					<Typography variant="h6" color="default" fontWeight="bold">
						FLOW
					</Typography>
				</Stack>
			</Box>

			{/* User Section */}
			{user?._id ? (
				<Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
					<Stack direction="row" alignItems="center" spacing={2}>
						<Avatar
							src={user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'}
							sx={{ width: 48, height: 48 }}
						/>
						<Box>
							<Typography variant="body1" fontWeight="medium">
								{user?.memberNick || 'User'}
							</Typography>
							<Typography variant="caption" color="default">
								{user?.memberType}
							</Typography>
						</Box>
					</Stack>
				</Box>
			) : (
				<Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
					<Button
						fullWidth
						variant="outlined"
						startIcon={<AccountCircleIcon />}
						onClick={() => handleNavigation('/account/join')}
						sx={{ justifyContent: 'flex-start' }}
					>
						{t('Login')} / {t('Register')}
					</Button>
				</Box>
			)}

			{/* Navigation Items */}
			<List sx={{ py: 1 }}>
				{navigationItems.map((item, index) => (
					<ListItem
						key={index}
						button
						onClick={() => handleNavigation(item.path)}
						sx={{
							py: 1.5,
							'&:hover': { backgroundColor: '#f5f5f5' },
						}}
					>
						<ListItemIcon sx={{ color: 'default', minWidth: 40 }}>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} primaryTypographyProps={{ fontWeight: 'medium' }} />
					</ListItem>
				))}
			</List>

			<Divider />

			{/* Language Selector */}
			<Box sx={{ p: 2 }}>
				<Button
					fullWidth
					variant="outlined"
					startIcon={<LanguageIcon />}
					onClick={handleLangClick}
					sx={{ justifyContent: 'flex-start' }}
				>
					<img src={`/img/flag/lang${lang}.png`} alt="flag" style={{ width: 20, height: 15, marginRight: 8 }} />
					{languageOptions.find((opt) => opt.code === lang)?.name}
				</Button>
			</Box>

			{/* Logout Button */}
			{user?._id && (
				<Box sx={{ p: 2, mt: 'auto' }}>
					<Button
						fullWidth
						variant="outlined"
						startIcon={<Logout />}
						onClick={handleLogout}
						sx={{ justifyContent: 'flex-start' }}
					>
						{t('Logout')}
					</Button>
				</Box>
			)}
		</Box>
	);

	return (
		<>
			<AppBar
				position="fixed"
				sx={{
					background: 'transparent',
					boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
					color: '#333',
				}}
			>
				<Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
					{/* Menu Button */}
					<IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ p: 1 }}>
						<MenuIcon />
					</IconButton>

					{/* Logo */}
					<Box component={Link} href="/" sx={{ display: 'flex', alignItems: 'center' }}>
						<img src="/img/logo/logo-70.svg" alt="Flow" style={{ width: '32px', height: '32px' }} />
					</Box>

					{/* Right Side Icons */}
					<Stack direction="row" alignItems="center" spacing={1}>
						{/* Notifications */}
						{user?._id && (
							<IconButton color="inherit" size="small">
								<NotificationsIcon />
							</IconButton>
						)}

						{/* Shopping Cart */}
						{user?.memberType === MemberType.USER && (
							<IconButton color="inherit" size="small" onClick={() => router.push('/basket')}>
								<Badge badgeContent={getTotalItems()} color="error">
									<ShoppingCartIcon />
								</Badge>
							</IconButton>
						)}

						{/* User Menu */}
						{user?._id && (
							<IconButton color="inherit" size="small" onClick={handleUserMenuClick}>
								<Avatar
									src={user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'}
									sx={{ width: 28, height: 28 }}
								/>
							</IconButton>
						)}
					</Stack>
				</Toolbar>
			</AppBar>

			{/* Drawer */}
			<Drawer
				anchor="left"
				open={drawerOpen}
				onClose={toggleDrawer(false)}
				PaperProps={{
					sx: { width: 280 },
				}}
			>
				{DrawerContent}
			</Drawer>

			{/* Language Menu */}
			<Menu
				anchorEl={langAnchor}
				open={langOpen}
				onClose={handleLangClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{languageOptions.map((option) => (
					<MenuItem key={option.code} onClick={() => langChoice(option.code)}>
						<img src={option.flag} alt={option.name} style={{ width: 20, height: 15, marginRight: 8 }} />
						{option.name}
					</MenuItem>
				))}
			</Menu>

			{/* User Menu */}
			<Menu
				anchorEl={userMenuAnchor}
				open={userMenuOpen}
				onClose={handleUserMenuClose}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem
					onClick={() => {
						handleUserMenuClose();
						router.push('/mypage');
					}}
				>
					<MyPageIcon sx={{ mr: 1 }} />
					{t('My Page')}
				</MenuItem>
				<MenuItem onClick={handleLogout}>
					<Logout sx={{ mr: 1, color: 'error.main' }} />
					{t('Logout')}
				</MenuItem>
			</Menu>

			{/* Spacer for fixed AppBar */}
			<Toolbar />
		</>
	);
};

export default MobileTop;
