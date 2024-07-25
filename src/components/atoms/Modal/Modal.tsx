import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "./style.scss";

interface ModalProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  container?: HTMLElement | null;
  title?: string;
  description?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  className,
  style,
  container,
  title = "",
  description = "",
}) => {
  return (
    <Dialog.Root open={true}>
      <Dialog.Portal container={container || document.body}>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content
          className={`DialogContent ${className}`}
          style={{
            ...style,
          }}
        >
          <Dialog.Description>{description}</Dialog.Description>
          <Dialog.Title>{title}</Dialog.Title>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
