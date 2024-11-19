import mongoose, { Document, Schema } from 'mongoose';

interface ICourse extends Document {
    day: number;
    time: string;
    available: boolean;
    enrolledUser: string | null;
}

const courseSchema: Schema = new Schema<ICourse>({
    day: { type: Number, required: true },
    time: { type: String, required: true },
    available: { type: Boolean, default: false },
    enrolledUser: { type: String, default: null },
}, {
    timestamps: true
});


courseSchema.index({ day: 1, time: 1 }, { unique: true });

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;