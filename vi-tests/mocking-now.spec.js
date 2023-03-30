import {vi, it, expect} from 'vitest'

function getNow() {
    return new Date(Date.now());
}

/*
 * Some important notes:
 *
 * 1. We call `vi.useRealTimers();` at the end of the test.
 * 2. System timers are a shared fixture, so this is not suitable for parallel tests.
 *
 */
it ('Should mock Date.now()', () => {
    const expectedNow = new Date();
    vi.useFakeTimers();
    vi.setSystemTime(expectedNow);
    const actualNow = getNow();
    expect(actualNow).toEqual(expectedNow);
    vi.useRealTimers();
});