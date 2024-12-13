export interface MarketResponse {
  address: string;
  categoryId: string;
  coupons: number;
  cover: string;
  description: string;
  id: string;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  rules: Rule[];
}

interface Rule {
  description: string;
  id: string;
  marketId: string;
}
