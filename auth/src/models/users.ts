import mongoose from "mongoose";
import { Passworrd } from "../services/password";

// An interface that describes properties
// that are required to create new User
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes properties
// the user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the peroprties
// that a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Passworrd.toHash(this.get("password"));
    this.set("password", hashed);

    done();
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
