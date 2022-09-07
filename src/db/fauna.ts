import faunadb, { Expr } from "faunadb";

const secret = process.env.FAUNADB_SK as string;

if (!secret) new Error("FAUNADB_SK is not defined!");

const client = new faunadb.Client({
  secret,
  domain: "db.eu.fauna.com",
  port: 443,
  scheme: "https",
});

/**
 * @description query wrapper as same as faunaQueryWrapper but different return type
 * @return T
 * @use for queries that hit the DB index
 */
const faunaQuery = async <T>(
  expression: Expr,
  {
    debugInfo,
  }: {
    /**
     * @description example: expression name, or any info that help to debug
     */
    debugInfo: string;
  }
) =>
  await client.query<T>(expression).catch((err) => {
    console.info("debugInfo: ", debugInfo);
    console.error("Error: [%s]", err);
  });

const q = faunadb.query;

export { client, q, faunaQuery };
