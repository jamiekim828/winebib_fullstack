export type User = {
  userName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type UserData = {
  _id: string;
  email: string;
  userName: string;
  isAdmin: boolean;
}

export type Wine = {};

export type Cart = {};
