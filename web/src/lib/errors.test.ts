import { CustomError } from "./errors";
import { test } from "uvu";
import * as assert from "uvu/assert";

test("CustomError have a .name property", () => {
  class MyCustomError extends CustomError {
    name: "MyCustoMError";
  }
  let myCustomErrorInstance = new MyCustomError("MyCustomError went wrong");
  assert.is(myCustomErrorInstance.name, "CustomError");
});

test.run();
