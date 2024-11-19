import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    isAdmin: boolean;
}

const userSchema: Schema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;