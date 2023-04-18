import { useEffect } from "react"

export default function useEscapeKey(callBack) {

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.code === 'Escape') {
                callBack()
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [callBack])


}
