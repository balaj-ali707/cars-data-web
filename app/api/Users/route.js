import dbMiddleware from "@/middleware/dbMiddleware";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export const POST = async (req) => {
  try {
    const db = await dbMiddleware();

    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      process.env.ENCRYPTION_KEY
    ).toString();

    const query = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;
    const values = [name, email, encryptedPassword];

    await db.query(query, values);

    return NextResponse.json(
      { message: "User added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding user:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
    try {
      const db = await dbMiddleware();

      const body = await req.json();
      const { email, password } = body;

      if (!email || !password) {
        return NextResponse.json(
          { message: "Missing email or password" },
          { status: 400 }
        );
      }

      const query = `SELECT * FROM users WHERE email = ?`;
      const [rows] = await db.query(query, [email]);

      if (rows.length === 0) {
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 401 }
        );
      }
  
      const user = rows[0];

      const bytes = CryptoJS.AES.decrypt(user.password, process.env.ENCRYPTION_KEY);
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedPassword !== password) {
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 401 }
        );
      }

      return NextResponse.json(
        {
          message: "Login successful",
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during login:", error);
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    }
  };
