const Hapi = require("@hapi/hapi");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "metcha.cyun0xqnspm3.ap-southeast-1.rds.amazonaws.com",
  user: "reja",
  password: "12345678",
  database: "metcha",
});

connection.connect((err) => {
  if (err) {
    console.error("Koneksi Ke database gagal:", err);
    process.exit(1);
  }
  console.log("Terhubung ke database MySQL");
});

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "0.0.0.0",
  });

  // Tambahkan rute atau pengaturan server lainnya disini
//   server.route({
//     method: "GET",
//     path: "/",
//     handler: (request, h) => {
//       return "Hello world";
//     },
//   });

  // Get all mental_data
  server.route({
    method: "GET",
    path: "/mental_data",
    handler: (request, h) => {
      return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM mental_data", (error, results) => {
          if (error) {
            reject(
              h.response({
                status: "failed",
                message: "gagal get all data",
                data: error,
              })
            );
          } else {
            resolve(
              h.response({
                status: "success",
                message: "Berhasil get all data",
                data: results,
              })
            );
          }
        });
      });
    },
  });

  // Get mental_data by Id
  server.route({
    method: "GET",
    path: "/mental_data/{id}",
    handler: (request, h) => {
      const mental_dataId = request.params.id;
      return new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM mental_data where id=?",
          [mental_dataId],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(
                h
                  .response({
                    status: "success",
                    message: "Berhasil get data by Id",
                    data: results[0],
                  })
                  .code(200)
              );
            }
          }
        );
      });
    },
  });

  // add new data
  server.route({
    method: "POST",
    path: "/mental_data",
    handler: (request, h) => {
      const {
        nama,
        mbti,
        mh_test,
      } = request.payload;
      return new Promise((resolve, reject) => {
        connection.query(
          "INSERT INTO mental_data (nama,mbti,mh_test) VALUES (?,?,?)",
          [
            nama,
            mbti,
            mh_test,
          ],
          (error, results) => {
            if (error) {
              console.log(error);
              reject(error);
            } else {
              resolve(
                h
                  .response({
                    status: "success",
                    message: "success create new data",
                    data: {
                      id: results.insertId,
                      nama,
                      mbti,
                      mh_test,
                    },
                  })
                  .code(200)
              );
            }
          }
        );
      });
    },
  });

  // edit mental_data by id
  server.route({
    method: "PUT",
    path: "/mental_data/{id}",
    handler: (request, h) => {
      const mental_dataId = request.params.id;
      const {
        nama,
        mbti,
        mh_test,
      } = request.payload;
      return new Promise((resolve, reject) => {
        connection.query(
          "UPDATE mental_data SET nama=?,mbti=?,mh_test=? where id=?",
          [
            nama,
            mbti,
            mh_test,
            mental_dataId,
          ],
          (error, results) => {
            if (error) {
              reject(error);
            } else {
              resolve(
                h
                  .response({
                    status: "success",
                    message: "success update data",
                    data: {
                      id: results.insertId,
                      nama,
                      mbti,
                      mh_test,
                    },
                  })
                  .code(200)
              );
            }
          }
        );
      });
    },
  });

  //delete mental_data by id
  server.route({
    method: "DELETE",
    path: "/mental_data/{id}",
    handler: (request, h) => {
      const mental_dataId = request.params.id;
      return new Promise((resolve, reject) => {
        connection.query("DELETE FROM mental_data WHERE id = ?", [mental_dataId], (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(
              h
                .response({
                  status: "success",
                  message: "Berhasil hapus data",
                  data: {
                    mental_dataId: mental_dataId,
                  },
                })
                .code(200)
            );
          }
        });
      });
    },
  });

  await server.start();
  console.log("Server running on", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log("error: ", err);
  process.exit(1);
});

init();