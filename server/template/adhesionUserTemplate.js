export const getAdhesionUserHtml = (firstName, lastName, typeOfAdhesion, amount, paymentMethod) => `
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
              <p style="margin: 6px 0 0; font-size: 13px; color: #60a5fa; letter-spacing: 1px; text-transform: uppercase;">Confirmation d'adhésion</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; font-size: 22px; font-weight: 600; color: #f1f5f9;">
                Bonjour ${firstName} ${lastName} !
              </h2>
              <p style="margin: 0 0 28px; font-size: 16px; line-height: 1.7; color: #94a3b8;">
                Nous avons bien reçu votre demande d'adhésion à Tunzik Production. Voici le récapitulatif de votre inscription :
              </p>

              <!-- Récapitulatif adhésion -->
              <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; overflow: hidden; margin-bottom: 28px;">
                <div style="padding: 16px 20px; border-bottom: 1px solid #1e293b; display: flex; justify-content: space-between;">
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                    <tr>
                      <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b;">
                        <span style="font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Type d'adhésion</span>
                        <p style="margin: 4px 0 0; font-size: 15px; color: #f1f5f9; font-weight: 600;">${typeOfAdhesion}</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 16px; border-bottom: 1px solid #1e293b;">
                        <span style="font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Montant</span>
                        <p style="margin: 4px 0 0; font-size: 15px; color: #f1f5f9; font-weight: 600;">${amount} €</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 10px 16px;">
                        <span style="font-size: 13px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px;">Méthode de paiement</span>
                        <p style="margin: 4px 0 0; font-size: 15px; color: #f1f5f9; font-weight: 600;">${paymentMethod}</p>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Confirmation block -->
              <div style="background-color: #0f172a; border-left: 3px solid #3b82f6; padding: 16px 20px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
                <p style="margin: 0; font-size: 14px; color: #60a5fa; font-weight: 600;">
                  ✓ &nbsp;Adhésion enregistrée avec succès
                </p>
                <p style="margin: 6px 0 0; font-size: 13px; color: #64748b;">
                  Votre dossier est en cours de traitement. Nous vous contacterons prochainement pour finaliser votre adhésion.
                </p>
              </div>

              <p style="margin: 32px 0 0; font-size: 14px; color: #64748b; line-height: 1.6;">
                Cordialement,<br>
                <strong style="color: #94a3b8;">L'équipe Tunzik Production</strong>
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
