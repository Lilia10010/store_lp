import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prismaClient } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");

  //verifica se realmente este evento é do stripe
  if (!signature) {
    return NextResponse.error();
  }

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET_KEY,
  );

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items"],
      },
    );
    const lineItems = sessionWithLineItems.line_items;

    // ATUALIZAR PEDIDO
    /*   await prismaClient.order.update({
      where: {
        id: session.metadata.orderId,
      },

      data: {
        status: "PAYMENT_CONFIRMED",
      },
    }); */
  }

  //criar pedido no banco de dados
  //console.log("🍄 >>>>>>>session.metadata:", session.metadata);
  if (event.type === "payment_intent.succeeded") {
    //atualizar pedido
  }

  if (event.type === "payment_intent.payment_failed") {
    //tratar erros, enviar email para o cliente, etc
  }
  //received: true é apenas para o stripe saber que recebemos o evento e já foi processado
  return NextResponse.json({ received: true });
};
