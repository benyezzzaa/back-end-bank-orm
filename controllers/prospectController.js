// controllers/prospectController.js
const Client = require('../models/client');
const ProspectClient = require('../models/ProspectClient');

// Déplacer un client existant vers ProspectClient
exports.moveClientToProspect = async (req, res) => {
  const { email } = req.body;

  try {
    // Rechercher le client existant par email
    const existingClient = await Client.findOne({ where: { email } });

    if (!existingClient) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Créer un nouveau prospect client avec les données du client existant
    const prospect = await ProspectClient.create({
      name: `${existingClient.firstname} ${existingClient.lastname}`,
      email: existingClient.email,
      // Ajouter d'autres champs si nécessaire
    });

    // Supprimer le client existant si nécessaire
    // await existingClient.destroy();

    res.status(201).json({ message: 'Client moved to ProspectClient successfully', prospect });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
