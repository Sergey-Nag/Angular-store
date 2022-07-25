import { HttpClient } from "@angular/common/http";
import { of } from "rxjs";
import { Book } from "src/app/shared/book.model";
import { CatalogService } from "./catalog.service";

describe('Catalog service', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let catalogService: CatalogService;
  
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    catalogService = new CatalogService(httpClientSpy);
  });

  it('getBooks method should call a GET request', () => {
    catalogService.getBooks();

    expect(httpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it('getBooks method should return the observeble with the books array', (done: DoneFn) => {
    const expectedBooksArray: Book[] = [{
      id: 'test',
      count: 1,
      price: 10,
      title: 'test',
      author: 'test',
      level: 'test',
      description: 'test',
      cover: 'test',
      tags: ['test'],
    }];

    httpClientSpy.get.and.returnValue(of(expectedBooksArray));

    catalogService.getBooks().subscribe({
      next: (books) => {
        expect(books)
          .withContext('expected books')
          .toEqual(expectedBooksArray);

        done();
      },
      error: done.fail
    });
  });
});