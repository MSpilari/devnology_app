import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExternalProductsService {
  private readonly brazilianProviderUrl = process.env.BRAZILIAN_PROVIDER_URL;
  private readonly europeanProviderUrl = process.env.EUROPEAN_PROVIDER_URL;
  private readonly commonUrl = process.env.COMMON_URL;

  constructor(private readonly httpService: HttpService) {}

  async fetchProducts(): Promise<Products[]> {
    try {
      const [brResponse, euResponse]: [
        AxiosResponse<brResponse[]>,
        AxiosResponse<euResponse[]>,
      ] = await Promise.all([
        firstValueFrom(this.httpService.get(this.brazilianProviderUrl!)),
        firstValueFrom(this.httpService.get(this.europeanProviderUrl!)),
      ]);

      const produtosBr = brResponse.data.map((item) => ({
        id: `brazilian_provider/${item.id}`,
        nome: item.nome,
        descricao: item.descricao,
        categoria: item.categoria,
        preco: item.preco,
        imagem: item.imagem,
      }));

      const produtosEu = euResponse.data.map((item) => ({
        id: `european_provider/${item.id}`,
        nome: item.name,
        descricao: item.description,
        categoria: 'General',
        preco: item.hasDiscount
          ? Number(item.price) * (1 - Number(item.discountValue))
          : item.price,
        imagem: item.gallery,
      }));

      return [...produtosBr, ...produtosEu];
    } catch (error) {
      Logger.error('Failed to fetch products from external providers', error);
      throw new ServiceUnavailableException(
        'External product providers are unavailable.',
      );
    }
  }

  async fetchSingleProduct(provider: string, id: string) {
    try {
      const response: AxiosResponse<brResponse | euResponse> =
        await firstValueFrom(
          this.httpService.get(`${this.commonUrl + provider}/${id}`),
        );
      const data = response.data;

      if (!data || !data.id) {
        throw new NotFoundException('Product not found in provider API');
      }

      if ('nome' in data) {
        return {
          id: `${provider}/${data.id}`,
          nome: data.nome,
          descricao: data.descricao,
          categoria: data.categoria,
          preco: data.preco,
          imagem: data.imagem,
        };
      } else {
        return {
          id: `${provider}/${data.id}`,
          nome: data.name,
          descricao: data.description,
          categoria: 'General',
          preco: data.hasDiscount
            ? Number(data.price) * (1 - Number(data.discountValue))
            : Number(data.price),
          imagem: Array.isArray(data.gallery) ? data.gallery : [data.gallery],
        };
      }
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      Logger.error(
        `Failed to fetch product ${provider}/${id}:`,
        error.message || error,
      );
      throw new ServiceUnavailableException(
        `Could not retrieve product from ${provider}`,
      );
    }
  }
}
