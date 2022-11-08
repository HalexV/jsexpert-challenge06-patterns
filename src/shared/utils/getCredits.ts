import { Product } from '../paymentComponents/IPaymentComponent';
import { Credit } from '../queueComponents/InMemory/InMemoryOrderQueue';

export default function getCredits(productList: Product[]): Credit[] {
  return productList.map((product) => ({
    id: product.id,
    quantity: product.quantity,
  }));
}
