import {connect} from '@/dbconfig/dbconfig'
import User from '@/models/userModels';

export async function POST(req: Request) {
    const { token } = await req.json();

    try {
        await connect();

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });

        if (!user) {
            return new Response('Invalid or expired token', { status:400 });
        }

        user.isverified = true;
        user.verifyToken = '';
        user.verifyTokenExpiry = null;

        await user.save();

        return new Response('Email verified successfully');
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 });
    }
}