export interface ClientContext {
  id: string;
  name: string;
  marketSegment: 'retail' | 'ecommerce' | 'marketplace';
  country: string;
}
