
export let required = (value: string) => {
    if(value) return undefined
    return "This data is required"
}
export const maxlenght = (length: number) => (value: string) => {
        if (value && value.length > length) return `Max length must be ${length}`;

        return undefined;
    }
