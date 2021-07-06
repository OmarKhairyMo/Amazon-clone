const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async (req, res) => {
  // Get items and email from the post that happens from the user
  const { items, email } = req.body;
  console.log(items, email);
  const transformed_Items = items.map((element) => ({
    description: element.description,
    quantity: element.quantaty,
    price_data: {
      currency: "usd",
      unit_amount: element.price * 100,
      product_data: {
        name: element.title,
        images: [element.image],
      },
    },
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_rates: ["shr_1JACRoCbOfKYg4aA9QkPI4Q6"],
    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transformed_Items,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });
  res.status(200).json({ id: session.id });
};
