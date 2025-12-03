const express = require("express");
const cassandra = require("cassandra-driver");
const app = express();
app.use(express.json());

// Conexión a Cassandra
const client = new cassandra.Client({
  contactPoints: ["127.0.0.1"],
  localDataCenter: "datacenter1",
  keyspace: "inventario"
});

// CREATE
app.post("/laptops", async (req, res) => {
  const { id, brand, name, price } = req.body;
  await client.execute(
    "INSERT INTO laptops (id, brand, name, price) VALUES (?, ?, ?, ?)",
    [id, brand, name, price],
    { prepare: true }
  );
  res.send("Laptop creada");
});

// READ ALL
app.get("/laptops", async (req, res) => {
  const result = await client.execute("SELECT * FROM laptops");
  res.json(result.rows);
});

// READ ONE
app.get("/laptops/:id", async (req, res) => {
  const result = await client.execute(
    "SELECT * FROM laptops WHERE id = ?",
    [parseInt(req.params.id)],
    { prepare: true }
  );
  res.json(result.rows[0]);
});

// UPDATE
app.put("/laptops/:id", async (req, res) => {
  const { price } = req.body;
  await client.execute(
    "UPDATE laptops SET price = ? WHERE id = ?",
    [price, parseInt(req.params.id)],
    { prepare: true }
  );
  res.send("Actualizado");
});

// DELETE
app.delete("/laptops/:id", async (req, res) => {
  await client.execute(
    "DELETE FROM laptops WHERE id = ?",
    [parseInt(req.params.id)],
    { prepare: true }
  );
  res.send("Eliminado");
});

// Servidor
app.listen(3000, () => console.log("API lista en http://localhost:3000"));
