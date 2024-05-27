export const stringFormatter = {

    cutIfHaveMoreThan: (value: string | null, length: number): string => {
        if (!value)
            return "";

        if (value.length > length)
            return `${value.substring(0, length)}...`;

        return value;
    }
}