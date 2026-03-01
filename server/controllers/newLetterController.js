import NewsLetter from "../models/NewsLetter.js";
import transporter from "../config/email.js";
import { getNewsLetterUserHtml } from "../template/newsLetterUserTemplate.js";
import { getNewsLetterAdminHtml } from "../template/newsLetterAdminTemplate.js";

// Newsletter POST /api/newsletter
export const newsLetter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Le champ email est requis" });
    }

    // Vérification du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ message: "Format d'email invalide" });
    }

    // Vérification doublon avant sauvegarde
    const existing = await NewsLetter.findOne({ email: email.trim() });
    if (existing) {
      return res.status(409).json({ message: "Cette adresse email est déjà inscrite" });
    }

    const newSubscriber = new NewsLetter({ email: email.trim() });
    await newSubscriber.save();

    const senderEmail = process.env.SMTP_FROM || process.env.SMTP_USER;
    const displayName = "Tunzik Production";

    // Email de confirmation envoyé à l'abonné
    await transporter.sendMail({
      from: `"${displayName}" <${senderEmail}>`,
      to: email.trim(),
      subject: "✓ Inscription confirmée - Tunzik Production",
      text: `Votre adresse ${email} a bien été enregistrée à la newsletter Tunzik Production. Vous recevrez en avant-première toutes nos actualités. Cordialement, L'équipe Tunzik Production`,
      html: getNewsLetterUserHtml(email.trim()),
    });

    // Notification admin
    const adminEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;
    await transporter.sendMail({
      from: `"${displayName}" <${senderEmail}>`,
      to: adminEmail,
      subject: `[Newsletter] Nouvel abonné : ${email}`,
      text: `Nouvel abonné inscrit à la newsletter : ${email}`,
      html: getNewsLetterAdminHtml(email.trim()),
    });

    return res.status(200).json({ message: "Inscription à la newsletter confirmée" });

  } catch (error) {
    console.error("Erreur newsLetterController:", error);
    return res.status(500).json({ message: "Erreur serveur, veuillez réessayer plus tard" });
  }
};
