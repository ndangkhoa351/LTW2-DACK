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

module.exports = CinemaCluster;
