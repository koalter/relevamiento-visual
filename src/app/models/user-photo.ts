export class UserPhoto {
  name: string = '';
  timestamp: number = Date.now();
  webViewPath?: string;
  
  
  public get user() : string {
    return this.name.split(' ')[0];
  }

  public get date() : string {
    const date = new Date(this.timestamp);
    return date.toLocaleString('es-AR');
  }
  
  constructor(name: string, timestamp: number, webViewPath?: string) {
    this.name = name;
    this.timestamp = timestamp;
    this.webViewPath = webViewPath;
  }
}
