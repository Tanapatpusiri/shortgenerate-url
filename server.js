// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const apiRoutes = require('./src/router');
// const cors = require('cors')

// const app = express();
// app.use(cors())


// mongoose.connect('mongodb+srv://tanapat:bomkap_150146@shorturl.gvuxcow.mongodb.net/short-url-db', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => {
//   console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
// })
// .catch((err) => {
//   console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:', err);
// });


// app.use(bodyParser.json());
// app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

// app.use('/api', apiRoutes);

// const ShortURL = mongoose.model("ShortURL", {
//   originalURL: String,
//   shortURL: String,
// });

// app.post("/api/shorten", async (req, res) => {
//   const { originalURL } = req.body;
//   const shortURL = shortid.generate();

//   const newShortURL = new ShortURL({ originalURL, shortURL });
//   await newShortURL.save();

//   res.json({ shortURL });
// });



// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`เซิร์ฟเวอร์กำลังทำงานบนพอร์ต ${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const shortid = require("shortid");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(bodyParser.json());
// mongoose.connect("mongodb://localhost/shorturl", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });




const ShortURL = mongoose.model("ShortURL", {
     originalURL: {
    type: String,
    required: true,
  },
  shortURL: {
    type: String,
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },

});

mongoose.connect('mongodb+srv://tanapat:bomkap_150146@shorturl.gvuxcow.mongodb.net/short-url-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('เชื่อมต่อกับ MongoDB สำเร็จ');
})
.catch((err) => {
  console.error('เกิดข้อผิดพลาดในการเชื่อมต่อ MongoDB:', err);
});

app.post("/api/shorten", async (req, res) => {
  const { originalURL } = req.body;
  const shortURL = shortid.generate();

  const newShortURL = new ShortURL({ originalURL, shortURL });
  await newShortURL.save();

  res.json({ shortURL });
});

app.get('/:shortURL', async (req , res) =>{
  const shortURL = await ShortURL.findOne({ shortURL: req.params.shortURL });
  if (shortURL == null) return res.sendStatus(404);
  await ShortURL.updateOne({ shortURL: req.params.shortURL }, { $inc: { clickCount: 1 } });
  res.redirect(shortURL.originalURL)
})

  app.get('/api/short', (req, res) => {
    ShortURL.find({}).then((shortURL) => res.json(shortURL))
  });


  
// const corsOptions = {
//   origin: '*', // ระบุ * เพื่ออนุญาตให้ทุกโดเมนเรียกใช้งาน
//   methods: ['GET', 'OPTIONS', 'POST'], // ระบุ HTTP methods ที่อนุญาต
// };



app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // สามารถเปลี่ยน * เป็นโดเมนของเว็บที่คุณต้องการอนุญาต
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
