/**
 * Template email envoyé à la boîte Tunzik (tunzikprod@gmail.com)
 * avec le détail du message reçu depuis le formulaire de contact.
 */
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
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; background-color: #f1f5f9;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding: 24px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden;">
          <tr>
            <td style="background: #1e293b; padding: 20px 24px;">
              <h1 style="margin: 0; font-size: 18px; color: #fff;">Nouveau message depuis le formulaire de contact</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px;">
              <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;"><strong>Prénom :</strong></p>
              <p style="margin: 0 0 16px; font-size: 15px; color: #0f172a;">${escapeHtml(firstName)}</p>

              <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;"><strong>Nom :</strong></p>
              <p style="margin: 0 0 16px; font-size: 15px; color: #0f172a;">${escapeHtml(lastName)}</p>

              <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;"><strong>Email :</strong></p>
              <p style="margin: 0 0 16px; font-size: 15px; color: #0f172a;"><a href="mailto:${escapeHtml(email)}" style="color: #2563eb;">${escapeHtml(email)}</a></p>

              <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;"><strong>Message :</strong></p>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 0 0 20px; white-space: pre-wrap; font-size: 14px; color: #334155; line-height: 1.6;">${escapeHtml(content)}</div>

              <p style="margin: 0; font-size: 12px; color: #94a3b8;">— Message enregistré depuis tunzikproduction.com</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
