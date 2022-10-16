const { QueryTypes, Sequelize } = require("sequelize");
const { Service, Schedule, Day, Hour, conn, Op } = require("../db.js");

const JSONServices = [
  {
    name: "Corte de pelo",
    description: "Aquí va una descripción de pelo",
    price: 3,
    available: true,
    duration: 35
  },
  {
    name: "Corte de barba",
    description: "Aquí va una descripción de barba",
    price: 5,
    available: true,
    duration: 20
  },
]

const getDBServices = async () => {
  let services = await Service.findAll({
    include: {
      model: Schedule,
      include: {
        model: Day,
        include: Hour,
      },
    },
  });
  
  if (!services.length) {
    services = await Service.bulkCreate(JSONServices, { validate: true });
  }
  return services;
};

const getDBServiceByPk = async (id) => {
  if (id) {
    let services = await Service.findAll({
      where: {
        id,
      },
      include: {
        model: Schedule,
        include: {
          model: Day,
          include: Hour,
        },
      },
    });
    if (!services.length) {
      throw new Error("service not found");
    }

    return services[0];
  } else {
    throw new Error("missing serviceId");
  }
};
const dbDBServiceCreate = async (body) => {
  const { name, price, available, duration } = body;
  if (name && price && typeof available !== "undefined" && duration) {
    await Service.create(body);
    return `service ${body.name} created successfully`
  } else {
    throw new Error("missing params");
  }
};

const dbUpdateService = async (
  { name, description, price, available, duration },
  id
) => {
  if (name && price && typeof available !== "undefined" && duration) {
    const [response] = await Service.update(
      { name, description, price, available, duration },
      {
        where: {
          id,
        },
      }
    );
    if (response) {
      return `service ${name} updated successfully`;
    } else {
      throw new Error("service not found");
    }
  } else {
    throw new Error("missing params");
  }
};
const dbDeleteService = async (id) => {
  await Service.destroy({
    where: { id },
    force: true,
    include: {
      model: Schedule,
      destroy: Schedule,
      include: {
        model: Day,
        include: Hour,
      },
    },
  });
  return `service id:${id} deleted successfully`
};
module.exports = {
  getDBServices,
  getDBServiceByPk,
  dbDBServiceCreate,
  dbUpdateService,
  dbDeleteService,
};
