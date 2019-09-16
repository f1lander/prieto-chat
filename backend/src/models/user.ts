import { Schema, Document, model } from "mongoose";
import { hash, compare } from "bcrypt";

const saltRounds = 10;

export interface IUser extends Document {
  email: string;
  nickName: string;
  firstName: string;
  lastName: string;
  password: string;
  isCorrectPassword: (password: string) => Promise<Boolean>;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  nickName: { type: String, required: true },
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  password: { type: String, required: true }
});

UserSchema.pre("save", function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified("password")) {
    // Saving reference to this because of changing scopes
    const document: any = this;
    hash(document.password, saltRounds, function(err, hashedPassword) {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.isCorrectPassword = function(password: string) {
  return compare(password, this.password);
};
// Export the model and return your IUser interface
export default model<IUser>("User", UserSchema);
