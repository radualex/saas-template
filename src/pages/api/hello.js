// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { auth } from '@/services/firebase-admin';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    try {
        const { name } = await auth.verifyIdToken(req.headers.token);

        res.status(200).json({ message: `You are ${name}. (Fetched from server side)` });
    } catch (error) {
        console.error(error);

        res.status(500).json({ error });
    }
};
