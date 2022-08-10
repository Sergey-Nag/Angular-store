import { ComponentFixture } from "@angular/core/testing";
import { BookCardComponent } from "./book-card.component";
import { fireEvent, render, screen, waitFor } from '@testing-library/angular'
import { Component } from "@angular/core";
import { mockBook } from "src/app/mocks/book.mock";
import { MockStubComponent } from "src/app/mocks/stub-component.mock";

@Component({
  selector: 'app-catalog',
  template: '<app-book-card [book]="book"></app-book-card>'
})
class MockCatalogComponent {
  book = mockBook
}

describe('Book card', () => {
  let fixtureComponent: ComponentFixture<any>;

  beforeEach(async () => {
    const { fixture, navigate } = await render('<router-outlet></router-outlet>', {
      declarations: [MockCatalogComponent, MockStubComponent, BookCardComponent],
      routes: [
        {
          path: 'catalog',
          component: MockCatalogComponent
        },
        {
          path: 'catalog/:id',
          component: MockStubComponent
        }
      ]
    });

    navigate('/catalog');

    fixtureComponent = fixture;
  });

  it('Should show the book content', () => {
    expect(fixtureComponent).toMatchSnapshot();
  });

  it('Should go to the details page by clicking on the view link', async () => {
    fireEvent.click(screen.getByRole('link', { name: 'View' }));
    
    await waitFor(() => expect(screen.getByText('Stub component')).toBeInTheDocument());
  });
});