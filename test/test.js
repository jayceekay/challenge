var expect = require('chai').expect;
const solve = require('../src/solution').solve

describe("solve", () => {
  it("solve", () => {

    const ans = solve();
    expect(ans).to.be.equal(4);
  });
});
