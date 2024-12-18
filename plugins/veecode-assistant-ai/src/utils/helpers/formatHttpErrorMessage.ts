export function formatHttpErrorMessage(
    message: string,
    error: { status: number; message: string },
  ) {
    return `${message}, received http response status code ${error.status}: ${error.message}`;
  }