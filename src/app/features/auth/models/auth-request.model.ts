import { Department } from '../../../shared/models/user.model';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  password: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  password: string;
}