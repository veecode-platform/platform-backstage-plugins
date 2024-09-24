export function removePropsNull(object:any){
    return Object.fromEntries(
        Object.entries(object).filter(([_, value]) => value !== null)
      )
}