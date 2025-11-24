module.exports = {
  async up(db) {
    // Create collection
    const collections = await db.listCollections({ name: "users" }).toArray();
    if (collections.length === 0) {
      await db.createCollection("users");
    }

    // Access the collection
    const users = db.collection("users");

    await db.collection("users").createIndex({ name: 1 }, { unique: true });

    const changelog = await db.listCollections({ name: "changelog" }).toArray();
    if (changelog.length === 0) {
      await db.createCollection("changelog");
    }

    // optional: upsert a sample user
    await db
      .collection("users")
      .updateOne(
        { name: "sample" },
        { $setOnInsert: { scores: { technology: 0 } } },
        { upsert: true }
      );
  },

  async down(db) {
    await db
      .collection("users")
      .drop()
      .catch(() => {});
    await db
      .collection("changelog")
      .drop()
      .catch(() => {});
  },
};
