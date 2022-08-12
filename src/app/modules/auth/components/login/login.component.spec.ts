import { ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { VALIDATION_ERROR } from "@shared/helpers/validation-error.helper";
import { fireEvent, getByText, render, screen, RenderResult } from "@testing-library/angular";
import { waitFor } from "@testing-library/dom";
import { of } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { LoginComponent } from "./login.component";

const renderWithServices = async () => 
  await render(LoginComponent, {
    imports: [ReactiveFormsModule],
    providers: [
      {
        provide: AuthService,
        useValue: {
          signIn: jest.fn().mockReturnValue(of({}))
        }
      },
      {
        provide: Router,
        useValue: {
          navigate: jest.fn()
        }
      }
    ]
  });

describe('Login form', () => {
  it('Should render login form component', async () => {
    const { fixture } = await renderWithServices();

    expect(fixture).toMatchSnapshot();
  });

  it('Should be invalid and show "Required" error message with the empty input value', async () => {
    const { fixture } = await renderWithServices();
    const input = screen.getByRole('textbox');

    fireEvent.input(input, { target: { value: '' }});
    fireEvent.blur(input);

    const errorMessage = screen.getByText(VALIDATION_ERROR.required);

    expect(fixture.componentInstance.authForm.invalid).toBe(true);

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toBeVisible();
    expect(screen.getByRole('button', { name: 'Log in'})).toBeDisabled();
  });

  it('Should be invalid and show "Min Length" error message with the "abc" input value', async () => {
    const { fixture } = await renderWithServices();
    const input = screen.getByRole('textbox');

    fireEvent.input(input, { target: { value: 'abc' }});
    fireEvent.blur(input);

    const errorMessage = await waitFor(() => screen.getByText(VALIDATION_ERROR.minlength));

    expect(fixture.componentInstance.authForm.invalid).toBe(true);

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toBeVisible();
    expect(screen.getByRole('button', { name: 'Log in'})).toBeDisabled();
  });

  it('Should be invalid and show "Max Length" error message with the input value more than 40 symbols', async () => {
    const { fixture } = await renderWithServices();
    const input = screen.getByRole('textbox');

    fireEvent.input(input, { target: { value: 'abcdefgabcdefgabcdefgabcdefgabcdefgabcdefg' }});
    fireEvent.blur(input);

    const errorMessage = await waitFor(() => screen.getByText(VALIDATION_ERROR.maxlength));

    expect(fixture.componentInstance.authForm.invalid).toBe(true);

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toBeVisible();
    expect(screen.getByRole('button', { name: 'Log in'})).toBeDisabled();
  });
  
  describe('Should be invalid and show "Email" error message with the different invalid emails', () => {
    it('The "12345" value should be invalid', async () => {
      const { fixture } = await renderWithServices();
      const input = screen.getByRole('textbox');

      fireEvent.input(input, { target: { value: '12345' }});
      fireEvent.blur(input);
  
      const errorMessage = await waitFor(() => screen.getByText(VALIDATION_ERROR.email));
  
      expect(fixture.componentInstance.authForm.invalid).toBe(true);
  
      expect(errorMessage).toBeVisible();
      expect(screen.getByRole('button', { name: 'Log in'})).toBeDisabled();
    });
  
    it('The "abc@" value should be invalid', async () => {
      const { fixture } = await renderWithServices();
      const input = screen.getByRole('textbox');

      fireEvent.input(input, { target: { value: 'abc@' }});
      fireEvent.blur(input);
  
      const errorMessage = await waitFor(() => screen.getByText(VALIDATION_ERROR.email));
  
      expect(fixture.componentInstance.authForm.invalid).toBe(true);
  
      expect(errorMessage).toBeVisible();
      expect(screen.getByRole('button', { name: 'Log in'})).toBeDisabled();
    });

    it('The "@abc.de" value should be invalid', async () => {
      const { fixture } = await renderWithServices();
      const input = screen.getByRole('textbox');

      fireEvent.input(input, { target: { value: '@abc.de' }});
      fireEvent.blur(input);
  
      const errorMessage = await waitFor(() => screen.getByText(VALIDATION_ERROR.email));
  
      expect(fixture.componentInstance.authForm.invalid).toBe(true);
  
      expect(errorMessage).toBeVisible();
      expect(screen.getByRole('button', { name: 'Log in'})).toBeDisabled();
    });
  });

  it('Should be valid with the correct email and don\'t show error message', async () => {
    const { fixture, getByRole } = await renderWithServices();
    const input = getByRole('textbox');

    fireEvent.input(input, { target: { value: 'test@test.t' }});
    fireEvent.blur(input);

    expect(fixture.componentInstance.authForm.valid).toBe(true);
    expect(screen.getByRole('button', { name: 'Log in'})).toBeEnabled();
  });

  it('Should call signIn method from AuthService and redirect to the main route after submit for with valid data', async () => {
    const { fixture } = await renderWithServices();
    const authService = fixture.componentRef.injector.get(AuthService);
    const router = fixture.componentRef.injector.get(Router);

    const input = screen.getByRole('textbox');
    const signInButton = screen.getByRole('button', { name: 'Log in'});

    fireEvent.input(input, { target: { value: 'test@test.t' }});
    fireEvent.blur(input);

    fireEvent.click(signInButton);

    expect(authService.signIn).toBeCalled();
    expect(router.navigate).toBeCalledWith(['/']);
  });
});