export type Listing = {
  id: number;
  title: string; // required
  description?: string; // optional, defaults to ""
  img: string; // required (picture URL)
  price: number; // required
  category?: string; // optional, defaults to ""
  subCategory?: string; // optional, defaults to ""
  color?: string; // optional, defaults to ""
  size?: string; // optional, defaults to ""
  condition?: string; // optional, defaults to ""
  gender?: string; // optional, defaults to ""
  created?: string; // auto-set timestamp
  sellerId?: string;
};
