const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , massive = require('massive');

const mainCtrl = require('./mainCtrl');

const app = express();

app.use(bodyParser.json())
app.use(cors());

// You need to complete the information below to connect
// to the assessbox database on your postgres server.
massive({
  host: 'localhost',
  port: 5432,
  database: 'terrydinh',
  user: 'terrydinh'
}).then( db => {
  app.set('db', db);

  // Initialize user table and vehicle table.
  db.init_tables.user_create_seed().then( response => {
    console.log('User table init');
    db.init_tables.vehicle_create_seed().then( response => {
      console.log('Vehicle table init');
    })
  })

})


// ===== Build enpoints below ============
app.get('/api/users', mainCtrl.getUsers)
app.get('/api/vehicles', mainCtrl.getVehicles)

app.post('/api/users', mainCtrl.addUser);
app.post('/api/vehicles', mainCtrl.postVehicles)

app.get('/api/user/:userId/vehiclecount', mainCtrl.getVehicleCount)
app.get('/api/user/:userId/vehicle', mainCtrl.getVehicleById)
app.get('/api/vehicle', mainCtrl.getVehicleByEmail)
app.get('/api/newervehiclesbyyear', mainCtrl.getNewerVehicleByYear)

app.put('/api/vehicle/:vehicleId/user/:userId', mainCtrl.changeOwner)

app.delete('/api/user/:userId/vehicle/:vehicleId', mainCtrl.removeOwnership)
app.delete('/api/vehicle/:vehicleId', mainCtrl.deleteId)






// ===== Do not change port ===============
const port = 3000;
app.listen(port, () => {
  console.log('Listening on port: ', port);
})
