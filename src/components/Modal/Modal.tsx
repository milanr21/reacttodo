import { ReactNode } from "react";
import ReactDOM from "react-dom";
import "../../styles/component/Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
          </div>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
