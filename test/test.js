var expect = require('chai').expect;
const solution = require('../src/solution')
const BookTree = solution.BookTree;

describe("solve", function() {
  this.timeout(0);

  it("solve", () => {
    const booksObj = require('./test-data')

    let tree = new BookTree()

    solution.organize(booksObj, tree)

    tree.print()
  });
});
