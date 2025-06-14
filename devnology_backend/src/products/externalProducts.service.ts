import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class ExternalProductsService {
  private readonly brazilianProviderUrl =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
  private readonly europeanProviderUrl =
    'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

  constructor(private readonly httpService: HttpService) {}

  async fetchProducts(): Promise<Products[]> {
    const [brResponse, euResponse]: [
      AxiosResponse<brResponse[]>,
      AxiosResponse<euResponse[]>,
    ] = await Promise.all([
      firstValueFrom(this.httpService.get(this.brazilianProviderUrl)),
      firstValueFrom(this.httpService.get(this.europeanProviderUrl)),
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
  }
}
