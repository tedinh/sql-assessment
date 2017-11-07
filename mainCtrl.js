module.exports = {

getUsers: (req, res, next) => {
    req.app.get( 'db' ).getUsers()
    .then(response => res.json(response)
    .catch(err => console.log(err)))
},

getVehicles: (req, res, next) => {
    req.app.get( 'db' ).getVehicles()
    .then(response => res.json(response)
    .catch(err => console.log(err)))
},

addUser: (req, res, next) => {
    const {name, email} = req.body
    
    req.app.get('db').add_user([name, email])
    .then(response => res.json(response))
    .catch(err => console.log(err))
},

postVehicles: (req, res, next) => {
    const {make, model, year, owner_id} = req.body;

    req.app.get('db').add_vehicle([make, model, year, owner_id])
    .then(response => res.json(response))
    .catch(err => console.log(err))
},

getVehicleCount: (req, res, next) => {
    req.app.get('db').get_vehicle_user([req.params.userId])
    .then(response => res.json(response))
    .catch(err => console.log(err))
},

getVehicleById: (req, res, next) => {
    req.app.get('db').get_vehicle_id([req.params.userId])
    .then(response => res.json(response))
    .catch(err => console.log(err))
},

getVehicleByEmail: (req, res, next) => {
    const db = req.app.get("db");
    if (req.query.userEmail) {
      return db.get_vehicle_email(req.query.userEmail).then(result => {
        return res.json(result);
      });
    }
    if (req.query.userFirstStart) {
      return db
        .getVehiclesByLetters(req.query.userFirstStart + "%")
        .then(result => {
          return res.json(result);
        });
    }
  },

  getNewerVehicleByYear: (req, res, next) => {
    req.app.get('db').get_vehicle_year()
    .then(response => res.json(response))
    .catch(err => console.log(err))
  },

  changeOwner: (req, res, next) => {
      req.app.get('db').change_owner([req.params.vehicleId, req.params.userId])
      .then(response => res.json(response))
      .catch(err => console.log(err))
  },

  removeOwnership: (req, res, next) => {
      req.app.get('db').remove_owner([req.params.vehicleId])
      .then(result => {res.json(result);})
      .catch(err => console.log(err));
  },

  deleteId: (req, res, next) => {
      req.app.get('db').remove_vehicleId([req.params.vehicleId])
      .then(result => {res.json(result);})
      .catch(err => console.log);
    }
  





}
