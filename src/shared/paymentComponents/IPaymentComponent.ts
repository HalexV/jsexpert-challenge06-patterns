interface Product {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

interface IPayWithBoletoDTO {
  customerName: string;
  productList: Product[];
}

interface IPayWithCreditCardDTO {
  ownerName: string;
  cardNumber: string;
  expireData: string;
  secureCode: string;
  productList: Product[];
}

interface IPayWithPixDTO {
  customerName: string;
  productList: Product[];
}

interface IBoletoResponse {
  boletoDoc: string;
  boletoCode: string;
}

interface ICreditCardResponse {
  transactionCode: string;
}

interface IPixResponse {
  qrcode: string;
  transactionCode: string;
}

export default interface IPaymentComponent {
  payWithBoleto: (data: IPayWithBoletoDTO) => Promise<IBoletoResponse>;
  payWithCreditCard: (
    data: IPayWithCreditCardDTO
  ) => Promise<ICreditCardResponse>;
  payWithPix: (data: IPayWithPixDTO) => Promise<IPixResponse>;
}

export {
  Product,
  IPayWithBoletoDTO,
  IPayWithCreditCardDTO,
  IPayWithPixDTO,
  IBoletoResponse,
  ICreditCardResponse,
  IPixResponse,
};
