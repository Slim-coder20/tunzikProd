import transporter from "../config/email.js";
import Contact from "../models/Contact.js";
import { getUserEmailHtml } from "../template/contacUserTemplate.js";

// Contact form email handler : POST /api/contact //
export const contact = async (req, res) => {
  try {
    const firstName = req.body.firstName ?? req.body.firstname;
    const lastName = req.body.lastName ?? req.body.lastname;
    const email = req.body.email;
    const content = req.body.content ?? req.body.message;

    if (!firstName || !lastName || !email || !content) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérification du format de l'email //
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ message: "Format d'email invalide" });
    }

    const newContact = new Contact({
      firstName: String(firstName).trim(),
      lastName: String(lastName).trim(),
      email: email.trim(),
      content: content.trim(),
    });
    await newContact.save();

    const senderEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
    const displayName = "Tunzik Production";

    // Email de confirmation envoyé à l'utilisateur
    await transporter.sendMail({
      from: `"${displayName}" <${senderEmail}>`,
      to: email.trim(),
      subject: "✓ Message reçu - Tunzik Production",
      text: `Bonjour ${firstName}, merci de nous avoir contactés. Nous avons bien reçu votre message et vous répondrons dans les meilleurs délais. Cordialement, L'équipe Tunzik Production`,
      html: getUserEmailHtml(firstName.trim()),
    });

    return res.status(200).json({ message: "Message envoyé avec succès" });

  } catch (error) {
    console.error("Erreur contactController:", error);
    return res.status(500).json({ message: "Erreur serveur, veuillez réessayer plus tard" });
  }
};
