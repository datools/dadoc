import * as fs from 'fs-extra';
import * as yaml from 'js-yaml';

/**
 * YAML parser and dumper
 */
export class Yaml {
  /**
   * Load a yaml file
   * @param filepath  File to read
   */
  public static async load(filepath: string) {
    const buffer: Buffer = await fs.readFile(filepath);
    return yaml.safeLoad(buffer.toString());
  }

  public static loadSync(filepath: string) {
    const buffer: Buffer = fs.readFileSync(filepath);
    return yaml.safeDump(buffer.toString());
  }

  /**
   * Dump data in a yaml file
   * @param filepath Destination file path
   * @param data Data to dump
   */
  public static async save(filepath: string, data: any) {
    const dump: string = yaml.safeDump(data);
    return await fs.writeFile(filepath, dump);
  }

  public static saveSync(filepath: string, data: any) {
    return fs.writeFileSync(filepath, yaml.safeDump(data));
  }
}
