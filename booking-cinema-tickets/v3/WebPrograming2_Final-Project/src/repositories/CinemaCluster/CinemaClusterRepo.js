const CinemaCluster = require("../../models/CinemaCluster/CinemaCluster");

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

module.exports = CinemaCluster;
