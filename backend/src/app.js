const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const config = require("./config/auth.config");
const authRoutes = require("./routes/auth.routes");
const User = require("./models/userModel");
const userRoutes = require("./routes/userRouter");
const GlobalErrorHandler = require("./controllers/errorController");
const chatbotRoutes = require("./routes/chatBotRouter");
const quizRoutes = require("./routes/quizRouter");
const courseRoutes = require("./routes/courseRouter");
const levelRoutes = require("./routes/levelRoute");
const AppError = require("./utils/AppError");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

console.log("Google OAuth Config:", {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });

        if (!user) {
          const email = profile.emails?.[0]?.value;
          const [firstName, ...lastNames] = (profile.displayName || "").split(
            " ",
          );

          user = await User.create({
            githubId: profile.id,
            email: email || `${profile.username}@github.com`,
            name: firstName || profile.username,
            surname: lastNames.join(" "),
            avatar: profile.photos[0].value,
          });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/chatbot", chatbotRoutes);
app.use("/quiz", quizRoutes);
app.use("/course", courseRoutes);
app.use("/level", levelRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(GlobalErrorHandler);

module.exports = app;
