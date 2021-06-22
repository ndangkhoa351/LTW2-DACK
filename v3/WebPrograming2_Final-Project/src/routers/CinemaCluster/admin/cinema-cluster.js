const express = require('express');
const CinemaClusterRepo = require('../../../repositories/CinemaCluster/CinemaClusterRepo');
const router = express.Router();
let CINEMA_CLUSTER_ID_CHOOSEN; 

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
})

router.get('/add-cluster', (req, res) => {
    res.render('CinemaCluster/admin/add-cluster', {layout:'dashboard/layout'});
});

router.post('/add-cluster', (req, res) => {
    const { cluster_name, cluster_address } = req.body;
    
    const newCluster = {
        displayName: cluster_name,
        address: cluster_address,
    };

    CinemaClusterRepo.add(newCluster)
    .then(result => {
        res.redirect('/admin/manage-cluster');
    })
    .catch(err => {
        res.render('error/error');
    })
})

// Update

router.get('/update-cluster', (req, res) => {
    CINEMA_CLUSTER_ID_CHOOSEN = req.query.clusterID;
    
    CinemaClusterRepo.getByID(CINEMA_CLUSTER_ID_CHOOSEN).then(cinema_cluster => {
        res.render("CinemaCluster/admin/update-cluster", {cinema_cluster});
    })
    .catch(err => {
        res.render('error/error');
    })
});

router.post('/update-cluster', (req, res) => {
    const { cluster_name, cluster_address } = req.body;
    
    const clusterUpdate = {
        uuid: CINEMA_CLUSTER_ID_CHOOSEN,
        displayName: cluster_name,
        address: cluster_address,
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