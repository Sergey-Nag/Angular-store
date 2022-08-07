import { APP_BASE_HREF, CommonModule, Location } from "@angular/common";
import { ComponentFixture, fakeAsync, getTestBed, TestBed, tick } from "@angular/core/testing";
import { Book } from "@shared/models/book.model";
import { ProductDetailComponent } from "./product-detail.component";
import { render, RenderResult, screen } from '@testing-library/angular';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { AppRoutingModule } from "src/app/app-routing.module";
import { API_ENDPOINTS } from "@shared/constants/Api.constant";
import { CatalogService } from "@shared/services/catalog.service";
import { of } from "rxjs";
import { ProductInfoComponent } from "./product-info/product-info.component";
import { ProductDetailModule } from "./product-detail.module";
import { ActivatedRoute } from "@angular/router";
import { ChangeDetectorRef } from "@angular/core";

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
      imports: [ProductDetailModule, HttpClientTestingModule, AppRoutingModule],
      componentProviders: [ActivatedRoute],
        //  CatalogService, ChangeDetectorRef],
      providers:[
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        // {
        //   provide: ActivatedRoute,
        //   useValue: {
        //     paramMap: of(new Map().set('id', book.id))
        //   }
        // },
        {
          provide: CatalogService,
          useValue: {
            getBook: jest.fn().mockReturnValue(of(false))
          }
        }
      ]
    });

    rendered.navigate(`/catalog/${book.id}`);
  });
  

  it('Should show the spinner instead content until data is loaded', () => {
    expect(rendered.fixture).toMatchSnapshot('with spinner');
    console.log(window.location.href);
    
  });

  // it('Should show book\'s content instead the spinner after data is loaded', fakeAsync(() => {
  //   // rendered.fixture.componentInstance.ngOnInit()
  //   tick();
  //   rendered.detectChanges();
  //   expect(rendered.fixture).toMatchSnapshot('with content');
  // }));

  // it('Should recieve the book after init', fakeAsync(() => {
  //   // rendered.fixture.componentInstance.ngOnInit()

  //   tick();


  // }));
});