import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import Register from "./Register";

describe('Register component', () => {

  const handleUserMock = jest.fn();
  const setup = () => render(<Register onChangeUser={handleUserMock} />);
  afterEach(cleanup);

  describe.each([
    { fieldName: 'firstname', inputType: 'text' },
    { fieldName: 'lastname', inputType: 'text' },
    { fieldName: 'password', inputType: 'password' },
    { fieldName: 'age', inputType: 'range' }
  ])('Form element should have correct input type', ({ fieldName, inputType }) => {
    test(`${fieldName}`, () => {
      setup();

      const input = screen.getByLabelText(fieldName)
      expect(input).toHaveAttribute('type', inputType);
      expect(input).toBeEmptyDOMElement();
    })
  })

  describe.each([
    { firstname: '', lastname: '', password: '', age: '18' },
    { firstname: '', lastname: 'Guillochon', password: 'motdepasse', age: '18' },
    { firstname: 'Simon', lastname: '', password: 'motdepasse', age: '18' },
    { firstname: 'Simon', lastname: 'Guillochon', password: '', age: '18' },
    { firstname: 'Simon', lastname: 'Guillochon', password: 'motdepasse', age: '16' },
  ])('Submit button should be disabled', ({ firstname, lastname, password, age }) => {
    test(`with firstname='${firstname}', lastname='${lastname}', password='${password}' and age='${age}'`, () => {
      setup();

      const firstnameField: HTMLInputElement = screen.getByLabelText('firstname');
      const lastnameField: HTMLInputElement = screen.getByLabelText('lastname');
      const passwordField: HTMLInputElement = screen.getByLabelText('password');
      const ageField: HTMLInputElement = screen.getByLabelText('age');

      fireEvent.change(firstnameField, { target: { value: firstname } });
      fireEvent.change(lastnameField, { target: { value: lastname } });
      fireEvent.change(passwordField, { target: { value: password } });
      fireEvent.change(ageField, { target: { value: age } });

      expect(firstnameField.value).toBe(firstname);
      expect(lastnameField.value).toBe(lastname);
      expect(passwordField.value).toBe(password);
      expect(ageField.value).toBe(age);

      expect(screen.getByRole('button')).toBeDisabled();
    })
    test('with all fields empty', () => {
      setup();

      const nameField: HTMLInputElement = screen.getByLabelText('firstname');
      const pokemonField: HTMLInputElement = screen.getByLabelText('lastname');

      expect(nameField.value).toBe('');
      expect(pokemonField.value).toBe('');

      expect(screen.getByRole('button')).toBeDisabled();
    })
  })

  describe('Submit button should not be disabled', () => {
    test('with complete form', () => {
      setup();

      const firstname: HTMLInputElement = screen.getByLabelText('firstname');
      const lastname: HTMLInputElement = screen.getByLabelText('lastname');
      const password: HTMLInputElement = screen.getByLabelText('password');
      const age: HTMLInputElement = screen.getByLabelText('age');

      expect(firstname.value).toBe('');
      expect(lastname.value).toBe('');
      expect(password.value).toBe('');
      expect(age.value).toBe('18');

      expect(screen.getByRole('button')).toBeDisabled();

      fireEvent.change(firstname, { target: { value: 'Simon' } });
      fireEvent.change(lastname, { target: { value: 'Guillochon' } });
      fireEvent.change(password, { target: { value: 'motdepasse' } });
      fireEvent.change(age, { target: { value: '20' } });

      expect(firstname.value).toBe('Simon');
      expect(lastname.value).toBe('Guillochon');
      expect(password.value).toBe('motdepasse');
      expect(age.value).toBe('20');

      expect(screen.getByRole('button')).not.toBeDisabled();
    })
  })
})
