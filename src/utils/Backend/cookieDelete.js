"use server";

import { cookies } from "next/headers";

async function removeTokens(data) {
  cookies().set(data, "");
}
export default removeTokens