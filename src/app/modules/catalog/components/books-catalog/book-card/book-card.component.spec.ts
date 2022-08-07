import { APP_BASE_HREF, Location } from "@angular/common";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { Book } from "@shared/models/book.model";
import { BookCardComponent } from "./book-card.component";
import { render, screen } from '@testing-library/angular'
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AppRoutingModule } from "src/app/app-routing.module";
import { RouterTestingModule } from '@angular/router/testing';
import { CatalogModule } from "../../../catalog.module";
import { Router } from "@angular/router";
import { ProductDetailComponent } from "src/app/modules/product-detail/product-detail.component";

describe('Book card', () => {
  let book: Book;
  let component: BookCardComponent;
  let fixtureComponent: ComponentFixture<BookCardComponent>;
  let router: Router;

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

    const { fixture } = await render(BookCardComponent, {
      componentProperties: { book },
      imports: [RouterTestingModule.withRoutes(
        [{
          path: '',
          children: [
            {
              path: ':id',
              component: ProductDetailComponent,
            }
          ]
        }]
      ), CatalogModule, HttpClientTestingModule],
    });

    fixtureComponent = fixture;
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('Should show the book content', () => {
    expect(fixtureComponent).toMatchSnapshot();
  });

  it('Should go to the details page by clicking on the view link', fakeAsync(() => {
    screen.getByRole<HTMLLinkElement>('link', { name: 'View' }).click();
    
    tick();
    
    expect(router.routerState.snapshot.url).toBe('/1')
  }));
});