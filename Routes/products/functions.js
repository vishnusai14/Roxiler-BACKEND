const indexMonthLink = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getDataBasedOnMonthAndSearch(month, model, pageN, limitN, searchTerm) {
  let index = indexMonthLink.indexOf(month);
  let page = parseInt(pageN);
  let limit = parseInt(limitN);
  //console.log(page);
  //console.log(limit);
  let data;

  if (searchTerm != undefined || searchTerm === "") {
    data = model
      .find({ $expr: { $eq: [{ $month: "$dateOfSale" }, index + 1] } })
      .find({
        $or: [
          { title: { $regex: new RegExp(searchTerm, "i") } },
          { description: { $regex: new RegExp(searchTerm, "i") } },
          { price: { $regex: new RegExp(searchTerm, "i") } },
        ],
      })
      .sort({ id: 1 });
  } else {
    //console.log("Coming Here");
    data = model
      .find({ $expr: { $eq: [{ $month: "$dateOfSale" }, index + 1] } })
      .sort({ id: 1 });
  }

  //console.log("This is the Count");

  return data;
}

function getDataBasedOnMonth(month, model) {
  let index = indexMonthLink.indexOf(month);
  let data = model
    .find({ $expr: { $eq: [{ $month: "$dateOfSale" }, index + 1] } })
    .sort({ id: 1 });
  return data;
}

function getStatiticsData(month, model) {
  const promise = new Promise((resolve, reject) => {
    let receivedData = getDataBasedOnMonth(month, model);
    receivedData.exec((err, data) => {
      if (err) {
        //console.log(err);
        reject(err);
      } else {
        let totalSale = 0;
        let soldNumber = 0;
        let notSoldNumber = 0;
        data.forEach((item) => {
          if (item.sold) {
            totalSale += parseFloat(item.price);
            soldNumber += 1;
          } else {
            notSoldNumber += 1;
          }
        });

        resolve({
          //   data: data,
          totalSale,
          soldNumber,
          notSoldNumber,
        });
      }
    });
  });
  return promise;
}
function getPieChartData(month, model) {
  const promise = new Promise((resolve, reject) => {
    let receivedData = getDataBasedOnMonth(month, model);
    receivedData.exec((err, data) => {
      if (err) {
        reject(err);
      } else {
        let categoryData = {};
        data.forEach((item) => {
          if (categoryData[item.category] != undefined) {
            categoryData[item.category] = categoryData[item.category] + 1;
          } else {
            categoryData[item.category] = 1;
          }
        });
        resolve(categoryData);
      }
    });
  });

  return promise;
}
function getBarChartData(month, model) {
  const promise = new Promise((resolve, reject) => {
    let receivedData = getDataBasedOnMonth(month, model);
    receivedData.exec((err, data) => {
      if (err) {
        reject(err);
      } else {
        //console.log(data);
        let dataRange = {
          "0-100": 0,
          "101-200": 0,
          "201-300": 0,
          "301-400": 0,
          "401-500": 0,
          "501-600": 0,
          "601-700": 0,
          "701-800": 0,
          "801-900": 0,
          "901-above": 0,
        };

        data.forEach((item) => {
          let price = parseFloat(item.price);
          if (price > 0 && price <= 100) {
            dataRange["0-100"] += 1;
          } else if (price > 100 && price <= 200) {
            dataRange["101-200"] += 1;
          } else if (price > 200 && price <= 300) {
            dataRange["201-300"] += 1;
          } else if (price > 300 && price <= 400) {
            dataRange["301-400"] += 1;
          } else if (price > 400 && price <= 500) {
            dataRange["401-500"] += 1;
          } else if (price > 500 && price <= 600) {
            dataRange["501-600"] += 1;
          } else if (price > 600 && price <= 700) {
            dataRange["601-700"] += 1;
          } else if (price > 700 && price <= 800) {
            dataRange["701-800"] += 1;
          } else if (price > 800 && price <= 900) {
            dataRange["801-900"] += 1;
          } else {
            dataRange["901-above"] += 1;
          }
        });
        resolve(dataRange);
      }
    });
  });

  return promise;
}

module.exports = {
  getDataBasedOnMonthAndSearch,
  getDataBasedOnMonth,
  getStatiticsData,
  getBarChartData,
  getPieChartData,
};
