import { createConnection } from 'typeorm';

createConnection().catch(err => {console.log("Database not start correct!", err)});
