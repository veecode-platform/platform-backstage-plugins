export const convertToFile = (data:string) => {
        const base64Content = data.split(",")[1];
        const buffer = Uint8Array.from(atob(base64Content), c => c.charCodeAt(0)).buffer;
        const blob = new Blob([buffer], { type: 'application/octet-stream' });
        const file = new File([blob], 'File', { type: 'application/octet-stream' });
        return file
}