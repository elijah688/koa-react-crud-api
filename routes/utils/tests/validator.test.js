const item = require("../../../models/item");
const { validate } = require("../validator");

describe("validator.js", () => {
  it("returns true if body is valid", () => {
    // Arrange
    const body = { title: "title", content: "title", src: "title" };
    // Act
    const received = validate(body);
    // Assert
    expect(received).toBeTruthy();
  });
  it("returns throws if body has extra properties", () => {
    // Arrange
    const expected = [
      {
        keyword: "additionalProperties",
        dataPath: "",
        schemaPath: "#/additionalProperties",
        params: { additionalProperty: "price" },
        message: "should NOT have additional properties",
      },
    ];
    const body = {
      title: "title",
      content: "title",
      src: "title",
      price: 20.99,
    };
    // Act
    try {
      validate(body);
    } catch (error) {
      expect(error).toStrictEqual(expected);
    }
  });
  it("returns throws if body is invalid", () => {
    // Arrange
    const expected = [
      {
        keyword: "required",
        dataPath: "",
        schemaPath: "#/required",
        params: { missingProperty: "src" },
        message: "should have required property 'src'",
      },
    ];
    const body = {
      title: "title",
      content: "title",
    };
    // Act
    try {
      validate(body);
    } catch (error) {
      console.log(JSON.stringify(error));
      expect(error).toStrictEqual(expected);
    }
  });
});
