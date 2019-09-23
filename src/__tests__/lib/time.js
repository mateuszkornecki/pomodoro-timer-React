import { reworkTime } from "../../lib/time";

describe("reworkTime", () => {

    describe('for durattion lesser than 1 second', () => {
        it("returns 0 hours, 0 minutes, 0 seconds, 0 ms for 0 seconds duration", () => {
            expect(
                reworkTime(0)
            ).toEqual([0, 0, 0, 0])
        });

        it("returns 0 hours, 0 minutes, 0 seconds, 500 ms for 0.5 seconds duration", () => {
            expect(
                reworkTime(0.5)
            ).toEqual([0, 0, 0, 500])
        });
    });

    describe('for duration higher pr equal than 1 second but lesser than 1 minute', () => {
        it("returns 0 hours, 0 minutes, 1 seconds, 0 ms for 1 seconds duration", () => {
            expect(
                reworkTime(1)
            ).toEqual([0, 0, 1, 0])
        });
        it("returns 0 hours, 0 minutes, 1 seconds, 500 ms for 1.5 seconds duration", () => {
            expect(
                reworkTime(1.5)
            ).toEqual([0, 0, 1, 500])
        });
    });

    describe('for duration higher or equal to 1 minute but lesser than 60 minutes', () => {
        it("returns 0 hours, 1 minutes, 0 seconds, 0 ms for 60 seconds duration", () => {
            expect(
                reworkTime(60)
            ).toEqual([0, 1, 0, 0])
        });
        it("returns 0 hours, 1 minutes, 30 seconds, 0 ms for 90 seconds duration", () => {
            expect(
                reworkTime(90)
            ).toEqual([0, 1, 30, 0])
        });

    });

    describe('for duration higher or equal to 1 hour', () => {
        it("returns 1 hours, 0 minutes, 0 seconds, 0 ms for 3600 seconds duration", () => {
            expect(
                reworkTime(3600)
            ).toEqual([1, 0, 0, 0])
        });
        it("returns 1 hours, 30 minutes, 0 seconds, 0 ms for 5400 seconds duration", () => {
            expect(
                reworkTime(5400)
            ).toEqual([1, 30, 0, 0])
        });
    });
})
