export type UserPayload = {
  name: string;
  lastname: string;
  password: string;
  email: string;
}

export type LoginPayload = {
  email: string;
  password: string;
}

export type UserPayloadResponse = {
  name: string;
  lastname: string;
  email: string;
}