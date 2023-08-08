const Router = require("express").Router();
const productModel = require("../../Database/db").productModel;
const axios = require("axios");
const {
  getDataBasedOnMonthAndSearch,
  getStatiticsData,
  getBarChartData,
  getPieChartData,
} = require("./functions");

// API to initialize the database.

Router.get("/seed", (req, res) => {
  axios
    .get("https://s3.amazonaws.com/roxiler.com/product_transaction.json")
    .then((response) => {
      console.log(response);
      let data = response.data;
      let dataModel = data.map((i) => {
        return new productModel({
          id: i["id"],
          title: i["title"],
          price: i["price"],
          description: i["description"],
          category: i["category"],
          image: i["image"],
          sold: i["sold"],
          dateOfSale: new Date(i["dateOfSale"]),
        });
      });
      dataModel
        .forEach(async (item) => {
          try {
            await item.save();
            res.json({ text: "Data Added" });
          } catch (err) {
            console.log(err);
            res.status(400).send({ error: err });
            res.end();
          }
        })
        .catch((err) => {
          res.status(400).send({ error: err });
          res.end();
        });
    });
});

// API to list the all transactions
Router.get("/get-data", (req, res) => {
  let { page, limit, month, searchTerm } = req.query;
  console.log(req.query);

  let productData = getDataBasedOnMonthAndSearch(
    month,
    productModel,
    page,
    limit,
    searchTerm
  );

  productData.exec((err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send({ error: err });
      res.end();
    } else {
      console.log(data);
      res.status(200).send({
        data: data.slice((page - 1) * limit, limit * page),
        totalData: data.length,
      });
      res.end();
    }
  });
});

// API for statistics
Router.get("/get-statistics", (req, res) => {
  let { month } = req.query;

  let returnData = getStatiticsData(month, productModel);
  returnData
    .then((data) => {
      res.status(200).send({ data: data });
      res.end;
    })
    .catch((err) => {
      res.status(400).send({ error: err });
      res.end;
    });
});

// API for Bar Graph

Router.get("/get-barchart", (req, res) => {
  let { month } = req.query;

  let returnData = getBarChartData(month, productModel);
  returnData
    .then((data) => {
      res.status(200).send({ data: data });
      res.end;
    })
    .catch((err) => {
      res.status(400).send({ error: err });
      res.end;
    });
});

// API for Pie Graph

Router.get("/get-piechart", (req, res) => {
  let { month } = req.query;

  let returnData = getPieChartData(month, productModel);
  returnData
    .then((data) => {
      res.status(200).send({ data: data });
      res.end;
    })
    .catch((err) => {
      res.status(400).send({ error: err });
      res.end;
    });
});

// API for Get all

Router.get("/get-all", (req, res) => {
  let { page, limit, month, searchTerm } = req.query;

  let productData = getDataBasedOnMonthAndSearch(
    month,
    productModel,
    page,
    limit,
    searchTerm
  );

  productData.exec((err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send({ error: err });
      res.end();
    } else {
      let jsonData = {
        data: data.slice((page - 1) * limit, limit * page),
        totalData: data.length,
      };

      getStatiticsData(month, productModel)
        .then((sdata) => {
          jsonData["statitics"] = sdata;
          getBarChartData(month, productModel)
            .then((bdata) => {
              jsonData["bargraphdata"] = bdata;
              getPieChartData(month, productModel)
                .then((pdata) => {
                  jsonData["piechartdata"] = pdata;
                  res.status(400).send({ data: jsonData });
                  res.end;
                })
                .catch((err) => {
                  res.status(400).send({ error: err });
                  res.end();
                });
            })
            .catch((err) => {
              res.status(400).send({ error: err });
              res.end();
            });
        })
        .catch((err) => {
          res.status(400).send({ error: err });
          res.end();
        });
    }
  });
});

module.exports = Router;
