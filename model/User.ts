import mongoose, { Model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";

 export interface IUser{
  name?:string
  email:string
  password:string
  id?:mongoose.Types.ObjectId
  creatAt?: Date
  updateAt?: Date

}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// Hash password before saving user
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


const User= models?.User || mongoose.model<IUser>("User", UserSchema);

export default User;



