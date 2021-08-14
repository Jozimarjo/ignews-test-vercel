import { Client } from 'faunadb'
import { query as q } from 'faunadb';
export const fauna = new Client({
    secret: process.env.FAUNADB_KEY
})
export const query = q;