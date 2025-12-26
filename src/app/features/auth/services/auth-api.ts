import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  API_ENDPOINTS,
  API_CONFIG,
} from '../../../core/constants/api.constants';
import {
  AuthResponse,
  ForgotPasswordResponse,
  SignInResponse,
  SignUpResponse,
  UserResponse,
} from '../models/auth-response.model';
import {
  ForgotPasswordRequest,
  SignInRequest,
  SignUpRequest,
} from '../models/auth-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_CONFIG.BASE_URL;

  signIn(request: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(
      `${this.baseUrl}${API_ENDPOINTS.AUTH.LOGIN}`,
      request
    );
  }

  signUp(request: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(
      `${this.baseUrl}${API_ENDPOINTS.AUTH.REGISTER}`,
      request
    );
  }

  forgotPassword(
    request: ForgotPasswordRequest
  ): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `${this.baseUrl}${API_ENDPOINTS.AUTH.FORGOT_PASSWORD}`,
      request
    );
  }

  sendOtp(email: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${API_ENDPOINTS.AUTH.SEND_OTP}`,
      { email },
      { responseType: 'text' }
    );
  }

  verifyOtp(email: string, otpCode: string): Observable<string> {
    return this.http.post(
      `${this.baseUrl}${API_ENDPOINTS.AUTH.VERIFY_OTP}`,
      { email, otpCode },
      { responseType: 'text' }
    );
  }
}
