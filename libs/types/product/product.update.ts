import { ProductGender, ProductSize, ProductStatus, ProductType } from '../../enums/product.enum';

export interface ProductUpdate {
	_id: string;
	productType?: ProductType;
	productStatus?: ProductStatus;
	productGender?: ProductGender;
	productSize?: ProductSize;
	productTitle?: string;
	productPrice?: number;
	productImages?: string[];
	productDesc?: string;
	soldAt?: Date;
	deletedAt?: Date;
	constructedAt?: Date;
}
