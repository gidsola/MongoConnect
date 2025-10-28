import { MongoClient } from 'mongodb';
declare class MongoConnect {
    private url;
    client: MongoClient;
    db: import("mongodb").Db;
    /**
     * @todo: accept options block
     * The url or "Connection String" should follow formats as specified at:
     * @see https://www.mongodb.com/docs/manual/reference/connection-string-examples/#connection-string-examples
     *
     * @param url connection string
     * @param db database name to use if not specifying in connection string
     */
    constructor(url: string, db?: string | null);
    private isMongoString;
}
declare class Mongo extends MongoConnect {
    /**
     * The url or "Connection String" should follow formats as specified at:
     * @see https://www.mongodb.com/docs/manual/reference/connection-string-examples/#connection-string-examples
     *
     * @param url connection string
     * @param db database name to use if not specifying in connection string
     */
    constructor(url: string, db?: string | null);
    /**
     * Creates a collection with schema validation.
     *
     * @see https://www.mongodb.com/docs/manual/core/schema-validation/specify-json-schema/#specify-json-schema-validation
     *
     * @param collection collection name to use when creating
     * @param schema validator object
     * @returns the successfully created collection
     */
    createSchemaCollection(collection: string, schema: object): Promise<import("mongodb").Collection<import("bson").Document>>;
    /**
     *
     * @returns An array of named member objects from all available collections
     */
    getAll(): Promise<{
        [x: string]: {
            [key: string]: any;
        };
    }>;
}
export default Mongo;
//# sourceMappingURL=index.d.ts.map