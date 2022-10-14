
1. Debinder DataThe situation is this: we have used our NaviCloud Custom Debinder scanner to scan the contents of a large library. Unfortunately, its output is a large, unsorted JSON dictionary wherein the keys are ISBNs and the values an array of author, title, and all the sentences of the book. For instance:



{

"9780736639859" :["Leo Tolstoy", "Anna Karenina", "Happy families are all alike; every unhappy family is unhappy in its own way", "Everything was in confusion in the Oblonskys' house", ...],



"9788491051329" : ["Jane Austen", "Pride and Prejudice", "It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife", "However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters", ...],



"9780140232929" : ["Neal Stephenson", "Snow Crash", "The Deliverator belongs to an elite order, a hallowed subcategory", "He's got esprit up to here", ...],



...

}



Your mission is to write a function which will take this data and transform it into a different structure: a sorted array of 'author' dictionaries, sorted by author name, whose keys are 'name' and 'books'. The value of 'books' is a sorted array of 'book' dictionaries, sorted by title, whose keys are 'isbn', 'title', and 'text'. 'text' remains an array of sentences. To illustrate, the above would be converted to



[

{ "name": "Austen, Jane",

 "books": [

 {

  "title" : "Pride and Prejudice",

  "isbn" : "9788491051329",

  "text" : ["It is a truth universally acknowledged, that a single man in possession of a good fortune must be in want of a wife", "However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered as the rightful property of some one or other of their daughters", ...]

 },

 ...

]},

{ "name": "Stephenson, Neal",

 "books" : [

 {

   "title" : "Snow Crash",

  "isbn" : "9780140232929",

  "text" : ["The Deliverator belongs to an elite order, a hallowed subcategory", "He's got esprit up to here", ...]

 },

 ...

]},

{ "name": "Tolstoy, Leo",

 "books" : [

 {

   "title" : "Anna Karenina",

  "isbn" : "9780736639859",

  "text" : ["Happy families are all alike; every unhappy family is unhappy in its own way", "Everything was in confusion in the Oblonskys' house", ...]

 },

 ...

 ]},

 ...

]



Assume that reading from stdin and writing to stdout are costless. Otherwise, since this is a large library, efficiency and resource minimization are of some importance, but of course so are readability and testability.You are strongly encouraged to discuss these factors, as well as any others which seem relevant to you, and/or any assumptions you are making about the data (cf. the famous essay Falsehoods Programmers Believe About Names) in the comments. The input is a single line of JSON stripped of all whitespace; the output should be too. We're more interested in your code and your comments than your score.

