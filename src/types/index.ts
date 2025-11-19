export type Listing = {
  id: string;
  title: string;
  description?: string;
  img: string;
  // biome-ignore lint/style/useNamingConvention: matches Listing type
  seller_id: string; //seller's user id
  price: number;
  category?: string;
  subCategory?: string;
  color?: string;
  size?: string;
  condition?: string;
  gender?: string;
  created: string;
};

export type NewListing = Omit<Listing, "id" | "created">;

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  rating?: number;
};
