# MongoConnect

A simple MongoDB connection wrapper for Node.js applications.

I'll expand the readme more later.

## Basic Usage

```javascript
import Mongo from 'mongoconnect-ts';

// Connect to database
const mongo = new Mongo("mongodb://localhost:27017", "database_name");

// Access collections
const collections = await mongo.db.collections();

// Retrieve all collection documents from the database.
const documents = await mongo.getAll();

```
