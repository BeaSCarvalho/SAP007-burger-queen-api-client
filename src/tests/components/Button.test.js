import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button component', () => {
  it('should render a button with the text provided', () => {
    render(<Button text='Entrar'/>);

    const buttonTest = screen.getByText('Entrar')

    expect(buttonTest).toBeInTheDocument();
  })

  it('should call a function when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} text='Entrar'/>);

    const buttonTest = screen.getByText('Entrar');

    expect(handleClick).toHaveBeenCalledTimes(0);
    fireEvent.click(buttonTest);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
  

