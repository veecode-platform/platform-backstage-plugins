/**
 * At the moment using basic validations because they are random fields defined 
 * by third parties from which we cannot expect data other than to 
 * verify if they are filled in or not...
 */

export const validateString = (value: string) => {
    if(value.length <= 3)return true
    return false;
}

export const validateRequiredField = (value: any) => {
    if(value.length === 0) return true;
    return false
}

/**
 * But later, as the project matures, finer validations will be useful.
 */