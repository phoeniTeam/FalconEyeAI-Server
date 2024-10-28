
export const checkoutSession = async (req, res) => {
    try {
        const amount = Number(req.body.amount) * 100;
        const plan = req.body.plan;

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: plan
                        },
                        unit_amount: amount
                    },
                    quantity: 1
                }
            ],
            metadata: {
                creatorId: req.body.creatorId,
                credits: req.body.credits,
                plan: plan
            },
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/profile`,
            cancel_url: `${process.env.CLIENT_URL}/`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}