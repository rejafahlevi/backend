const {
  addMentalHandler,
  getAllMentalHandler,
  getMentalByIdHandler,
  editMentalByIdHandler,
  deleteMentalByIdHandler,
} = require("./handler");

const routes = [
  // /
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Sukses";
    },
  },
  // create date (POST)
  {
    method: "POST",
    path: "/mental",
    handler: addMentalHandler,
  },
  //get all
  {
    method: "GET",
    path: "/mental",
    handler: getAllMentalHandler,
  },
  //detail data
  {
    method: "GET",
    path: "/mental/{id}",
    handler: getMentalByIdHandler,
  },
  //update
  {
    method: "PUT",
    path: "/mental/{id}",
    handler: editMentalByIdHandler,
  },
  //delete
  {
    method: "DELETE",
    path: "/mental/{id}",
    handler: deleteMentalByIdHandler,
  },
];

module.exports = { routes };
