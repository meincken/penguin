var dataURL = "data.json";

fetch(dataURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    let endPoint = json;
    var jsonObject = endPoint;
    var string = JSON.stringify(jsonObject).replace(
      /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
      ""
    );
    var books = JSON.parse(string);
    initialize(books);
  })
  .catch(function(err) {
    console.log(err.message);
  });

function initialize(books) {
  const main = document.querySelector("main");
  let bookGroup;
  bookGroup = books;
  display();
  bookGroup = [];

  function display() {
    for (let i = 0; i < bookGroup.length; i++) {
      fetchBlob(bookGroup[i]);
    }
  }

  function fetchBlob(book) {
    let url = book.image;
    fetch(url)
      .then(function(response) {
        return response.blob();
      })
      .then(function(blob) {
        let objectURL = URL.createObjectURL(blob);
        showBooks(objectURL, book);
      });
  }

  function showBooks(objectURL, book) {
    const section = document.createElement("section");
    const link = document.createElement("a");
    const image = document.createElement("img");
    const heading = document.createElement("h2");
    const author = document.createElement("p");

    link.href = book.url;
    heading.textContent = book.title;
    author.textContent = book.author;

    image.src = objectURL;
    image.alt = book.title;

    main.appendChild(section);
    section.appendChild(link);
    link.appendChild(image);
    link.appendChild(heading);
    link.appendChild(author);
  }
}
