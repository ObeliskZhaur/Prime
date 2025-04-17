require("dotenv").config();
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const { decodeSigil } = require("./openai");

admin.initializeApp();
const db = admin.firestore();
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// 🔮 主路由：接收 sigil → 解码 → 返回频率回应
app.post("/processSigil", async (req, res) => {
  const { userId, sigil } = req.body;

  // 存储用户提交的 sigil
  const sigilRef = await db.collection("sigils").add({
    userId,
    sigil,
    createdAt: new Date(),
  });

  // 使用 OpenAI 解码该 sigil
  const response = await decodeSigil(sigil);

  // 存储返回回应
  await db.collection("responses").add({
    sigilId: sigilRef.id,
    response,
    createdAt: new Date(),
  });

  // 返回回应到前端
  res.send({ sigil, response });
});

// 🔗 暴露为 Firebase HTTPS Function
exports.api = functions.https.onRequest(app);
