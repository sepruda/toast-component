import React, { useState } from 'react';

import Button from '../Button';

import styles from './ToastPlayground.module.css';
import Toast from '../Toast/Toast';
import ToastShelf from '../ToastShelf/ToastShelf';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [message, setMessage] = useState("")
  const [variant, setVariant] = useState(VARIANT_OPTIONS[0])
  const [toasts, setToasts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newToast = { variant, message, id: Math.random() }
    const newToasts = [...toasts, newToast]
    setToasts(newToasts)
    setMessage("")
    setVariant(VARIANT_OPTIONS[0])
  }

  const handleDismissToast = (id) => {
    const newToasts = toasts.filter(toast => toast.id !== id)
    setToasts(newToasts)
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} handleDismissToast={handleDismissToast} />

      <form onSubmit={handleSubmit}>
        <div className={styles.controlsWrapper}>
          <div className={styles.row}>
            <label
              htmlFor="message"
              className={styles.label}
              style={{ alignSelf: 'baseline' }}
            >
              Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea id="message" className={styles.messageInput}
                value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.label}>Variant</div>
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              {VARIANT_OPTIONS.map((option, i) => {
                const id = `variant-${option}`

                return (<label htmlFor={id} key={i}>
                  <input
                    id={id}
                    type="radio"
                    name="variant"
                    value={option}
                    onChange={e => setVariant(e.target.value)}
                    checked={option === variant}
                  />
                  {option}
                </label>)
              })}


            </div>
          </div>


          <div className={styles.row}>
            <div className={styles.label} />
            <div
              className={`${styles.inputWrapper} ${styles.radioWrapper}`}
            >
              <Button disabled={!message}>Pop Toast!</Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
