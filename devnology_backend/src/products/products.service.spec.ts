import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { ExternalProductsService } from './externalProducts.service';
import { ProductsService } from './products.service';

const mockExternalService = {
  fetchProducts: jest.fn(),
  fetchSingleProduct: jest.fn(),
};

const mockCache = {
  get: jest.fn(),
  set: jest.fn(),
};

const mockProducts = [
  {
    id: 'brazilian_provider/1',
    nome: 'Produto A',
    descricao: 'Descrição A',
    categoria: 'Categoria X',
    preco: 100,
    imagem: 'img-a.jpg',
  },
  {
    id: 'european_provider/2',
    nome: 'Produto B',
    descricao: 'Descrição B',
    categoria: 'Categoria Y',
    preco: 200,
    imagem: 'img-b.jpg',
  },
];

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ExternalProductsService, useValue: mockExternalService },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    jest.clearAllMocks();
  });

  describe('findAllOrQuery', () => {
    it('should return all products when no filters are applied', async () => {
      mockCache.get.mockResolvedValueOnce(mockProducts);

      const result = await service.findAllOrQuery();
      expect(result.data).toEqual(mockProducts);
      expect(result.total).toBe(2);
    });

    it('should filter products by name', async () => {
      mockCache.get.mockResolvedValueOnce(mockProducts);

      const result = await service.findAllOrQuery({ name: 'Produto A' });
      expect(result.data).toHaveLength(1);
      expect(result.data[0].nome).toBe('Produto A');
    });

    it('should filter products by category', async () => {
      mockCache.get.mockResolvedValueOnce(mockProducts);

      const result = await service.findAllOrQuery({ category: 'Categoria Y' });
      expect(result.data).toHaveLength(1);
      expect(result.data[0].categoria).toBe('Categoria Y');
    });

    it('should paginate the result', async () => {
      mockCache.get.mockResolvedValueOnce([...mockProducts, ...mockProducts]);

      const result = await service.findAllOrQuery({ page: 2, limit: 2 });
      expect(result.data).toHaveLength(2);
      expect(result.page).toBe(2);
    });

    it('should fetch products from API if cache is empty', async () => {
      mockCache.get.mockResolvedValueOnce(undefined);
      mockExternalService.fetchProducts.mockResolvedValueOnce(mockProducts);

      const result = await service.findAllOrQuery();

      expect(mockExternalService.fetchProducts).toHaveBeenCalled();
      expect(mockCache.set).toHaveBeenCalledWith(
        'products_from_EU_and_BR_apis',
        mockProducts,
      );
      expect(result.data).toEqual(mockProducts);
    });
  });

  describe('findById', () => {
    it('should return a product from cache if it exists', async () => {
      mockCache.get.mockResolvedValueOnce(mockProducts);

      const result = await service.findById('brazilian_provider', '1');
      expect(result.nome).toBe('Produto A');
    });

    it('should fetch product from API if not found in cache', async () => {
      mockCache.get.mockResolvedValueOnce(mockProducts);
      mockExternalService.fetchSingleProduct.mockResolvedValueOnce({
        id: 'european_provider/3',
        nome: 'Produto C',
        descricao: 'Desc C',
        categoria: 'Categoria Z',
        preco: 300,
        imagem: 'img-c.jpg',
      });

      const result = await service.findById('european_provider', '3');
      expect(mockExternalService.fetchSingleProduct).toHaveBeenCalledWith(
        'european_provider',
        '3',
      );
      expect(result.nome).toBe('Produto C');
    });
  });
});
