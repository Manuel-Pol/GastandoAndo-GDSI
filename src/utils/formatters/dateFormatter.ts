
export const dateFormatter = {
    toShortDate: (date: Date | null | undefined): string => {
        return date?.toLocaleDateString('es-AR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }) ?? ''
    }
}