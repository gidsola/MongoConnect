# MongoDB Utility Library (`mongoconnect-ts`)

A lightweight TypeScript utility for MongoDB connections, optimized for use with MongoDB Atlas and self-hosted MongoDB. Designed for simplicity, reusability, and schema validation.

---

## Features
- **Reusable MongoDB Connection**: Efficient connection handling.
- **TypeScript Support**: Fully typed for modern projects.
- **Schema Validation**: Easily create collections with JSON schema validation.
- **Batch Data Fetching**: Fetch all collections and documents in a structured format.
- **Error Handling**: Clear error messages and logging.

---

## Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB Atlas or self-hosted MongoDB instance
- `mongodb` Node.js driver (v4+)

### Install via npm
```bash
npm install mongodb
```
Copy the library code into your project or use as a module.

---

## Usage

### 1. Import and Instantiate
```typescript
import Mongo from 'mongoconnect-ts';

const mongo = new Mongo(process.env.MONGO_CSTRING, 'yourDatabaseName');
```

### 2. Use the Library

> Note: There is currently only this method for retrieval. When I have time i will expand.  

#### Fetch All Collections and Documents
```typescript
await mongo.client.connect();
const data = await mongo.getAll();
await mongo.client.close();
```

#### Create a Collection with Schema Validation
```typescript
const schema = {
  validator: {
    \$jsonSchema: {
      bsonType: "object",
      required: ["name", "email"],
      properties: {
        name: { bsonType: "string" },
        email: { bsonType: "string" }
      }
    }
  }
};
const newCollection = await mongo.createSchemaCollection('users', schema);
```


---

## API Reference

### `Mongo`
#### Constructor
```typescript
new Mongo(connectionString: string, databaseName?: string | null)
```
- `connectionString`: MongoDB connection URI (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/dbName`).
- `databaseName`: (Optional) Database name. If omitted, uses the database specified in the connection string.

#### Methods
- **`createSchemaCollection(collection: string, schema: object): Promise<Collection>`**: Creates a collection with schema validation.
- **`getAll(): Promise<AllCollections>`**: Fetches all collections and documents as a structured object.

---

## Best Practices
- **Reuse the Connection**: Connect once and reuse the client for all operations.
- **Environment Variables**: Store your connection string in environment variables.
- **Error Handling**: Always handle errors with try/catch blocks.
- **Indexes**: Ensure your collections are properly indexed for performance.

---

## Troubleshooting
### Common Issues
- **Connection Errors**: Ensure your IP is whitelisted in MongoDB Atlas and your connection string is correct.
- **Authentication Errors**: Double-check your username, password, and database name.
- **Slow Performance**: Reuse the connection and avoid connecting/closing for each operation.

### Debugging
- Enable debug logging for the MongoDB driver:
  ```bash
  DEBUG=mongodb node your-app.js
  ```

---

## License
MIT
