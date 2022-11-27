/*!
=========================================================
* © 2022 Ronan LE MEILLAT for Internal use
=========================================================
This is based on an original idea of:
- https://github.com/cb372/line-count (public domain)
*/
import { expect } from "chai";
import { LineCount } from "../dist/index.js";
import { GlobalResults } from "index";


describe("Basic test with test directory",  () => {
  it("Promise call must return a count of 1 file and more than 10 lines", async () => {
    process.env.DEBUG = "1"
    const count = await LineCount.countLines("test");
    expect(count.Typescript.files).to.be.equal(1);
    expect(count.Typescript.codeLines).to.be.greaterThan(18);
    expect(count.Typescript.codeLines).to.be.lessThan(30);
  });

  it("callback must be called with a count of 1 file and more than 10 lines", async () => {
    process.env.DEBUG = "1"
    const onComplete = (count:GlobalResults)=>{
        expect(count.Typescript.files).to.be.equal(1);
        expect(count.Typescript.codeLines).to.be.greaterThan(18);
        expect(count.Typescript.codeLines).to.be.lessThan(30);
    }
    LineCount.countLinesCb("test",onComplete);
  });
});
