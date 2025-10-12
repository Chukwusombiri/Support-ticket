export function isEmptyInput(...rest) {
    return rest.some((item) => {
        return item === null || item === undefined || ( typeof item == 'string' && item.trim().length === 0)
    })
}

// check for invalid number
export function isInvalidNumber(...rest) {
    return rest.some((item) => {
        return item === null || item === undefined || isNaN(item)
    })
}

//check for boolean value
export const isInvalidBoolean = (...values) => {
    return values.some((item) =>
        typeof item !== 'boolean');
}


//check password match
export const passwordDoNotMatch = (value1, value2) => value1 !== value2

//check invalid emails
export const isInvalidEmailAddress = (...rest) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return rest.some((item) => !regex.test(item))
};
