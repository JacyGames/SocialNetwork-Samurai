
export let required = value => {
    if(value) return undefined
    return "This data is required"
}
export const maxlenght = (length) => (value) => {
        if (value && value.length > length) return `Max length must be ${length}`;

        return undefined;
    }