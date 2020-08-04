export class ValidationError {
  private name:string;
  private message: string;
  
  constructor(message: string) {
    this.name = ValidationError.name;
    this.message = message;
  }
}
