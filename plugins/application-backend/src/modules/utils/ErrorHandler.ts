import { ApiManagmentError } from "./ApiManagmentError"

export function serviceErrorHandler(error:any, _request:any, response:any, next:any) {
    if (error instanceof ApiManagmentError){
      return response.status(400).json({
        status: "error",
        message: `${error.message} - ${error.code}`,
        deepMessage: error.deepMessage,
        code: error.code
      })
    }
    next(error)
}

export function defaultErrorHandler (error:any, _request:any, response:any) {
    response.status(500).json({
        status: "error",
        message: `internal server error - ${error.message}`
    })
    
  }
