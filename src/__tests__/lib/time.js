import { reworkTime } from "../../lib/time";

test("check if function reworkTime works for 0 seconds", () => {
    expect(
        reworkTime(0)
    ).toEqual([0, 0, 0, 0])
});

test("check if function reworkTime works for 0.5 seconds", () => {
    expect(
        reworkTime(0.5)
    ).toEqual([0, 0, 0, 500])
});

test("check if function reworkTime works for 30 seconds", () => {
    expect(
        reworkTime(30)
    ).toEqual([0, 0, 30, 0])
});

test("check if function reworkTime works for 60 seconds", () => {
    expect(
        reworkTime(60)
    ).toEqual([0, 1, 0, 0])
});

test("check if function reworkTime works for 3600 seconds", () => {
    expect(
        reworkTime(3600)
    ).toEqual([1, 0, 0, 0])
});