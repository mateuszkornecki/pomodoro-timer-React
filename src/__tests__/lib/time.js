import { reworkTime } from "../../lib/time";

describe("reworkTime", () => {
    describe('for duration less than 1 minute', () => {

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

        it("returns 0 hours, 0 minutes, 30 seconds, 0 ms for 30 seconds duration", () => {
            expect(
                reworkTime(30)
            ).toEqual([0, 0, 30, 0])
        });
    });
    describe('for duration higher or equal to 1 minute', () => {
        it("returns 0 hours, 1 minutes, 0 seconds, 0 ms for 60 seconds duration", () => {
            expect(
                reworkTime(60)
            ).toEqual([0, 1, 0, 0])
        });

        it("returns 1 hours, 0 minutes, 0 seconds, 0 ms for 3600 seconds duration", () => {
            expect(
                reworkTime(3600)
            ).toEqual([1, 0, 0, 0])
        });
    });

})
