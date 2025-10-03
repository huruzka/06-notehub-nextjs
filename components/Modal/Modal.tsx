"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";


interface ModalProps {
   
    isOpen: boolean;
    
    onClose: () => void;
   
    children: React.ReactNode;
}


const Modal = ({
    isOpen,
    onClose,
    children,
}: ModalProps): React.ReactPortal | null => {
    // Эффект для обработки нажатия клавиши "Escape"
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    
    useEffect(() => {
        if (isOpen) {
            const prevOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden"; // Блокируем скролл
            return () => {
                document.body.style.overflow = prevOverflow; // Возвращаем скролл при закрытии
            };
        }
    }, [isOpen]);


    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div
            className={css.backdrop}
            role="dialog"
            aria-modal="true"
            onClick={handleBackdropClick}
        >
            <div className={css.modal}>{children}</div>
        </div>,
        document.body
    );
};

export default Modal;