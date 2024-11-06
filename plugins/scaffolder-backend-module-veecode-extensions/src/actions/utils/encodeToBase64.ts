export const encodeToBase64 = (content: string): string => {
    const base64Encoded = btoa(content);
    return base64Encoded;
};