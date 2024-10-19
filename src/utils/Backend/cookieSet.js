"use server";

import { cookies } from "next/headers";

async function create(data) {
  const oneDay = 24 * 60 * 60 * 24000;  // Corrected the calculation for one day in milliseconds
  cookies().set({
    name: "AvaSanatToken",
    value: data,
    httpOnly: true,
    path: "/",
    expires: new Date(Date.now() + oneDay),  // Adjusted the expiration time
    sameSite: "None",  // Set SameSite attribute to None
    secure: true,  // Make sure to set secure flag when SameSite is None
  });
}

export default create;
