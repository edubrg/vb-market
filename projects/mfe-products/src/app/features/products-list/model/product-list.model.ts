export interface ProductListItem {
  id: string;
  clientId: string;
  name: string;
  category: string;
  price: number;
  currency: 'BRL';
  imageUrl?: string;
  status: 'active' | 'inactive';
}
