const Client = require('../models/client');
const ProspectClient = require('../models/ProspectClient');

exports.moveClientToProspect = async (req, res) => {
  const { email } = req.body;

  try {
    const client = await Client.findOne({ where: { email } });

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const prospect = await ProspectClient.create({
      name: `${client.firstname} ${client.lastname}`,
      email: client.email
    });

    res.status(201).json({ message: 'Client moved to ProspectClient successfully', prospect });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
