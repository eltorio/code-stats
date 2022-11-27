/*!
=========================================================
* © 2022 Ronan LE MEILLAT for Internal use
=========================================================
This is based on an original idea of:
- https://github.com/cb372/line-count (public domain)
*/
import { expect } from "chai";
import { LineCount } from "../dist/index.js";
import { GlobalResults } from "../dist/index";

describe("Basic test with test directory", () => {
  it("Promise call must return a count of 1 file and more than 10 lines", async () => {
    process.env.DEBUG = "1";
    const count = await LineCount.countLines("test");
    console.log(count);
    expect(count.Typescript.files).to.be.equal(1);
    expect(count.Typescript.codeLines).to.be.greaterThan(30);
    expect(count.Typescript.codeLines).to.be.lessThan(50);
  });

  it("callback must be called with a count of 1 file and more than 30 lines", async () => {
    process.env.DEBUG = "1";
    const onComplete = (count: GlobalResults) => {
      console.log(count);
      expect(count.Typescript.files).to.be.equal(1);
      expect(count.Typescript.codeLines).to.be.greaterThan(30);
      expect(count.Typescript.codeLines).to.be.lessThan(50);
    };
    LineCount.countLinesCb("test", onComplete);
  });
});

describe("Basic test with test and src directory", () => {
  it("Promise call must return a count of 4 file and more than 200 lines", async () => {
    process.env.DEBUG = "1";
    const count = await LineCount.countLines(["test", "src"]);
    console.log(count);
    expect(count.Typescript.files).to.be.equal(4);
    expect(count.Typescript.codeLines).to.be.greaterThan(200);
    expect(count.Typescript.codeLines).to.be.lessThan(300);
  });

  it("callback must be called with a count of 4 file and more than 200 lines", async () => {
    process.env.DEBUG = "1";
    const onComplete = (count: GlobalResults) => {
      console.log(count);
      expect(count.Typescript.files).to.be.equal(4);
      expect(count.Typescript.codeLines).to.be.greaterThan(200);
      expect(count.Typescript.codeLines).to.be.lessThan(300);
    };
    LineCount.countLinesCb(["test", "src"], onComplete);
  });
});
