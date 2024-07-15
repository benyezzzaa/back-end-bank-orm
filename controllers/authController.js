// controllers/authController.js
const Client = require('../models/client');
const ProspectClient = require('../models/ProspectClient');
const nodemailer = require('nodemailer');

// Fonction de vérification du client
exports.verifyClient = async (req, res) => {
  const { name, email } = req.body;

  // Vérifiez si le client existe déjà dans la banque
  const clientExists = await Client.findOne({ where: { email } });

  if (clientExists) {
    return res.status(400).json({ message: 'Client already exists' });
  }

  // Insérez le client comme prospect dans la base de données
  try {
    const prospect = await ProspectClient.create({ name, email });
    res.status(201).json({ message: 'Prospect created', prospect });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Fonction de vérification par l'administrateur
exports.adminCheck = async (req, res) => {
  const { name, status, reason } = req.body;

  try {
    const prospect = await ProspectClient.findByPk(name);

    if (!prospect) {
      return res.status(404).json({ message: 'Prospect not found' });
    }

    prospect.status = status;
    if (status === 'declined') {
      prospect.reason = reason;
    }

    await prospect.save();

    // Envoyer un email au client
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: prospect.email,
      subject: status === 'approved' ? 'Account Approved' : 'Account Declined',
      text: status === 'approved' ? 'Your account has been approved.' : `Your account has been declined. Reason: ${reason}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Failed to send email', error });
      } else {
        res.status(200).json({ message: `Prospect ${status} and email sent` });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
