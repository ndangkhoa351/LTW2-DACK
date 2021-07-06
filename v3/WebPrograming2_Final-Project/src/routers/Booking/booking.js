const express = require("express");
const router = express.Router();
const BookingRepo = require("../../repositories/Booking/BookingRepo");
const TicketRepo = require("../../repositories/Ticket/TicketRepo");
const UserRepository = require("../../repositories/User/UserRepo");
const CinemaRepo = require("../../repositories/Cinema/CinemaRepo");
const accountSid = 'AC106d5a61f90c26454ddb36c61f7bde9a';
const authToken = '7e1af48910b27719953fda36a1f3ae14';
const client = require('twilio')(accountSid, authToken)
require('dotenv').config();
let EMAIL;
let PASSWORD;

router.get("/choose-seat", (req, res) => {
  //To get available horizontal, verticle address

  const qFilmID = req.query.filmID;
  const showtimeID = req.query.showtimeID;

  TicketRepo.getAllSeatUnvailableInShowTime(qFilmID, showtimeID)
    .then((seatUnavailable) => {
      CinemaRepo.getWithShowTimeID(showtimeID).then(cinemaMatch => {
        res.render("Booking/choose-seat", { seatUnavailable, cinemaMatch });
      }).catch(error => {
        console.log(err);
        res.render("error/error");
      })
    })
    .catch((err) => {
      console.log(err);
      res.render("error/error");
    });
});

router.get("/confirm-booking", (req, res) => {

    const totalChair = req.query.totalChair;
    const chairCodes = req.query.chairCode;
    const h_addresses = req.query.h_address;
    const v_addresses = req.query.v_address;

    let seatChoosenList = '';

    console.log(chairCodes);

    for(let index = 0; index < totalChair; ++index) {
      
      const seat = {
        // If chairCodes array have:
        //    @ only one element, that element will be a string, access it by: chairCodes.
        //    @ more than one element, it will be an element -> access it by: chairCodes[0].
        chairCode: totalChair == 1 ? chairCodes : chairCodes[index],
        horizontalAddress:  h_addresses[index],
        verticleAddress: v_addresses[index],
      }

      console.log(seat.chairCode);

      seatChoosenList += index !== totalChair - 1 ? `${seat.chairCode} - ` : `${seat.chairCode}`;
    }

    const totalMoney = totalChair * 45000;

    res.render("Booking/confirm-booking", {totalMoney, seatChoosenList});
    
});

router.post("/confirm-booking", async (req, res) => {

  //if user not login yet.
  if(!req.currentUser) {
    res.render('error/check-login');
  }

  const qShowtimeID = req.query.showtimeID;
  const totalChair = req.query.totalChair;
  const chairCodes = req.query.chairCode;
  const h_addresses = req.query.h_address;
  const v_addresses = req.query.v_address;
  const { total_money } = req.body; 

  const newBooking = {
    bookTime: new Date(),
    totalMoney: total_money,
    user_id: req.currentUser.uuid,
    showtime_id: qShowtimeID,
  };

  BookingRepo.add(newBooking)
    .then((bookingAdded) => {
      //If user have enough money

      if(req.currentUser.wallet >= total_money)      
      {
        let chairList = '';
        for(let index = 0; index < totalChair; ++index) {
          const newTicket = {
            chairCode: totalChair == 1 ? chairCodes : chairCodes[index],
            horizontalAddress: h_addresses[index],
            verticleAddress: v_addresses[index],
            price: 45000,
            booking_id: bookingAdded.uuid,
          };
    
          chairList += "Seat: " + ((index !== totalChair - 1) ? `${newTicket.chairCode} - ` : `${newTicket.chairCode}`) + `- hsize: ${newTicket.horizontalAddress} - vsize: ${newTicket.verticleAddress}` + "\n";

          TicketRepo.add(newTicket).then(result => {

          })
          .catch(error => console.log(error));
        }

        remainAmount = req.currentUser.wallet - total_money;
        UserRepository.updateWallet(req.currentUser.uuid, remainAmount).then(result => {
          client.messages.create({
            body: `\n======= Ticket(s) Info =======\n
                  ${chairList}\n
                  - Total Money: ${total_money}`,
            from: "+19892624261",      
            to: `+84${req.currentUser.phone}`,     
          })
          .then(message => {
            console.log(message);
            res.redirect('/booking-history');
          })
          .catch(error => {
            console.log(error);
            res.render("error/error")
          });
        })
        .catch(error => res.render("error/error"));
      }
      else {
        res.render("error/not-enough-money")
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
