// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); // put your index.html + assets inside /public

// Fake DB (replace with MongoDB or SQL)
let products = [
  {id:1,name:'Bullet Sprint Runner',category:'running',price:3499,old:4299,rating:4.6,img:'/images/runner.jpg',tag:'New'},
  {id:2,name:'Bullet Street Classic',category:'lifestyle',price:2999,old:0,rating:4.3,img:'/images/street.jpg',tag:'Bestseller'},
  {id:3,name:'Bullet Court High',category:'basketball',price:4599,old:5099,rating:4.8,img:'/images/court.jpg',tag:'Pro'},
];

// API routes
app.get("/api/products", (req, res) => {
  res.json(products);
});

let cart = [];
app.post("/api/cart", (req, res) => {
  const { productId, qty } = req.body;
  const product = products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  cart.push({ ...product, qty });
  res.json({ message: "Added to cart", cart });
});

app.get("/api/cart", (req, res) => {
  res.json(cart);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  console.log("Contact form:", { name, email, message });
  res.json({ message: "Thanks for contacting Bullet Shoes. We’ll reply soon." });
});

// Start server
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));