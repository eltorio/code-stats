/*!
=========================================================
* © 2022 Ronan LE MEILLAT for Internal use
=========================================================
This is based on an original idea of:
- https://github.com/cb372/line-count (public domain)
*/
import fs from "fs";
import { Parser } from "./parser.js";
import type { GlobalResults, SingleResult } from ".";

const debug = (value: any) => {
  if (process.env.DEBUG) {
    console.debug(value);
  }
};

function walkRepo(path: string | string[], onFile: (path: string) => void) {
  let dirs: string[] = [];
  if (typeof path === "string") {
    dirs.push(path);
  } else {
    dirs = path
  }
  
  dirs.forEach((_path) => {
    if (fs.existsSync(_path)) {
      fs.readdirSync(_path).forEach((file, index) => {
        if (file.indexOf(".git") != 0) {
          // skip git-related files and dirs
          const curPath = `${_path}/${file}`;
          if (fs.statSync(curPath).isDirectory()) {
            // recurse
            walkRepo(curPath, onFile);
          } else {
            // process file and update accumulated result
            onFile(curPath);
          }
        }
      });
    }
  });
}

function addResult(acc: GlobalResults, newResult: SingleResult) {
  if (newResult) {
    if (acc.hasOwnProperty(newResult.filetype)) {
      acc[newResult.filetype].files += 1;
      acc[newResult.filetype].lines += newResult.lines;
      acc[newResult.filetype].codeLines += newResult.codeLines;
    } else {
      acc[newResult.filetype] = {
        files: 1,
        lines: newResult.lines,
        codeLines: newResult.codeLines,
      };
    }
  }
}

function getFilename(path: string) {
  const lastSlash = path.lastIndexOf("/");
  if (lastSlash > -1) {
    return path.substring(lastSlash + 1);
  } else {
    return path;
  }
}

function countLines(
  rootDir: string|string[],
  onComplete: (results: GlobalResults) => void
) {
  debug("Counting lines...");

  let filesRemaining = 0;
  const results = {} as GlobalResults;
  let walkComplete = false;

  const onFileParseResult = (fileResult: SingleResult) => {
    addResult(results, fileResult);
    filesRemaining -= 1;
    if (walkComplete && filesRemaining == 0) {
      // all files have been parsed, so we're done
      onComplete(results);
    }
  };

  const onFile = (path: string) => {
    filesRemaining += 1;
    debug(`Parsing file: ${getFilename(path)}`);
    Parser.parse(path, onFileParseResult);
  };

  walkRepo(rootDir, onFile);
  walkComplete = true;
}

export const LineCount = {
  /**
   *
   * @param rootDir base directory to scan can be a single string or an array of string
   * @param onComplete callback when finished
   * @returns
   */
  countLinesCb: function (
    rootDir: string|string[],
    onComplete: (value: GlobalResults) => void
  ) {
    return countLines(rootDir, onComplete);
  },

  /**
   *
   * @param rootDir base directory to scan can be a single string or an array of string
   * @returns a Promise with the GlobalResults
   */
  countLines: function (rootDir: string|string[]): Promise<GlobalResults> {
    return new Promise<GlobalResults>((resolve) => {
      const _cb = (results: GlobalResults) => {
        resolve(results);
      };
      countLines(rootDir, _cb);
    });
  },
};
