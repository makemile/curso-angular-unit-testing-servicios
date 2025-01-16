import { TestBed } from '@angular/core/testing';
import { ProductsService } from './product.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CreateProductDTO, Product } from 'src/models/product.model';
import { environment } from 'src/environments/environment';
import {
  generateManyProducts,
  generateOneProduct,
} from 'src/models/product.mock';

describe('ProductsService', () => {
  let productService: ProductsService;
  let httController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    productService = TestBed.inject(ProductsService);
    httController = TestBed.inject(HttpTestingController);
  });

  it('should be create', () => {
    expect(productService).toBeTruthy();
  });

  describe('test for getAllsimple', () => {
    it('should return a product list', (doneFn) => {
      const mockData: Product[] = generateManyProducts(3);
      productService.getAllSimple().subscribe((data) => {
        expect(data.length).toEqual(mockData.length);
        doneFn();
      });
      const URL = `${environment.API_URL}/api/v1/products`;
      const req = httController.expectOne(URL);
      req.flush(mockData);
      httController.verify();
    });
  });

  it('should return product list with taxes', () => {
    //Arrange
    const mockData: Product[] = [
      {
        ...generateManyProducts(1)[0],
        price: 100,
      },
      {
        ...generateManyProducts(1)[0],
        price: 200,
      },
      {
        ...generateManyProducts(1)[0],
        price: -200,
      },
    ];
    productService.getAll(2, 0).subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products[0].taxes).toBe(19);
      expect(products[1].taxes).toBe(38);
      expect(products[2].taxes).toBe(0);
    });
    let limit = 2;
    let offset = 0;
    const URL = `${environment.API_URL}/api/v1/products?limit=${limit}&offset=${offset}`;
    const req = httController.expectOne(URL);
    req.flush(mockData);
    expect(req.request.params.has('limit')).toBeTrue();
    expect(req.request.params.get('limit')).toBe('2');
    expect(req.request.params.has('offset')).toBeTrue();
    expect(req.request.params.get('offset')).toBe('0');
    httController.verify();
  });

  describe('test for create', () => {
    it('should return a new product', (doneFn) => {
      //Arrange
      const mockData = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['img'],
        description: 'bla',
        categoryId: 12,
      };
      //Act
      productService.create(dto).subscribe((data) => {
        //assert
        expect(data).toEqual(mockData);
        doneFn();
      });
      const URL = `${environment.API_URL}/api/v1/products`;
      const req = httController.expectOne(URL);
      req.flush(mockData);
      expect(req.request.body).toEqual(dto);
      expect(req.request.method).toEqual('POST');
      httController.verify();
    });
  });
});
