import {buildUrl} from "./fetchutils";

const url = "example.com/";

test("buildUrl returns url unchanged when no parameters", () => {
  expect(buildUrl(url, {})).toEqual(url);
});

test("buildUrl adds single parameter to url", () => {
  expect(buildUrl(url, {bingo: 42})).toEqual(url+"?bingo=42");
});

test("buildUrl adds multiple parameters to url", () => {
  expect(buildUrl(url, {bingo: 42, bongo: 3.14})).toEqual(url+"?bingo=42&bongo=3.14");
});

test("buildUrl adds multiple parameters with list to url", () => {
  expect(buildUrl(url, {bingo: [42, 25], bongo: 3.14})).toEqual(url+"?bingo=42&bingo=25&bongo=3.14");
});

