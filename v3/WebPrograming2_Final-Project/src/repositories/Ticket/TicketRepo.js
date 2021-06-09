const sequelize = require("../../config/database");
const { QueryTypes } = require("sequelize");
const Ticket = require("../../models/Ticket/Ticket");

// --------------------------------- BASIC QUERY  ---------------------------------

Ticket.getByID = async function (id) {
  return Ticket.findByPk(id);
};

Ticket.getAll = async function () {
  return Ticket.findAll();
};

Ticket.add = async function (new_ticket) {
  const newTicket = await Ticket.create({
    chairCode: new_ticket.chairCode,
    horizontalAddress: new_ticket.horizontalAddress,
    verticleAddress: new_ticket.verticleAddress,
    price: 45000,
    booking_id: new_ticket.booking_id,
  });
  await newTicket.save();
  return newTicket;
};

Ticket.delete = async function (ticket_id_delete) {
  await Ticket.destroy({
    where: { uuid: ticket_id_delete },
  });
};

Ticket.updateRecord = async function (ticket_update) {
  try {
    const newTicketDetail = {
      chairCode: ticket_update.chairCode,
      horizontalAddress: ticket_update.horizontalAddress,
      verticleAddress: ticket_update.verticleAddress,
    };

    Ticket.update(newTicketDetail, {
      where: { uuid: ticket_update.uuid },
    });
  } catch (error) {
    console.log(error);
  }
};

Ticket.getAllSeatUnvailable = async function (filmID, showtimeID) {
  const ticketsHaveSeatUnavailable = sequelize.query(
    `SELECT t.* FROM tickets t JOIN bookings b ON t.booking_id = b.uuid JOIN showtimes s ON s.uuid = b.showtime_id WHERE s.film_id = '${filmID}'`,
    {
      type: QueryTypes.SELECT,
    }
  );
  return ticketsHaveSeatUnavailable;
};

// --------------------------------- ADVANCED QUERY  ---------------------------------

module.exports = Ticket;
