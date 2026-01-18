// import { Pool } from "pg";

// export const pool = new Pool({
//   host: "localhost",
//   port: 5432,
//   user: "postgres",        
//   password: "1122ojas@@@",
//   database: "Rental-Fleet",
// });

// pool.on("connect", () => {
//   console.log("✅ Connected to PostgreSQL");
// });

import { Pool } from "pg";

export const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_iqmk5FAa6MYg@ep-blue-leaf-a104axij-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("connect", () => {
  console.log("✅ Connected to Neon PostgreSQL");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error", err);
});
