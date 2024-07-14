import { expect, test } from "@jest/globals";
import image from "../src/image";
// new File(["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="], "test.png", { type: "image/png" })

const imagePng = [
  {
    name: "aboba",
    size: 23522,
    type: "image/png",
    lastModified: 1720942655739,
    lastModifiedDate: new Date(1720942655739),
  },
] as unknown as FileList;

const filePhp = [
  {
    name: "index.blade.php",
    size: 23522,
    type: "",
    lastModified: 1720942655739,
    lastModifiedDate: new Date(1720942655739),
  },
] as unknown as FileList;

const field = "field";
const message = `The ${field} must be a file of image/jpeg, image/png, image/webp - 'index.blade.php'`;

test("image test", () => {
  expect(image(imagePng, field)).toBe(true);

  expect(image(filePhp, field)).toBe(message);
  //   expect(image("image@gmail", field)).toBe(message);
});
