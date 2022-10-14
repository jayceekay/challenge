class Book {
  constructor({ isbn, author, sentences }) {
    this.author = author;
    this.sentences = sentences;
    this.isbn = isbn;

    this.left = null;
    this.right = null;
  }
}

class BookTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    var node = new Book(data);

    if (this.root === null) this.root = node;
    else this.insertNode(this.root, node);
  }

  insertNode(node, book) {
    if (node.author < book.author) {
      if (node.right === null) node.right = book;
      else this.insertNode(node.right, book);
    } else {
      if (node.left === null) node.left = book;
      else this.insertNode(node.left, book);
    }
  }

  print() {
    return this.walk(this.root, console.log);
  }

  walk(node, fn) {
    if (node !== null) {
      this.walk(node.left);
      fn(node);
      this.walk(node.right);
    }
  }
}

function titleSort(a, b) {
  return a.title < b.title;
}

// for testing. booksArrlooks like this:
// `{ [isbn]: [auth, title, ...rest], [isbn2]: [auth2, title2, ...rest2] }` for testing purposes
function organize(booksObj, tree) {
  // o(n)
  return Object.keys(booksObj).map(isbn => {
    const [author, title, ...sentences] = booksObj[isbn]
    //
    // sort our books by title while we're here - should sort in place?
    books.sort(titleSort);

    // could also use a proper class/struct for this to enforce attrs
    const book = { isbn, author, title, ...sentences };
    // n log n (max depth based on n items)
    return tree.insert(book);
  });
}

function processInput(input) {
  let booksArr;
  try {
    booksArr = JSON.decode(input);
  } catch (err) {
    // cry
  }

  let tree = new BookTree();
  organize(booksArr, tree);
  return tree;
}

// for the problem presened in hackerrank with stdio as input
module.exports.solve = function solve() {
  process.stdin.resume();
  process.stdin.setEncoding("ascii");

  var input = "";

  process.stdin.on("data", function (chunk) {
    input += chunk;
  });

  process.stdin.on("end", function () {
    return processInput(input)
  });
};

module.exports.organize = organize;
module.exports.BookTree = BookTree;
