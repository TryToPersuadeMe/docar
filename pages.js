const fs = require("fs");
const path = require("path");

class Page {
  constructor(props) {
    this.filename = props.name;
    this.ext = [...props.ext];

    this.create(this.ext);
  }

  create(ext) {
    console.log("page module is ready".blue);

    ext.forEach((item) => {
      // fs.mkdirSync(path.resolve(__dirname, `src/${item}/${this.filename}`));
      // fs.writeFile(`${this.filename}` + `.${item}`, "Текст", function (err) {});

      // const oldPath = path.resolve(__dirname, `./${this.filename}` + `.${item}`);
      // const newPath = path.resolve(__dirname, `src/${item}/${this.filename}` + `.${item}/`);


    });
  }
}

// const page = new Page({
//   name: "dummy",
//   ext: ["js", "html", "scss"],
// });

module.exports = Page;
