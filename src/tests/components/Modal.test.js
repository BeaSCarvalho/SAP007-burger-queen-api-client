import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

describe('Modal Component', () => {
  it('should render a Modal', () => {
    render(<Modal />);

    const modalTest = screen.getByTestId('test');
    expect(modalTest).toBeInTheDocument();
  })

  /*test('movie title appears', async () => {
    render(<Modal />);
    const modalTest = await getByTestId('test');
  })*/
 
  /*it('should close Modal when click the button', async() => {
    const handleClick = jest.fn();
    render(<Modal onClick={handleClick}/>);
      
    //render(<Button text='Entrar' onClick={onClose}/>);

    const modalTest = screen.getByTestId('test')

    fireEvent.click(modalTest)
    //expect(handleClick).toHaveBeenCalledTimes(1);
    //expect(modalTest).not.toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByTestId('test'))
  })*/
})
 
