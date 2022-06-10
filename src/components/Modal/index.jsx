import "./style.css"

const Modal = ({onClose, children}) => {
  return (
    <div id="modal-pop-up" className="modal" data-testid="test">
      <div className="container-modal">
        <button className="close-modal" onClick={onClose}></button>
        <div className="content-modal" id={children}>{children}</div>
      </div>
    </div>
  )    
}

export default Modal;