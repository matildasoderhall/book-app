import mongoose from "mongoose";
import { IUsers } from "../types/IUsers";

const Schema = mongoose.Schema;

const UserSchema = new Schema<IUsers>({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_admin: {
        type: Boolean, 
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Users', UserSchema);
