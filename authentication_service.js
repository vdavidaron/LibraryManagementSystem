const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const port = 5004;
const secretKey = "your-secret-key";

passport.use(
    new LocalStrategy((username, password, done) => {
        // In a real-world application, you would validate the user's credentials against a database.
        if (username === "test" && password === "test") {
            return done(null, { username });
        } else {
            return done(null, false, { message: "Invalid credentials" });
        }
    })
);

app.use(cors());

app.use(express.json());
app.use(passport.initialize());

app.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
    const token = jwt.sign({ username: req.user.username }, secretKey);
    res.json({ token });
});

app.listen(port, () => {
    console.log(`Authentication service listening at http://localhost:${port}`);
});
