import transporter from "../config/email.js";
import Adhesion from "../models/Adhesion.js";
import { getAdhesionUserHtml } from "../template/adhesionUserTemplate.js";
import { getAdhesionAdminHtml } from "../template/adhesionAdminTemplate.js";

export const createAdhesion = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      zip,
      typeOfAdhesion,
      amount,
      paymentMethod,
    } = req.body;

    // Vérification de la saisie de tous les champs //
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !zip ||
      !typeOfAdhesion ||
      !amount ||
      !paymentMethod
    ) {
      return res
        .status(400)
        .json({ message: "Tous les champs sont requis pour l'adhésion" });
    }

    // Vérification du format de l'email //
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ message: "Format d'email invalide" });
    }

    // Vérification du format du numéro de téléphone //
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.trim())) {
      return res
        .status(400)
        .json({ message: "Format de numéro de téléphone invalide" });
    }

    // Création de l'adhésion dans la base de données //
    const adhesion = new Adhesion({
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      zip,
      typeOfAdhesion,
      amount,
      paymentMethod,
    });
    await adhesion.save();

    // Configuration de l'envoi de l'email //
    const senderEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
    const displayName = "Tunzik Production";
    const adminEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER || "tunzikprod@gmail.com";

    // Envoi de l'email à l'utilisateur pour confirmer son adhésion //
    await transporter.sendMail({
      from: `"${displayName}" <${senderEmail}>`,
      to: email.trim(),
      subject: `Confirmation de votre adhésion - Tunzik Production`,
      text: `Bonjour ${firstName}, merci pour votre adhésion. Votre dossier est en cours de traitement et nous vous contacterons prochainement.`,
      html: getAdhesionUserHtml(
        firstName.trim(),
        lastName.trim(),
        typeOfAdhesion.trim(),
        amount,
        paymentMethod.trim(),
      ),
    });

    // Envoi de l'email à l'admin pour notifier la nouvelle adhésion //
    await transporter.sendMail({
      from: `"${displayName}" <${senderEmail}>`,
      to: adminEmail,
      replyTo: email.trim(),
      subject: `[Adhésion] Nouvelle adhésion de ${firstName} ${lastName}`,
      text: `Prénom: ${firstName}\nNom: ${lastName}\nEmail: ${email}\n\nAdhésion:\n${typeOfAdhesion}\nMontant: ${amount}\nMéthode de paiement: ${paymentMethod}`,
      html: getAdhesionAdminHtml(
        firstName.trim(),
        lastName.trim(),
        email.trim(),
        typeOfAdhesion.trim(),
        amount,
        paymentMethod.trim(),
      ),
    });

    res.status(201).json({ message: "Adhésion créée avec succès" });
  } catch (error) {
    console.error("Erreur adhesionController:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'adhésion" });
  }
};

// Récupération de toutes les adhésions pour l'espace admin //
export const getAllAdhesion = async (req, res) => {
  try {
    const adhesions = await Adhesion.find();
    res.status(200).json(adhesions);
  } catch (error) {
    console.error("Erreur adhesionController:", error);
    res.status(500).json({ message: "Erreur lors de la récupération des adhésions" });
  }
};
