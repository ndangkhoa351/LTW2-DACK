const express = require('express');
const CinemaClusterRepo = require('../../../repositories/CinemaCluster/CinemaClusterRepo');
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const middleware = require("../../../middlewares/authenticationAdmin");

let CINEMA_CLUSTER_ID_CHOOSEN; 

router.use(middleware);

router.get('/', (req, res) => {
    CINEMA_CLUSTER_ID_CHOOSEN = req.query.clusterID;
    const action = req.query.action;

    if(action == "delete") {
        CinemaClusterRepo.delete(CINEMA_CLUSTER_ID_CHOOSEN).then(result => {
            res.redirect('/admin/manage-cluster');
        })
        .catch(err => { res.render('error/error'); });
    }
    else {
        CinemaClusterRepo.getAll().then((cinema_clusters) => {
            res.render('CinemaCluster/admin/cinema-cluster', {cinema_clusters ,layout: 'dashboard/layout'});
        }).catch((err) => {
            res.render('error/error');
        });
    }
});

router.get('/add-cluster', (req, res) => {
    CinemaClusterRepo.getAll().then((cinema_clusters) =>{
        res.render('CinemaCluster/admin/add-cluster', {cinema_clusters,layout:'dashboard/layout'});
    });
    
});

router.post('/add-cluster', upload.single("cluster_avatar"), (req, res) => {
    const { cluster_name, cluster_address } = req.body;
    console.log("clus: " + cluster_name + "  address: " + cluster_address);
    const newCluster = {
        displayName: cluster_name,
        address: cluster_address,
        avatar: req.file.buffer,
    };

    console.log(newCluster);
    CinemaClusterRepo.add(newCluster)
    .then(result => {
        res.redirect('/admin/manage-cluster');
    })
    .catch(err => {
        res.render('error/error', {layout:'dashboard/layout'});
    })
});

// Update

router.get('/update-cluster', (req, res) => {
    CINEMA_CLUSTER_ID_CHOOSEN = req.query.clusterID;
    
    CinemaClusterRepo.getByID(CINEMA_CLUSTER_ID_CHOOSEN).then(cinema_cluster => {
        res.render("CinemaCluster/admin/update-cluster", {cinema_cluster, layout:'dashboard/layout'});
    })
    .catch(err => {
        res.render('error/error');
    })
});

router.post('/update-cluster', upload.single("cluster_avatar"), (req, res) => {
    const { cluster_name, cluster_address, cluster_avatar } = req.body;
    
    const imageFile = req.file ? req.file.buffer : cluster_avatar;

    const clusterUpdate = {
        uuid: CINEMA_CLUSTER_ID_CHOOSEN,
        displayName: cluster_name,
        address: cluster_address,
        avatar: imageFile,
    };

    CinemaClusterRepo.updateRecord(clusterUpdate)
    .then(result => {
        res.redirect('/admin/manage-cluster');
    })
    .catch(err => {
        res.render('error/error');
    })
})

module.exports = router;