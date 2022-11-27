import notion_time_to_dates from "./notion_time_to_dates";

test("Throws an error if given wrong format", () => {
  try {
    notion_time_to_dates("wrong format!");
  } catch (e) {
    if (e instanceof Error) expect(e.message).toContain("INVALID FORMAT");
  }
});

test("Returns valid dates", () => {
  const { startTime, endTime } = notion_time_to_dates("24/11/2022 12:00-12:30");
  expect(startTime.getMonth()).toBe(11 - 1);
  expect(startTime.getFullYear()).toBe(2022);
  expect(startTime.getDate()).toBe(24);
  expect(startTime.getHours()).toBe(12);
  expect(startTime.getMinutes()).toBe(0);

  expect(endTime.getMonth()).toBe(11 - 1);
  expect(endTime.getFullYear()).toBe(2022);
  expect(endTime.getDate()).toBe(24);
  expect(endTime.getHours()).toBe(12);
  expect(endTime.getMinutes()).toBe(30);
});
