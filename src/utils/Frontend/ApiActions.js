import Cookies from "js-cookie";
import { toast } from "sonner";

export const MONGOOSE = process.env.MONGOOSE;

// Function For Params
const params = (obj) => {
  let page = obj.page;
  let perpage = obj.perpage;
  let search = obj.search;

  const queryParams = [];
  if (page !== undefined && page !== null) {
    queryParams.push(`page=${page}`);
  }
  if (perpage !== undefined && perpage !== null) {
    queryParams.push(`per_page=${perpage}`);
  }
  if (search !== undefined && search !== null) {
    queryParams.push(`search=${search}`);
  }
  const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  return queryString;
};

//** POST_METHOD **  */

// Post
const PostMethod = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res;
};

// Promise
const postPromise = (url, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await PostMethod(url, data);
      const result = await res.json();
      if (res.status === 200 || res.status === 201) {
        resolve(result);
      } else {
        reject(result.message);
      }
    } catch (error) {
      console.log("error", error);
      reject("ارور در درخواست");
    }
  });
};

// PostApi
const postApi = (url, data) => {
  try {
    toast.promise(postPromise(url, data), {
      loading: "در حال پردازش اطلاعات...",
      success: (data) => {
        
        // بعدا برداشته شود
        if (data.otp) {
          toast.info(data.otp);
        }
        return `${data.message}`;
      },
      error: (e) => {
        console.log(e);
        return `${e}`;
      },
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// OTP
const sendOtp = (data) => {
  const result = postApi("/api/contact_us/send/", data);
  return result;
};

const checkOtp = async (data) => {
  const result = postApi("/api/contact_us/check/", data);
  return result;
};

// ***/ DASHBOARD /* ///

// ContactUs

const get_ContactUs = async (data) => {
  try {
    const queryString = params(data);

    const res = await fetch(`/api/contact_us${queryString}`);
    if (res.status === 200) {
      const result = await res.json();
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
const get_OneContactUs = async (id) => {
  try {
    const res = await fetch(`/api/contact_us/${id}`);
    if (res.status === 200) {
      const result = await res.json();
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
const delete_ContactUs = async (id) => {
  try {
    const res = await fetch(`/api/contact_us/${id}`, { method: "DELETE" });
    if (res.status === 200) {
      const result = await res.json();
      console.log(result);
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
const edit_ContactUs = async (id, data) => {
  try {
    const res = await fetch(`/api/contact_us/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      const result = await res.json();
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
export const ApiActions = () => {
  return {
    // Otp ContactUs
    sendOtp,
    checkOtp,

    // ContactUs
    get_ContactUs,
    get_OneContactUs,
    edit_ContactUs,
    delete_ContactUs,
  };
};
