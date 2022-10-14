
class Author {
  constructor(name) {
    this.name = name;
    // don't directly add. improvement: use new ES/js class privacy features
    this._books = [];

    this.left = null;
    this.right = null;
  }

  addBook(book) {
    this._books.push(book);
    // in place but expensive, use a tree
    this._books.sort((a, b) => a.title < b.title ? -1 : 1);
  }
}

class Book {
  constructor({ isbn, author, title, sentences }) {
    this.author = author;
    this.title = title;
    this.sentences = sentences;
    this.isbn = isbn;

    // for a future tree
    // this.left = null;
    // this.right = null;
  }
}

class BookTree {
  constructor() {
    this.root = null;
  }

  // book is a Book
  makeAuthorNode(book) {
    let auth = new Author(book.author)
    auth.addBook(book)
    return auth;
  }

  // data pojo
  insert(bookData) {
    var book = new Book(bookData);

    if (this.root === null) this.root = this.makeAuthorNode(book);
    else this.insertNode(this.root, book);
  }

  // sloppy passing off of different "types" of data
  // book is a Book
  insertNode(authNode, book) {
    if (authNode == null) { 
      authNode = this.makeAuthorNode(book)
      return;
    }

    if (authNode.name == book.author) {
      authNode.addBook(book);
      return;
    }

    if (authNode.name < book.author) {
      if (authNode.right === null) authNode.right = this.makeAuthorNode(book);
      else this.insertNode(authNode.right, book);
    } else {
      if (authNode.left === null) authNode.left = this.makeAuthorNode(book);
      else this.insertNode(authNode.left, book);
    }
  }

  print() {
    return this.walk(this.root);
  }

  walk(node, fn = console.log) {
    if (node != null) {
      this.walk(node.left);
      // may want to use apply?
      fn(node);
      this.walk(node.right);
    }
  }
}

// for testing. booksArrlooks like this:
// `{ [isbn]: [auth, title, ...rest], [isbn2]: [auth2, title2, ...rest2] }` for testing purposes
function organize(booksObj, tree) {
  // o(n)
  return Object.keys(booksObj).map((isbn) => {
    const [author, title, ...sentences] = booksObj[isbn];

    // could also use a proper class/struct for this to enforce attrs
    const book = { isbn, author, title, ...sentences };

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

function solve() {
  process.stdin.resume();
  process.stdin.setEncoding("ascii");

  var input = "";

  process.stdin.on("data", function (chunk) {
    input += chunk;
  });

  process.stdin.on("end", function () {
    return processInput(input);
  });
}

// for the problem presened in hackerrank with stdio as input
module.exports.solve = solve;
// for me to test
module.exports.organize = organize;
module.exports.BookTree = BookTree;
