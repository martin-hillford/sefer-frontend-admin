class ResponseError extends Error {
  public code : number | string | undefined;

  constructor(code : number | string, message? : string) {
    if (!message) super(`${code}`);
    else super(message);

    if (!message) this.code = code;
  }
}

export { ResponseError };
