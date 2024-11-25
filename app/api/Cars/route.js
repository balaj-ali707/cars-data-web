import dbMiddleware from "@/middleware/dbMiddleware";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const db = await dbMiddleware();

    const { searchParams } = new URL(req.url);
    const cylinders = searchParams.get("cylinders");
    const year = searchParams.get("year");
    const horsepower = searchParams.get("horsepower");
    const displacement = searchParams.get("displacement")

    let query = `SELECT * FROM cars WHERE 1=1`;
    const queryParams = [];

    if (cylinders) {
      query += ` AND Cylinders = ?`;
      queryParams.push(Number(cylinders));
    }

    if (displacement) {
        query += ` AND Displacement = ? `
        queryParams.push(Number(displacement))
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

    // console.log("Filtered rows:", rows);

    return NextResponse.json({ body: rows }, { status: 200 });
  } catch (error) {
    console.error("Error querying database:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};

export const POST = async (req) => {
  try {
    const db = await dbMiddleware();

    const body = await req.json();

    const {
      Name,
      Miles_per_Gallon,
      Cylinders,
      Displacement,
      Horsepower,
      Weight_in_lbs,
      Acceleration,
      Year,
      Origin,
    } = body;

    if (
      !Name ||
      !Miles_per_Gallon ||
      !Cylinders ||
      !Displacement ||
      !Horsepower ||
      !Weight_in_lbs ||
      !Acceleration ||
      !Year ||
      !Origin
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const query = `
        INSERT INTO cars (
          Name, Miles_per_Gallon, Cylinders, Displacement, Horsepower,
          Weight_in_lbs, Acceleration, Year, Origin
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

    const values = [
      Name,
      Miles_per_Gallon,
      Cylinders,
      Displacement,
      Horsepower,
      Weight_in_lbs,
      Acceleration,
      Year,
      Origin,
    ];

    const [result] = await db.query(query, values);


    return NextResponse.json(
      { message: "Data inserted successfully", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting data into database:", error);

    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};
