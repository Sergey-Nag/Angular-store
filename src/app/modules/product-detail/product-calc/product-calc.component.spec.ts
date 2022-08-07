import { APP_BASE_HREF } from "@angular/common";
import { Book } from "@shared/models/book.model";
import { fireEvent, render, screen, RenderResult, } from '@testing-library/angular';
import { ProductCalcComponent } from "./product-calc.component";

describe('Product details', () => {
  let price = 56.50;
  let available = 10;
  let rendered: RenderResult<ProductCalcComponent>;
  let onCountChange: jest.SpyInstance<void, [value?: number]>

  beforeEach(async () => {
    rendered = await render(ProductCalcComponent, {
      componentProperties: {
        price,
        available,
      }
    });

    onCountChange = jest.spyOn(rendered.fixture.componentInstance.onCountChange, 'emit');
  });

  it('Should render a table', () => {
    expect(rendered.fixture).toMatchSnapshot();
  });

  it('Should calculate total price and emit the onCountChange event when count value changes', () => {
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '2' }});

    expect(screen.getByText(`${(price * 2).toFixed(2)}`)).toBeTruthy();
    expect(onCountChange).toBeCalledWith(2);
  });

  it('Should emit the onCountChange event with 0 if the input value less than 0', () => {
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '-5' }});
    
    expect(onCountChange).toBeCalledWith(0);
  });

  it('Should emit the onCountChange event with max available value if the count value more than available', () => {
    fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '25' }});

    expect(onCountChange).toBeCalledWith(available);
  });
});