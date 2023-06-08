export interface User {
  uid: string;
  username: string;
  email: string;
  photo: string;
}

export interface UserResponse<T> {
  result: boolean;
  user: T;
}

export interface UserEmailResponse<T> {
  data: [T];
}
