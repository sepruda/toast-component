import React from 'react';

import Toast from '../Toast';
import styles from './ToastShelf.module.css';
import { useToast } from '../ToastProvider/ToastProvider';

function ToastShelf() {
  const { toasts, onDismissToast } = useToast()

  return (
    <ol className={styles.wrapper}
      role="region"
      aria-live='polite'
      aria-label='Notification'
    >
      {toasts.map(({ variant, message, id }) => (
        <li className={styles.toastWrapper}>
          <Toast variant={variant} handleDismiss={() => onDismissToast(id)}>{message}</Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
