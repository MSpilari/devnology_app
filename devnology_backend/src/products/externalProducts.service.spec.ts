import { Test, TestingModule } from '@nestjs/testing';
import { ExternalProductsService } from './externalProducts.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse } from 'axios';
import { ServiceUnavailableException, NotFoundException } from '@nestjs/common';

describe('ExternalProductsService', () => {
  let service: ExternalProductsService;
  let httpService: HttpService;

  process.env.BRAZILIAN_PROVIDER_URL = 'https://brazilian-api';
  process.env.EUROPEAN_PROVIDER_URL = 'https://european-api';
  process.env.COMMON_URL = 'https://common-api/';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExternalProductsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ExternalProductsService>(ExternalProductsService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('fetchProducts', () => {
    it('should return formated products from both APIs', async () => {
      const brResponse = [
        {
          id: '1',
          nome: 'Produto BR',
          descricao: 'Descrição',
          categoria: 'Categoria',
          preco: 100,
          imagem: 'img-br.jpg',
        },
      ];
      const euResponse = [
        {
          id: '2',
          name: 'Produto EU',
          description: 'Desc',
          price: 200,
          hasDiscount: true,
          discountValue: 0.1,
          gallery: 'img-eu.jpg',
        },
      ];

      (httpService.get as jest.Mock).mockImplementation((url: string) => {
        if (url === process.env.BRAZILIAN_PROVIDER_URL)
          return of({ data: brResponse } as AxiosResponse);
        if (url === process.env.EUROPEAN_PROVIDER_URL)
          return of({ data: euResponse } as AxiosResponse);

        return throwError(() => new Error('Unknown URL'));
      });

      const result = await service.fetchProducts();

      expect(result).toEqual([
        {
          id: 'brazilian_provider/1',
          nome: 'Produto BR',
          descricao: 'Descrição',
          categoria: 'Categoria',
          preco: 100,
          imagem: 'img-br.jpg',
        },
        {
          id: 'european_provider/2',
          nome: 'Produto EU',
          descricao: 'Desc',
          categoria: 'General',
          preco: 180,
          imagem: 'img-eu.jpg',
        },
      ]);
    });

    it('should throw ServiceUnavailableException on a error at the APIs', async () => {
      (httpService.get as jest.Mock).mockReturnValueOnce(
        throwError(() => new Error('Erro')),
      );

      await expect(service.fetchProducts()).rejects.toThrow(
        ServiceUnavailableException,
      );
    });
  });

  describe('fetchSingleProduct', () => {
    it('should return a brazilian product formatted', async () => {
      const brProduct = {
        id: '1',
        nome: 'Produto BR',
        descricao: 'Desc',
        categoria: 'Categoria',
        preco: 100,
        imagem: 'img.jpg',
      };

      (httpService.get as jest.Mock).mockReturnValueOnce(
        of({ data: brProduct } as AxiosResponse),
      );

      const result = await service.fetchSingleProduct(
        'brazilian_provider',
        '1',
      );

      expect(result).toEqual({
        id: 'brazilian_provider/1',
        nome: 'Produto BR',
        descricao: 'Desc',
        categoria: 'Categoria',
        preco: 100,
        imagem: 'img.jpg',
      });
    });

    it('should return a european product formatted', async () => {
      const euProduct = {
        id: '2',
        name: 'Produto EU',
        description: 'Desc',
        price: 200,
        hasDiscount: true,
        discountValue: 0.25,
        gallery: ['img-eu.jpg'],
      };

      (httpService.get as jest.Mock).mockReturnValueOnce(
        of({ data: euProduct } as AxiosResponse),
      );

      const result = await service.fetchSingleProduct('european_provider', '2');

      expect(result).toEqual({
        id: 'european_provider/2',
        nome: 'Produto EU',
        descricao: 'Desc',
        categoria: 'General',
        preco: 150,
        imagem: ['img-eu.jpg'],
      });
    });

    it('should throw NotFoundException if a product is not found', async () => {
      (httpService.get as jest.Mock).mockReturnValueOnce(
        of({ data: {} } as AxiosResponse),
      );

      await expect(
        service.fetchSingleProduct('brazilian_provider', '123'),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw a ServiceUnavailableException on a requisition error', async () => {
      (httpService.get as jest.Mock).mockReturnValueOnce(
        throwError(() => new Error('Erro')),
      );

      await expect(
        service.fetchSingleProduct('european_provider', '456'),
      ).rejects.toThrow(ServiceUnavailableException);
    });
  });
});
