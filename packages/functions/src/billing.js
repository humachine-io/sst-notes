import Stripe from "stripe";
import handler from "@notes/core/handler";
import { calculateCost } from "@notes/core/cost";

export const main = handler(async (event) => {
    const { storage, source } = JSON.parse(event.body);
    const amount = calculateCost(storage);
    const description = "Scratch charge";

    // Load our secret key from the  environment variables
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2022-11-15',
        maxNetworkRetries: 1,
        timeout: 1000,
        telemetry: true,
    });

    await stripe.charges.create({
        source,
        amount,
        description,
        currency: "usd",
    });

    return { status: true };
});