const { nanoid } = require("nanoid");
const mental = require("./mental");

const addMentalHandler = (request, h) => {
  console.log(`add`);
  const { mbti, mentalhealth } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const udpatedAt = createdAt;

  const newMental = {
    mbti,
    mentalhealth,
    id,
    createdAt,
    udpatedAt,
  };
  mental.mental.push(newMental);
  const isSuccess = mental.mental.filter((mental) => mental.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Data berhasil ditambah",
      data: {
        mbti: mbti,
        mentalhealth: mentalhealth,
        nodeId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.reponse({
    status: "fail",
    message: "Data gagal di tambahkan!",
  });
  response.code(500);
  return response;
};

const getAllMentalHandler = (request, h) => ({
  status: "success get all Data",
  data: {
    mental,
  },
});

// show detail
const getMentalByIdHandler = (request, h) => {
  console.log(`get id`);
  const { id } = request.params;
  const mentals = mental.mental.filter((n) => n.id === id)[0];
  if (mentals !== undefined) {
    return {
      status: "success",
      data: {
        mental,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Data tidak ditemukan",
  });
  response.code(404);
  return response;
};

//edit book
const editMentalByIdHandler = (request, h) => {
  console.log(`edit`);
  const { id, createAt } = request.params;
  const { mbti, mentalhealth } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = mental.mental.findIndex((mental) => mental.id === id);
  if (index !== -1) {
    mental.mental[index] = {
      ...mental[index],
      mbti,
      mentalhealth,
      id,
      createAt,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Data berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Data gagal diperbarui",
  });
  response.code(404);
  return response;
};

//delete book
const deleteMentalByIdHandler = (request, h) => {
  console.log(`hapus`);
  const { id } = request.params;
  const index = mental.mental.findIndex((mental) => mental.id === id);
  console.log(mental.mental.findIndex((mental) => mental.id === id));
  if (index) {
    mental.mental.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Data berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Data gagal dihapus, Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addMentalHandler,
  getAllMentalHandler,
  getMentalByIdHandler,
  editMentalByIdHandler,
  deleteMentalByIdHandler,
};
