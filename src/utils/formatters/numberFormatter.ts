export const numberFormatter = {

    toStringWithDecimals: (value: number | null, minDigits = 2, maxDigits = 2): string => {
        if (value === null)
            return "-";

        return `${value.toLocaleString('de-DE', {minimumFractionDigits: minDigits, maximumFractionDigits: maxDigits})}`;
    }

}