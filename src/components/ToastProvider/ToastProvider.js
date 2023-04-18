import { createContext, useCallback, useState, useContext, useEffect } from "react";
import useEscapeKey from "../hooks/useEscapeKey";

export const ToastsContext = createContext()

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const handleDismissAllToasts = useCallback(() => function handleDismissAllToasts(event) {
    setToasts([])
  }, [])


  useEscapeKey(handleDismissAllToasts)


  const createToast = useCallback(
    (variant, message) => {
      const newToast = { variant, message, id: crypto.randomUUID() }
      const newToasts = [...toasts, newToast]
      setToasts(newToasts)
    },
    [toasts],
  )

  const onDismissToast = useCallback(
    (id) => {
      const newToasts = toasts.filter(toast => toast.id !== id)
      setToasts(newToasts)

    },
    [toasts],
  )

  return (
    <ToastsContext.Provider value={{ toasts, onDismissToast, createToast }}>
      {children}
    </ToastsContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastsContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}


export default ToastProvider;
