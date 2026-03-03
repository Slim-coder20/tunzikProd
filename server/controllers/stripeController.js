import Stripe from 'stripe';
import Order from "../models/Order.js";
import Adhesion from "../models/Adhesion.js"; 

// Initialisation Stripe // 
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * POST /api/stripe/create-checkout-session (panier)
 * Body: { items: [{ albumId?, title, priceValue, quantity }], customerEmail }
 * priceValue en euros.
 */
export const createCheckoutSessionOrder = async (req, res) => {
  try {
    const { items, customerEmail } = req.body;

    if (!items?.length || !customerEmail) {
      return res.status(400).json({
        message: "items et customerEmail sont requis",
      });
    }

    const line_items = items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: item.title,
          images: item.image ? [item.image] : undefined,
        },
        unit_amount: Math.round(Number(item.priceValue) * 100), // centimes
      },
      quantity: Number(item.quantity) || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
      customer_email: customerEmail,
      success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/panier`,
      metadata: {
        type: "order",
        orderPayload: JSON.stringify({
          items: items.map((i) => ({
            albumId: i.albumId || null,
            title: i.title,
            priceValue: Number(i.priceValue),
            quantity: Number(i.quantity) || 1,
          })),
          totalPrice: items.reduce(
            (sum, i) => sum + Number(i.priceValue) * (Number(i.quantity) || 1),
            0
          ),
          customerEmail,
        }),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("createCheckoutSessionOrder:", error);
    return res
      .status(500)
      .json({ message: error.message || "Erreur création session Stripe" });
  }
};

/**
 * POST /api/stripe/create-checkout-session-adhesion
 * Body: même structure que le formulaire adhésion (firstName, lastName, email, ... amount, etc.)
 */
export const createCheckoutSessionAdhesion = async (req, res) => {
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

    if (!firstName || !lastName || !email || !amount) {
      return res.status(400).json({
        message: "firstName, lastName, email et amount sont requis",
      });
    }

    const amountCents = Math.round(Number(amount) * 100);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: `Adhésion - ${typeOfAdhesion || "Tunzik"}`,
              description: `${firstName} ${lastName} - ${email}`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/adhesion/succes?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/adhesion`,
      metadata: {
        type: "adhesion",
        adhesionPayload: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: phone || "",
          address: address || "",
          city: city || "",
          zip: zip || "",
          typeOfAdhesion: typeOfAdhesion || "",
          amount: Number(amount),
          paymentMethod: paymentMethod || "Carte",
        }),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("createCheckoutSessionAdhesion:", error);
    return res
      .status(500)
      .json({ message: error.message || "Erreur création session Stripe" });
  }
};

/**
 * POST /api/webhooks/stripe
 * À enregistrer AVANT express.json() pour cette route (body brut pour signature).
 */
export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET manquant");
    return res.status(500).end();
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );
  } catch (err) {
    console.error("Webhook signature invalide:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.metadata?.type === "order") {
      try {
        const orderPayload = JSON.parse(session.metadata.orderPayload || "{}");
        const order = new Order({
          ...orderPayload,
          status: "paid",
        });
        await order.save();
      } catch (e) {
        console.error("Erreur création Order après webhook:", e);
      }
    }

    if (session.metadata?.type === "adhesion") {
      try {
        const adhesionPayload = JSON.parse(
          session.metadata.adhesionPayload || "{}"
        );
        const adhesion = new Adhesion({
          ...adhesionPayload,
          status: "paid",
          transactionId: session.payment_intent || session.id,
          transactionDate: new Date(),
        });
        await adhesion.save();
      } catch (e) {
        console.error("Erreur création Adhesion après webhook:", e);
      }
    }
  }

  res.status(200).json({ received: true });
};