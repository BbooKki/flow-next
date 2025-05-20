import { ProductStatus, ProductType, ProductGender, ProductSize } from '../../enums/product.enum';
import { Direction } from '../../enums/common.enum';

export interface ProductInput {
	productType: ProductType;
	productSize: ProductSize;
	productTitle: string;
	productPrice: number;
	productGender: ProductGender;
	productImages: string[];
	productDesc?: string;
	memberId?: string;
	constructedAt?: Date;
}

interface PISearch {
	memberId?: string;
	typeList?: ProductType[];
	genderList?: ProductGender[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	sizeRange?: SizeRange;
	text?: string;
}

export interface ProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	productStatus?: ProductStatus;
}

export interface AgentProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	productStatus?: ProductStatus;
	productGenderList?: ProductGender[];
}

export interface AllProductsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}

interface SizeRange {
	start?: ProductSize;
	end?: ProductSize;
}
