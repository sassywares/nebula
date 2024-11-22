import { AxiosInstance, AxiosRequestConfig } from "axios";
import { createApi } from "./api";

/**
 * A service class for making API requests.
 * @template Model - The type of the model.
 * @template CreateModel - The type of the model used for creating.
 * @template UpdateModel - The type of the model used for updating.
 */
export class Service<Model, CreateModel = Model, UpdateModel = CreateModel> {
  private readonly path: string;
  private readonly api: AxiosInstance;

  /** A key to be used for caching */
  readonly key: string;

  constructor(baseUrl: string, path: string = "") {
    this.path = path;
    this.api = createApi(baseUrl);

    // Generate a key for the service
    this.key = `${baseUrl}.${path}`;
  }

  async get(options?: AxiosRequestConfig): Promise<Model[]> {
    return (await this.api.get<Model[]>(this.path, options)).data;
  }

  async getById(id: string): Promise<Model> {
    return (await this.api.get<Model>(`${this.path}/${id}`)).data;
  }

  async create(createModel: CreateModel): Promise<Model> {
    return (await this.api.post<Model>(`${this.path}`, createModel)).data;
  }

  async update(id: string, updateModel: Partial<UpdateModel>): Promise<Model> {
    return (await this.api.patch<Model>(`${this.path}/${id}`, updateModel))
      .data;
  }

  async delete(id: string): Promise<string> {
    return (await this.api.delete<string>(`${this.path}/${id}`)).data;
  }
}
