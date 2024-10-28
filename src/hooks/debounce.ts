import { useEffect, useState } from "react"

export const useDebounce = (value: string, delay: number = 500): string => {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay)
        return () => clearTimeout(handler)
    }, [value, debounced])

    return debounced
}