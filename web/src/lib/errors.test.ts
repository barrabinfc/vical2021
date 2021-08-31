import { CustomError } from "./errors";
import { test } from "uvu";
import * as assert from "uvu/assert";

test("CustomError have a .name property", () => {
  class MyCustomError extends CustomError {
    name = "MyCustomError";
  }
  let myCustomErrorInstance = new MyCustomError("MyCustomError went wrong");
  assert.is(myCustomErrorInstance.name, "MyCustomError");
});

test.run();
