# MongoConnect

A simple MongoDB connection wrapper for Node.js applications.

## Basic Usage

```javascript
import Mongo from './MongoConnect.mjs';

// Connect to database
const mongo = new Mongo("mongodb://localhost:27017", "portfolio");

// Access collections
const collections = await mongo.db.collections();
```
