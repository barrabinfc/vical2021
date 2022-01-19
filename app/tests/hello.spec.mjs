import { expect } from "chai";
import { describe } from "mocha";

import { springs } from "../app/lib/animations.js";

describe("appmap", () => {
  it("Should record execution", () => {
    expect(1 + 1).eql(2);
  });
  //   it("Should list function in lib/", () => {});
  it("CustomError have a .name property", () => {
    class MyCustomError extends CustomError {
      name = "MyCustomError";
    }
    let myCustomErrorInstance = new MyCustomError("MyCustomError went wrong");
    expect(myCustomErrorInstance.name).to.eqls("MyCustomError");
  });
});
