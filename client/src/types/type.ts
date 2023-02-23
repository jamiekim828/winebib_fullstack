export type User = {
  userName?: string;
  email?: string;
  password: string;
  confirmPassword?: string;
};

export type UserData = {
  _id: string;
  email: string;
  userName: string;
  isAdmin: boolean;
}

export type Wine = {
  accidity: number;
  capacity: number;
  color: string;
  country: string;
  flag: string;
  grape: string[];
  image: string;
  name: string;
  pairing: string[];
  price: number;
  region: string;
  sweet: number;
  use: string[];
  _id: string;
};

export type Cart = {};
