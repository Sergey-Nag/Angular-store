import { render } from '@testing-library/angular';
import { screen } from '@testing-library/dom';
import { Book } from 'src/app/shared/book.model';
import { BookCardComponent } from './book-card.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('Book card', () => {
  let book: Book;

  beforeAll(() => {
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
  });

  it('Should render book card', async () => {
    await render(BookCardComponent, {
      componentProperties: { book },
    });
  
    const card = screen.getByTestId('book-1');

    expect(card).toBeTruthy();
  });

  it('Should have image, title, author, price and the link', async () => {
    await render(BookCardComponent, {
      componentProperties: { book },
      imports: [AppRoutingModule]
    });

    const image = screen.getByRole<HTMLImageElement>('img');
    const title = screen.getByRole('heading', { name: book.title });
    const link = screen.getByRole('link', { name: 'View' });
    const price = screen.getByText(`$${book.price}`);
    const author = screen.getByText(book.author);

    expect(image.src).toBe(book.cover);
    expect(title).toBeTruthy();
    expect(author).toBeTruthy();
    expect(price).toBeTruthy();
    expect(link).toBeTruthy();
  });
});