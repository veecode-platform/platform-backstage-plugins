export  const  getImagePayload = async (imageName:string) => {
    const response = await import(`../../assets/${imageName}`) 
    return response.default
    }