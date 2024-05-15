export const truncateMessage = (message:string) => {
    const regex = /^(.*?)(?= at )/;
    const match = message.match(regex);
    
    if (match) return match[1].trim();
    return message
}