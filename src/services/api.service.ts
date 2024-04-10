import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders
} from 'axios';

type InfiniteDataResponse<T = any> = {
  result: T;
  total: number;
};

export type ResponseWithHeadersDto<T = any> = {
  data: T;
  headers?: AxiosResponseHeaders | RawAxiosResponseHeaders | AxiosResponseHeaders;
};

export class ApiService {
  private baseAxiosConfig: AxiosRequestConfig = {
    baseURL: process.env.REACT_APP_API_BASE_URL
  };

  public axiosInstance: AxiosInstance;

  private countOfActiveRequests = 0;

  constructor(axiosConfig?: AxiosRequestConfig) {
    this.axiosInstance = axios.create(axiosConfig || this.baseAxiosConfig);
    this.axiosInstance.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

    if (axiosConfig) {
      this.baseAxiosConfig = { ...this.baseAxiosConfig, ...axiosConfig };
    }

    if (!axiosConfig) {
      // EVERY REQUEST
      this.axiosInstance.interceptors.request.use(
        async (req) => {
          this.countOfActiveRequests++;

          const appid = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
          if (appid) {
            req.params = {
              ...req.params,
              appid
            };
          }

          return req;
        },
        (err) => {
          Promise.reject(err);
        }
      );
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const { data } = await this.axiosInstance.get<T>(url, config);
    return data;
  }

  async getWithHeaders<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseWithHeadersDto> {
    const { data, headers } = await this.axiosInstance.get<T>(url, config);
    return { data, headers };
  }

  async getInfiniteAll<T>(url: string, config?: AxiosRequestConfig): Promise<InfiniteDataResponse<T>> {
    const { data, headers } = await this.axiosInstance.get<T>(url, config);
    return { result: data, total: Number(headers['x-total-count']) };
  }

  async post<ResponseDto = unknown, RequestDto = unknown>(
    url: string,
    data?: RequestDto,
    config?: AxiosRequestConfig
  ): Promise<ResponseDto> {
    const { data: result } = await this.axiosInstance.post<RequestDto, AxiosResponse<ResponseDto>>(url, data, config);
    return result;
  }

  async postWithHeaders<ResponseDto = unknown, RequestDto = unknown>(
    url: string,
    data?: RequestDto,
    config?: AxiosRequestConfig
  ): Promise<ResponseWithHeadersDto> {
    const { data: result, headers } = await this.axiosInstance.post<RequestDto, AxiosResponse<ResponseDto>>(
      url,
      data,
      config
    );
    return { data: result, headers };
  }

  async patch<ResponseDto = unknown, RequestDto = unknown>(
    url: string,
    data?: RequestDto,
    config?: AxiosRequestConfig
  ): Promise<ResponseDto> {
    const { data: result } = await this.axiosInstance.patch<RequestDto, AxiosResponse<ResponseDto>>(url, data, config);
    return result;
  }

  async put<ResponseDto = unknown, RequestDto = unknown>(
    url: string,
    data?: RequestDto,
    config?: AxiosRequestConfig
  ): Promise<ResponseDto> {
    const { data: result } = await this.axiosInstance.put<RequestDto, AxiosResponse<ResponseDto>>(url, data, config);
    return result;
  }

  async delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete(url, config);
  }
}
