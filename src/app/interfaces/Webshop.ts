import { INFTInfoDetail } from './NFT';

export interface IOrderItem {
  ID: string;
  quantity: number;
  product: IProductInfo;
  size: ISizeInfo;
  nft: INFTInfoDetail;
}

export interface ISizeInfo {
  id: string;
  productId: string;
  displayValue: string;
  width: number;
  height: number;
  price: number;
}

export interface IProductInfo {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface IOrderedProduct {
  product: string; //GUID
  size: string; //GUID
  quantity: number;
  totalPrice: number;
  ppu: number;
}

export interface IPaymentInfo {
  status: 'pending' | 'succesful';
}

export interface IShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2?: string;
  city: string;
  postcode: string;
  state?: string;
  country: string;
}

export interface IShippingCountry {
  name: string;
}
