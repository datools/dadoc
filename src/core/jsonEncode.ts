/**
 * @hidden
 */
import { default as safeStringify } from 'fast-safe-stringify';

/**
 * Dump data to JSON
 *
 * Use : https://github.com/davidmarkclements/fast-safe-stringify
 * @param data Data to dump
 */
export function jsonEncode(data: any): string {
  return safeStringify(data);
}
