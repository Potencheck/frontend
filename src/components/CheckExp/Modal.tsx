import { useState, useEffect, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  primaryActionText?: string;
  secondaryActionText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  primaryActionText = '확인',
  secondaryActionText = '취소',
  onPrimaryAction,
  onSecondaryAction,
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handlePrimaryAction = () => {
    if (onPrimaryAction) {
      onPrimaryAction();
    } else {
      onClose();
    }
  };

  const handleSecondaryAction = () => {
    if (onSecondaryAction) {
      onSecondaryAction();
    } else {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <div className="mb-4 text-center head-h2">{title}</div>}

        <div className="mb-6 text-center text-text-secondary">{children}</div>

        <div className="flex gap-2">
          {secondaryActionText && (
            <button
              className="flex-1 rounded-lg border border-border-line py-3 subtle2-semibold text-text-secondary"
              onClick={handleSecondaryAction}
            >
              {secondaryActionText}
            </button>
          )}

          {primaryActionText && (
            <button
              className="flex-1 rounded-lg bg-black py-3 subtle2-semibold text-white"
              onClick={handlePrimaryAction}
            >
              {primaryActionText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;

// Usage example:
/*
import Modal from './components/Modal';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Open Modal
      </button>
      
      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="직무 경험 추출을 그만두시겠어요?"
        primaryActionText="그만두기"
        secondaryActionText="취소"
      >
        그만두기를 클릭하시면 추출된 내용이 모두 사라져요
      </Modal>
    </div>
  );
};
*/
