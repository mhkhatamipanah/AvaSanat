"use server";

import { cookies } from 'next/headers'

async function cookieGet(data) {
    const cookieStore = cookies()
    const AvaSanatToken = cookieStore.get('AvaSanatToken')
    return AvaSanatToken
  }
  export default cookieGet