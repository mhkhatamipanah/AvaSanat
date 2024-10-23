import connectDB from "@/src/configs/db";
import { NextResponse } from "next/server";

import { sign, verify } from "jsonwebtoken";
import { JWT_KEY } from "@/src/utils/Frontend/ApiActions";

import create from "@/src/utils/Backend/cookieSet";
const generateToken = (data) => {
  const token = sign(data, JWT_KEY, {
    // algorithm
    expiresIn: "7 days",
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const validationResult = verify(token, process.env.JWT_KEY);
    return validationResult;
  } catch (err) {
    console.log("Verify Token Err =>", err);
    return false;
  }
};

export async function POST(req, res) {
  try {
    connectDB();
    const body = await req.json();
    const { username, password } = body;
    if (username === "admin" && password === "admin") {
      const token = generateToken({ username });

      create(token);

      return NextResponse.json({
        success: true,
        message: "ورود موفق",
        data: token,
        password,
      });
    } else {
      return NextResponse.json(
        { success: false, message: "رمز عبور یا پسورد اشتباه است" },
        { status: 400 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { success: false, message: "مشکلی پیش آمده" },
      { status: 500 }
    );
  }

}
