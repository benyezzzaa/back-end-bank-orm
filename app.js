// app.js
const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./config/database');
const authRouter = require('./routes/auth');
const users = require("./controllers/clientsController")
const Client = require('./models/client');
const clientRoutes = require('./routes/clientRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3305;

app.use(express.json());

connectDB();

app.use('/auth', authRouter);

// API 
// TODO : create a controller / endpoint that return a list of clients

app.get("/clients",(req,res)=>{
    users.getClients(req,res)
})

// TODO / 
// Nouvelle route pour vérifier si un client existe par cin et email
app.post("/verify-client", (req, res) => {
    users.verifyClientByCinAndEmail(req, res);
  });


  app.use('/api', clientRoutes);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
