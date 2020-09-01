export type UserPayload = {
  name: string;
  lastname: number;
  password: string;
  email: string;
}

export type LoginPayload = {
  email: string;
  password: string;
}

export type UserPayloadResponse = {
  name: string;
  lastname: number;
  email: string;
}