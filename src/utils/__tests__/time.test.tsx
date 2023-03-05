import { renderLastUpdated, toHoursAndMinutes } from "../time";

import "@testing-library/jest-native/extend-expect";

describe("renderLastUpdated()", () => {
  it("should return 'Last updated now' when lastUpdated is 0", () => {
    // test for 0
    expect(renderLastUpdated(0)).toBe("Last updated now");
  });

  it("should return 'Last updated 1 min ago' when lastUpdated is 1", () => {
    // test for 1
    expect(renderLastUpdated(1)).toBe("Last updated 1 min ago");
  });

  it("should return 'Last updated 2 mins ago' when lastUpdated is 2", () => {
    // test for 2
    expect(renderLastUpdated(2)).toBe("Last updated 2 mins ago");
  });

  it("should return 'Last updated 59 mins ago' when lastUpdated is 59", () => {
    // test for 59
    expect(renderLastUpdated(59)).toBe("Last updated 59 mins ago");
  });

  it("should return 'Last updated 1 hour ago' when lastUpdated is 60", () => {
    // test for 60
    expect(renderLastUpdated(60)).toBe("Last updated 1 hour ago");
  });

  it("should return 'Last updated 2 hours ago' when lastUpdated is 120", () => {
    // test for 120
    expect(renderLastUpdated(120)).toBe("Last updated 2 hours ago");
  });

  it("should return 'Last updated 23 hours ago' when lastUpdated is 1380", () => {
    // test for 1380
    expect(renderLastUpdated(1380)).toBe("Last updated 23 hours ago");
  });
});

describe("toHoursAndMinutes()", () => {
  it("should only return minutes when numMinutes is less than 60", () => {
    expect(toHoursAndMinutes(0)).toBe("0 min");
    expect(toHoursAndMinutes(1)).toBe("1 min");
    expect(toHoursAndMinutes(59)).toBe("59 min");
  });

  it("should return hours and minutes when numMinutes is greater than 60", () => {
    expect(toHoursAndMinutes(60)).toBe("1 hrs 0 min");
    expect(toHoursAndMinutes(61)).toBe("1 hrs 1 min");
    expect(toHoursAndMinutes(119)).toBe("1 hrs 59 min");
    expect(toHoursAndMinutes(350)).toBe("5 hrs 50 min");
  });
});
