import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ExternalProductsService } from './externalProducts.service';
import { FilterProductsDto } from './dto/filterProducts.dto';

@Injectable()
export class ProductsService {
  private readonly cacheKey = 'products_from_EU_and_BR_apis';

  constructor(
    private readonly externalProductsService: ExternalProductsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAllOrQuery(
    query?: FilterProductsDto,
  ): Promise<findAllOrQueryResponseDto> {
    const allProducts = await this.getFromCacheOrApi();

    const filtered = this.applyFilters(allProducts, query);
    const paginated = this.paginate(filtered, query?.page, query?.limit);

    return {
      ...paginated,
      total: filtered.length,
    };
  }

  async findById(provider: string, id: string) {
    const cachedProducts = await this.cacheManager.get<Products[]>(
      this.cacheKey,
    );

    if (cachedProducts) {
      const found = cachedProducts.find(
        (product) => product.id === `${provider}/${id}`,
      );
      if (found) return found;
    }

    return await this.externalProductsService.fetchSingleProduct(provider, id);
  }

  private async getFromCacheOrApi(): Promise<Products[]> {
    const cachedProducts = await this.cacheManager.get<Products[]>(
      this.cacheKey,
    );

    if (cachedProducts) return cachedProducts;

    const allProducts = await this.externalProductsService.fetchProducts();

    await this.cacheManager.set(this.cacheKey, allProducts);

    return allProducts;
  }

  private applyFilters(
    products: Products[],
    filters?: FilterProductsDto,
  ): Products[] {
    if (!filters) return products;

    const { name, category } = filters;

    return products.filter((product) => {
      const matchName = name
        ? product.nome.toLowerCase().includes(name.toLowerCase())
        : true;

      const matchCategory = category
        ? product.categoria.toLowerCase() === category.toLowerCase()
        : true;

      return matchName && matchCategory;
    });
  }

  private paginate(
    products: Products[],
    page = 1,
    limit = 10,
  ): findAllOrQueryResponseDto {
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = products.slice(start, start + limit);

    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const visiblePages = total;
    let startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    let endPage = startPage + visiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    );

    return {
      data,
      page,
      limit,
      totalPages,
      hasNextPage,
      hasPrevPage,
      pages,
      total,
    };
  }
}
