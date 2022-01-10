import { assert, expect } from "chai";

import { CustomError } from "./errors";

describe("lib/errors", () => {
  it("CustomError have a .name property", () => {
    class MyCustomError extends CustomError {
      name = "MyCustomError";
    }
    let myCustomErrorInstance = new MyCustomError("MyCustomError went wrong");
    expect(myCustomErrorInstance.name).to.eqls("MyCustomError");
  });
});
