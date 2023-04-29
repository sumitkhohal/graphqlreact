import { randomBytes } from "crypto";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const User = mongoose.model("User");
const Quote = mongoose.model("Quote");

const resolvers = {
  Query: {
    users: async () => await User.find({}),
    quotes: async () => await Quote.find({}).populate("by", "_id firstName"),
    user: async (_, { _id }) => await User.findOne({ _id }),
    iquote: async (_, { by }) => await Quote.find({ by }),
    myprofile: async (_, args, { userId }) => {
      if (!userId) throw new Error("You must be logged In");
      return await User.findOne({ _id: userId });
    },
  },
  User: {
    quotes: async (usr) => await Quote.find({ by: usr._id }),
  },
  Mutation: {
    signUpUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error("User already exists with that email");
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 10);

      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });

      return await newUser.save();
    },
    signInUser: async (_, { userSignIn }) => {
      const user = await User.findOne({ email: userSignIn.email });
      if (!user) {
        throw new Error("User doesn't exists with that email");
      }
      const doMatch = await bcrypt.compare(userSignIn.password, user.password);
      if (!doMatch) {
        throw new Error("Email or Password is invalid");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token };
    },
    createQuote: async (_, { name }, { userId }) => {
      if (!userId) throw new Error("You Must Be Logged In");
      const newQuote = new Quote({
        name,
        by: userId,
      });
      await newQuote.save();
      return "Quote Saved Successfully";
    },
  },
};

export default resolvers;
