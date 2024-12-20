"use client"
import { ApiActions } from '@/src/utils/Frontend/ApiActions'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';
import cookieGet from '@/src/utils/Backend/cookieGet';

const Login = () => {
  const router = useRouter();


  const getCookie = async () => {
    const cookie = await cookieGet()
    if (cookie?.name == "AvaSanatToken") {
      router.push('/dashboard/category')
    }
  }
  useEffect(() => {
    getCookie()
  }, [])

  const [showPassword, setShowPassword] = useState(false)
  const { login } = ApiActions()

  const loginFunc = async () => {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    if (!username) {
      toast.error("نام کاربری را وارد کنید")
      return
    }
    if (!password) {
      toast.error(" پسورد را وارد کنید")
      return
    }
    const obj = { username, password }
    const JsonStrigfy = JSON.stringify(obj)
    const loginApi = await login(JsonStrigfy)
    if (loginApi) {
      router.push("/dashboard/category")
    }
  }
  return (
    <div className=''>
      <div className=" text-[#333]">
        <div className="min-h-screen flex fle-col items-center justify-center pb-20 px-4">
          <div className="grid justify-center items-center gap-4 max-w-7xl w-full">
            <div className="border border-gray-300 rounded-md p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-6">
                <div className="mb-10">
                  <h3 className="text-3xl font-extrabold text-center vazirDemibold mt-3"> ورود به داشبورد</h3>
                  <p className="text-md mt-4 vazirLight">
                    برای وارد شدن به پنل نام کاربری و رمز عبور را وارد کنید
                  </p>

                </div>
                <div>
                  <label className="text-sm mb-2 block vazirLight"> نام کاربری</label>
                  <div className="relative flex items-center">
                    <input id='username' name="username" type="text" required className="w-full text-sm border border-gray-300 border-solid px-4 py-3 rounded-md outline-[#333] enFont tracking-wide" placeholder="Enter user name" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute left-4" viewBox="0 0 24 24">
                      <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                      <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="text-sm mb-2 block vazirLight">رمز عبور</label>
                  <div className="relative flex items-center">
                    <input id='password' name="password" type={`${showPassword ? "text" : "password"}`} required className="w-full text-sm border border-gray-300 border-solid px-4 py-3 rounded-md outline-[#333] enFont tracking-wide" placeholder="Enter password" />
                    <svg onClick={() => {
                      setShowPassword(!showPassword)
                    }} xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute left-4 cursor-pointer" viewBox="0 0 128 128">
                      <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>

                <div className="!mt-10">
                  <button onClick={loginFunc} type="button" className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-[#333] hover:bg-gray-900 focus:outline-none vazirMedium">
                    ورود
                  </button>
                </div>

              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login