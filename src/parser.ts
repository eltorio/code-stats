/*!
=========================================================
* © 2022 Ronan LE MEILLAT for Internal use
=========================================================
This is based on an original idea of:
- https://github.com/cb372/line-count (public domain)
*/
import fs from "fs";
import mime from "mime";
import readline from "readline";
import { FileTypes, SingleResult } from ".";

function getExtension(path: string) {
  const lastDot = path.lastIndexOf(".");
  if (lastDot > -1) {
    return path.substring(lastDot + 1);
  } else {
    return "";
  }
}

const codeFileTypes: FileTypes = {
  java: "Java",
  scala: "Scala",
  rb: "Ruby",
  c: "C",
  "c++": "C++",
  php: "PHP",
  pl: "Perl",
  js: "JavaScript",
  mjs: "JavaScript",
  cjs: "JavaScript",
  sh: "Shell",
  cs: "CSharp",
  fs: "FSharp",
  vb: "Visual Basic",
  py: "Python",
  bat: "Batch",
  cmd: "Batch",
  html: "Html",
  css: "Stylesheets",
  scss: "Stylesheets",
  ps1: "Powershell",
  xml: "Xml",
  json: "Json",
  vue: "Vue",
  ts: "Typescript",
  tsx: "React Typescript",
  jsx: "React JavaScript",
  md: "Markdown"
};

function getCodeFileType(extension: string) {
  return codeFileTypes[extension];
}

function parseCodeFile(path: string, filetype: string, onSuccess:(value:SingleResult)=>void) {
  const result = {
    filetype: filetype,
    lines: 0,
    codeLines: 0,
  } as SingleResult;

  // TODO Better parsing to handle cases such as multi-line comments
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    //debug(`Line from file: ${line}`);
    result.lines += 1;

    // TODO Better parsing to handle cases such as multi-line comments
    const trimmed = line.trim();
    if (
      trimmed.length > 0 &&
      trimmed.indexOf("#") != 0 &&
      trimmed.indexOf("//") != 0 &&
      trimmed.indexOf("/*") != 0
    ) {
      result.codeLines += 1;
    }
  });
  rl.on("close", () => {
    onSuccess(result);
  });
}

function parseTextFile(path: string, onSuccess:(value:SingleResult)=>void) {
  const result = {
    filetype: "Text",
    lines: 0,
    codeLines: 0,
  } as SingleResult;

  // Simply count all lines as non-code lines
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
    crlfDelay: Infinity,
  });

  rl.on("line", (line) => {
    //debug(`Line from file: ${line}`);
    result.lines += 1;
  });
  rl.on("close", () => {
    onSuccess(result);
  });
}

export const Parser = {
  parse: function (path: string, onSuccess:(fileResult: SingleResult) => void) {
    const extension = getExtension(path);
    const codeFileType = getCodeFileType(extension);
    const mimeType = mime.getType(path) || "binary/unknown";
    if (codeFileType) {
      parseCodeFile(path, codeFileType, onSuccess);
    } else if (mimeType.indexOf("text/") == 0) {
      parseTextFile(path, onSuccess);
    } else {
      // unsupported file type
      onSuccess({}as SingleResult);
    }
  },
};
