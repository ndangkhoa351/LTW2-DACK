const CinemaCluster = require("../../models/CinemaCluster/CinemaCluster");
const sequelize = require("../../config/database");
const { Sequelize, QueryTypes } = require("sequelize");
const Op = Sequelize.Op;

CinemaCluster.getByID = async function (id) {
  return CinemaCluster.findByPk(id);
};

CinemaCluster.getAll = async function () {
  return CinemaCluster.findAll();
};

CinemaCluster.add = async function (new_cluster) {
  const newCluster = await CinemaCluster.create({
    displayName: new_cluster.displayName,
    address: new_cluster.address,
  });
  await newCluster.save();
  return newCluster;
};

CinemaCluster.delete = async function (cinemaCluster_id_delete) {
  await CinemaCluster.destroy({
    where: { uuid: cinemaCluster_id_delete },
  });
};

CinemaCluster.updateRecord = async function (cluster_update) {
  try {
    const newClusterDetail = {
      displayName: cluster_update.displayName,
      address: cluster_update.address,
    };

    CinemaCluster.update(newClusterDetail, {
      where: { uuid: cluster_update.uuid },
    });
  } catch (error) {
    console.log(error);
  }
};

CinemaCluster.getCinemas = async function (id) {
  const cinemas = sequelize.query(
    `SELECT c.* FROM cinema_clusters cs JOIN cinemas c ON cs."uuid" = c."ownerCluster_id" WHERE cs."uuid" = '${id}'`,
    { type: QueryTypes.SELECT }
  );
  return cinemas;
};
// `SELECT cs.*, COUNT(s.uuid) AS "Number_Showtime", COUNT(b.uuid) AS "Number_Booking", SUM(b.totalMoney) AS "Total_Revenue" FROM cinema_clusters cs JOIN cinemas c ON cs."uuid" = c."ownerCluster_id" 
//   JOIN showtimes s ON s."cinema_id" = c."uuid" JOIN bookings b on b."showtime_id" = s."uuid" 
//   WHERE b."createdAt" BETWEEN '${fromDate}' AND '${toDate}' GROUP BY cs.uuid`,
CinemaCluster.report = async function (fromDate, toDate) {
  const reportCluster = sequelize.query(
      `Select cs.*, COUNT(s.uuid) AS "Number_Showtime", COUNT(b.uuid) AS "Number_Booking", SUM(b."totalMoney") AS "Total_Revenue" from cinema_clusters cs JOIN cinemas c ON cs."uuid" = c."ownerCluster_id" 
      JOIN showtimes s ON s."cinema_id" = c."uuid" JOIN bookings b on b."showtime_id" = s."uuid" 
      WHERE b."createdAt" BETWEEN '${fromDate}' AND '${toDate}'  GROUP BY cs.uuid `,
      { type: QueryTypes.SELECT }
  );
  return reportCluster;
};

module.exports = CinemaCluster;
