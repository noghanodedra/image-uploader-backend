export class CustomErrorResponse<T> {
  public timestamp: Date;
  public details: string;
  public message: string;

  public constructor(message: string, details: string) {
    this.message = message;
    this.details = details;
    Object.freeze(this);
  }
}
