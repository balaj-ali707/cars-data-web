import dbMiddleware from "@/middleware/dbMiddleware";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {

    const db = await dbMiddleware();

    const { searchParams } = new URL(req.url);
    const cylinders = searchParams.get("cylinders");
    const year = searchParams.get("year");
    const horsepower = searchParams.get("horsepower");

    let query = `SELECT * FROM cars WHERE 1=1`;
    const queryParams = [];

    if (cylinders) {
      query += ` AND Cylinders = ?`;
      queryParams.push(Number(cylinders));
    }

    if (year) {
      query += ` AND Year = ?`;
      queryParams.push(year);
    }

    if (horsepower) {
      query += ` AND Horsepower >= ?`;
      queryParams.push(Number(horsepower));
    }

    const [rows] = await db.query(query, queryParams);

    console.log("Filtered rows:", rows);

    return NextResponse.json({ body: rows }, { status: 200 });
  } catch (error) {
    console.error("Error querying database:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};




