const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const getContactAdminHtml = (firstName, lastName, email, content) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap" rel="stylesheet">
</head>
<body style="margin: 0; padding: 0; font-family: 'Outfit', 'Segoe UI', sans-serif; background-color: #0f172a;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f172a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e3a5f 0%, #1e293b 100%); padding: 32px 40px; text-align: center; border-bottom: 1px solid #2563eb33;">
              <h1 style="margin: 0; font-size: 26px; font-weight: 700; color: #ffffff; letter-spacing: 2px; text-transform: uppercase;">
                Tunzik Production
              </h1>
              <p style="margin: 6px 0 0; font-size: 13px; color: #60a5fa; letter-spacing: 1px; text-transform: uppercase;">Nouveau message de contact</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 24px; font-size: 20px; font-weight: 600; color: #f1f5f9;">
                Message reçu depuis le formulaire
              </h2>

              <!-- Expéditeur -->
              <div style="background-color: #0f172a; border-left: 3px solid #3b82f6; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 24px;">
                <p style="margin: 0 0 8px; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Expéditeur</p>
                <p style="margin: 0; font-size: 15px; color: #f1f5f9; font-weight: 600;">
                  ${escapeHtml(firstName)} ${escapeHtml(lastName)}
                </p>
                <a href="mailto:${escapeHtml(email)}" style="display: inline-block; margin-top: 4px; font-size: 14px; color: #60a5fa; text-decoration: none;">
                  ${escapeHtml(email)}
                </a>
              </div>

              <!-- Message -->
              <p style="margin: 0 0 8px; font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
              <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 20px; white-space: pre-wrap; font-size: 15px; color: #94a3b8; line-height: 1.7;">
                ${escapeHtml(content)}
              </div>

              <p style="margin: 28px 0 0; font-size: 13px; color: #475569;">
                Répondre directement à cet email pour contacter l'expéditeur.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0f172a; padding: 20px 40px; text-align: center; border-top: 1px solid #1e293b;">
              <p style="margin: 0; font-size: 12px; color: #475569;">
                © ${new Date().getFullYear()} Tunzik Production. Tous droits réservés.
              </p>
              <p style="margin: 6px 0 0; font-size: 12px; color: #334155;">
                tunzikprod@gmail.com
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
