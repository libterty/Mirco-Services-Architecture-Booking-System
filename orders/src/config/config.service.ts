import { parse } from 'dotenv';
import * as fs from 'fs-extra';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
    this.envConfig = parse(fs.readFileSync(filePath));
  }

  get(key: string) {
    return this.envConfig[key];
  }

  getPort(key: string): number {
    return Number(this.envConfig[key]);
  }
}
