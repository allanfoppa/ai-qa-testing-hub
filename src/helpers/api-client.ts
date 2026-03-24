import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * BaseApiClient provides a standardized way to interact with
 * the various backend services registered in the hub.
 */
export class BaseApiClient {
  protected axiosInstance: AxiosInstance;

  constructor(baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Common GET method with error handling
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Common POST method
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any): void {
    // English comments as per project guidelines
    // Log details for AI-assisted debugging
    console.error(`[API Error]: ${error.response?.status} - ${error.message}`);
  }
}
