export function transformLabel(label:string) : string {
    if(label.includes("_")){
        const newLabel = label.replace("_"," ");
        const labelFormated = newLabel.toLocaleUpperCase();
        return labelFormated;
    }
    return label.toLocaleUpperCase();
}