import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../components/Input'

describe('Input component', () => {
  it('should render an Input with placeholder=nome', () => {
    render(<Input placeholder='Nome' />)

    const inputTest = screen.getByPlaceholderText('Nome')
    expect(inputTest).toBeInTheDocument();
  })

  it('should call a function when value is changed', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} placeholder='Nome'/>);

    const inputTest = screen.getByPlaceholderText('Nome');

    expect(handleChange).toHaveBeenCalledTimes(0);
    fireEvent.change(inputTest, {target: {value: 'Teste'}})
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('selected kitchen', done => {
    function handleRoleChange(e) {
      expect(e.target.value).toEqual('kitchen');
      done();
    }

    render(<Input onChange={handleRoleChange} placeholder="kitchen" />);

    const radioButton = screen.getByPlaceholderText('kitchen');
    fireEvent.change(radioButton, { target: { value: "kitchen" } });
  });

  test('selected saloon', done => {
    function handleRoleChange(e) {
      expect(e.target.value).toEqual('saloon');
      done();
    }

    render(<Input onChange={handleRoleChange} placeholder="saloon" />);

    const radioButton = screen.getByPlaceholderText('saloon');
    fireEvent.change(radioButton, { target: { value: "saloon" } });
  });
})  