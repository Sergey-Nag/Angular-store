import { APP_BASE_HREF } from "@angular/common";
import { Book } from "@shared/models/book.model";
import { ProductDetailComponent } from "./product-detail.component";
import { render, RenderResult, screen, waitFor } from '@testing-library/angular';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AppRoutingModule } from "src/app/app-routing.module";
import { CatalogService } from "@shared/services/catalog.service";
import { of } from "rxjs";
import { ProductInfoComponent } from "./product-info/product-info.component";
import { ProductDetailModule } from "./product-detail.module";
import { ActivatedRoute } from "@angular/router";
import { SharedModule } from "@shared/shared.module";
import { delay } from "rxjs/operators";
import { ProductCalcComponent } from "./product-calc/product-calc.component";
import { RouterTestingModule } from "@angular/router/testing";

describe('Product details', () => {
  let book: Book;
  let rendered: RenderResult<ProductDetailComponent>;

  beforeEach(async () => {
    book = new Book(
      '1',
      6, 
      56.95,
      'Apuntes de Javascript I - Nivel Intermedio',
      'JuanMa Garrido', 
      'Intermediate', 
      'En Castellano) Revision de conceptos (actuales) de javascript desde basicos hasta un nivel intermedio',
      'https://jsbooks.revolunet.com/img/cover-apuntes-javascript-intermedio.png',
      ['core']
    );

    rendered = await render(ProductDetailComponent, {
      imports: [ProductDetailModule, HttpClientTestingModule, AppRoutingModule, SharedModule],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: new Map().set('id', book.id)
            }
          }
        },
        {
          provide: CatalogService,
          useValue: {
            getBook: jest.fn().mockReturnValue(of(book).pipe(delay(500)))
          }
        }
      ]
    });

    rendered.navigate(`/catalog/${book.id}`);
  });

  it('Should show the spinner instead content until data is loaded', () => {
    expect(rendered.fixture).toMatchSnapshot('with spinner');
  });

  it('Should show book\'s content instead the spinner after data is loaded', async () => {
    await waitFor(() => screen.getByRole('heading', { name: book.title }), { timeout: 500 });

    expect(rendered.fixture).toMatchSnapshot('with content');
  });
});