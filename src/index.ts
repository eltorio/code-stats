/*!
=========================================================
* © 2022 Ronan LE MEILLAT for Internal use
=========================================================
This is based on an original idea of:
- https://github.com/cb372/line-count (public domain)
*/
import { LineCount } from "./linecount.js";
export type FileTypes = { [key: string]: string };
export type SingleResult = {
  filetype: string;
  lines: number;
  codeLines: number;
};
export type GlobalResult = { files: number; lines: number; codeLines: number };
export type GlobalResults = { [filetype: string]: GlobalResult };

export { LineCount };

