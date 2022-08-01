import { getTestBed, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatalogService } from './catalog.service';
import { first } from "rxjs/operators";
import { API_ENDPOINTS } from "@shared/constants/Api.constant";

describe('Catalog service', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController 
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    injector = getTestBed();
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it(`getBooks method should make GET request to the ${API_ENDPOINTS.Books}`, () => {
    const catalogService = TestBed.inject(CatalogService);

    catalogService.getBooks().pipe(first()).subscribe();

    const req = httpMock.expectOne(API_ENDPOINTS.Books);
    expect(req.request.method).toBe('GET');
  });
});