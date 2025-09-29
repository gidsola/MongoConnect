import { MongoClient } from 'mongodb';

type AllCollections = { [x: string]: { [key: string]: any; } };

class MongoConnect {

  private url;
  client;
  db;

  /**
   * The url or "Connection String" should follow formats as specified at:
   * @see https://www.mongodb.com/docs/manual/reference/connection-string-examples/#connection-string-examples
   * 
   * @param url connection string
   * @param db database name to use if not specifying in connection string
   */
  constructor(url: string, db: string | null = null) {
    if (!url) throw new Error("Missing connection string.");

    this.url = this.isMongoString(url);
    this.client = new MongoClient(this.url);
    this.db = db !== null
      ? this.client.db(db)
      : this.client.db();

  }


  private isMongoString(s: string) {
    if (s.startsWith("mongodb+srv://") || s.startsWith("mongodb://"))
      return s;
    throw new Error("Unrecognized connection string..");
  };

};


class Mongo extends MongoConnect {

  public Data;
  /**
   * The url or "Connection String" should follow formats as specified at:
   * @see https://www.mongodb.com/docs/manual/reference/connection-string-examples/#connection-string-examples
   * 
   * @param url connection string
   * @param db database name to use if not specifying in connection string
   */
  constructor(url: string, db: string | null = null) {
    db === null
      ? super(url)
      : super(url, db);

    this.Data = async () => await this.getAll();
  }

  /**
   * Creates a collection with schema validation.
   * 
   * @see https://www.mongodb.com/docs/manual/core/schema-validation/specify-json-schema/#specify-json-schema-validation
   * 
   * @param collection collection name to use when creating
   * @param schema validator object
   * @returns the successfully created collection
   */
  public async createSchemaCollection(collection: string, schema: object) {
    try {
      return await this.db.createCollection(collection, schema);
    } catch (e) {
      console.log(e);
      throw new Error("Failed to create collection!")
    }
  };


  /**
   * 
   * @returns An array of named member objects from all available collections
   */
  async getAll() {
    const
      datas = await this.db.collections(),
      data: AllCollections = {};

    for await (const collection of datas) {
      const
        c = (await collection.find().toArray()),
        pn = collection.collectionName;
      
        for (const k of c) {
        const doc = Object.entries(k);
        if (doc[1])
          data[pn] = { ...data[pn], [doc[1][0]]: doc[1][1] };
      };
    };

    return { ...data };
  };




  /**
   * create a validation schema from an Object
   * @deprecated marking for non-use until complete.
   */
  async createSchemaFromObject() {
    //TODO
  };

  /**
   * @returns a client object
   * @deprecated i'm not likely to use this anymore.
   */
  async getClient() {
    return this.client;
  };

};
export default Mongo;
