const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("./models/user.model")
const express = require('express');
const multer = require('multer');
const uploadFile = require('./services/storage.service')
const postModel = require("./models/post.model")
const cors = require("cors")


const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({storage: multer.memoryStorage() })


app.post('/create-post', upload.single("image"), async (req, res) => {

  console.log(req.body);
  console.log(req.file);

  const result =  await uploadFile(req.file.buffer)

  const post = await postModel.create({
    image: result.url,
    caption: req.body.caption
  })

  return res.status(201).json({
    message: "Post Created Successfully",
    post
  })



  console.log(result);
})

app.get("/posts", async (req, res) => {
  const posts = await postModel.find()

  return res.status(200).json({
    message: "Post Fetched Successfully",
    posts
  })
})

app.delete("/delete-post/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await postModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    return res.status(200).json({
      message: "Post deleted successfully",
      deletedPost
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password.trim();

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created successfully",
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    console.log("Email:", email);

    const user = await User.findOne({ email });

    console.log("User Found:", user)

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign({ id: user._id }, "secretkey");

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app