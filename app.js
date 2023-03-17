const express = require("express");
const expressHbs = require('express-handlebars');
const app = express();
const Calculator = require("./Calculator");


app.engine('.hbs', expressHbs.engine({
  extname: "hbs",
  defaultLayout: 'main',
  layoutsDir: "views/layouts/"
}));

app.set('view engine', '.hbs');
app.set('views', './views');
app.listen(3000, () => {
  console.log("Listening on port 3000");
});

app.get('/', (req, res) => {
  res.render('home', {
    layout: 'main',
    //showContentMaytinh: false,

    helpers: {
      foo() { return 'foo. CP17305 - server Android'; }
    }
  });
});
app
  .get("/result", (req, res) => {

    const { numbera, numberb, calculator } = req.query;
    let value = 0;
    switch (calculator) {
      case "add":
        value = Calculator.add(parseInt(numbera), parseInt(numberb));
        break;
      case "subtract":
        value = Calculator.subtract(parseInt(numbera), parseInt(numberb));
        break;
      case "multiply":
        value = Calculator.multiply(parseInt(numbera), parseInt(numberb));
        break;
      case "divide":
        value = Calculator.divide(parseInt(numbera), parseInt(numberb));
        break;
    }
    res.render('emptyView', {
      layout: 'main',
      showContentmaytinh: true,
      numbera: numbera,
      numberb: numberb,
      calculator: value,

    });
    console.log(value);
    
  })
