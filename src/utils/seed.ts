import { sql } from "@vercel/postgres";
import { db, NewUser, UsersTable } from "../utils/drizzle";

export async function seed() {
  const createTable = await sql.query(`
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    liked_movies JSONB,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
`);

  console.log(`Created "users" table`);

  const newMovies: MovieSchema[] = [
    {
      name: "blade runner",
    },
    {
      name: "smile",
    },
  ];
  const newUser: NewUser = {
    email: "testemail@.com",
    likedMovies: newMovies,
  };
  const insertedUser = await db.insert(UsersTable).values(newUser).returning();

  console.log(`Seeded ${insertedUser.length} users`);

  return {
    createTable,
    insertedUser,
  };
}
