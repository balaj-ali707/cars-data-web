import pool from "@/lib/db";

const dbMiddleware = async () => {
  const db = pool
  return db;
};

export default dbMiddleware;