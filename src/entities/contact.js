import mongoose, {Schema} from 'mongoose';

export const ContactSchema = new Schema(
    {
        //  define the necessary fields for your contact list
        name: {
            type: String,
            trim: true,
            required: true
        },
        phone_number: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            trim: true,
            index: true,
            unique: true,
            required: true
        },
        address: {
            type: String,
            trim: true,
            required: true
        },
        gender: {
            type: String,
            trim: true,
            required: true
        },
        user: {type: Schema.Types.ObjectId, ref: 'User'},

    },
    {collection: 'contacts'}
)

export default mongoose.model('Contact', ContactSchema);
