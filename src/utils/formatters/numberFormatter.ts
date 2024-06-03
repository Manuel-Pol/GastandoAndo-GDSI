export const numberFormatter = {
    toStringWithDecimals: (value: number | null, minDigits = 0, maxDigits = 0): string => {
        if (value === null) return '-'

        return `${value.toLocaleString('de-DE', {
            minimumFractionDigits: minDigits,
            maximumFractionDigits: maxDigits
        })}`
    }
}
