
import { toast } from "sonner";

export const MONGOOSE = process.env.MONGOOSE;
export const JWT_KEY = process.env.JWT_KEY;

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

// 1- Post
const PostMethod = async (url, data) => {
  const res = await fetch(url, {
    method: "POST",
    body: data,
  });

  return res;
};

// 2- Promise Post
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
const postApi = async (url, data) => {
  try {
    // 1. فراخوانی postPromise و گرفتن نتیجه به صورت مستقیم
    const resultPromise = postPromise(url, data);

    // 2. نمایش پیام‌ها با استفاده از toast.promise بدون وابستگی به نتیجه نهایی
    toast.promise(
      resultPromise, // postPromise که یک Promise است به عنوان ورودی داده می‌شود
      {
        loading: "در حال پردازش اطلاعات...",
        success: (response) => {
          if (response.otp) {
            toast.info(response.otp); // نمایش OTP در صورت وجود
          }
          return response.message; // پیام موفقیت را برمی‌گرداند
        },
        error: (err) => {
          return err || "خطا در ارتباط با سرور"; // نمایش پیام خطا
        },
      }
    );

    // 3. منتظر ماندن برای نتیجه اصلی (موفقیت یا خطا)
    const result = await resultPromise;

    // 4. برگرداندن true یا false بر اساس نتیجه نهایی
    return result.success ? true : false;
  } catch (e) {
    console.log("Error in postApi:", e);
    return false;
  }
};

// 1- Edit
const EditMethod = async (url, data) => {
  const res = await fetch(url, {
    method: "PUT",
    body: data,
  });

  return res;
};
// 2- Promise Edit
const editPromise = (url, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await EditMethod(url, data);
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

// 3- EditApi
const editApi = async (url, data) => {
  try {
    const resultPromise = editPromise(url, data);

    toast.promise(resultPromise, {
      loading: "در حال پردازش اطلاعات...",
      success: (data) => {
        return `${data.message}`;
      },
      error: (e) => {
        console.log(e);
        return `${e}`;
      },
    });

    const result = await resultPromise; // منتظر نتیجه‌ی پرامیس بمان
    return result.success ? true : false; // بر اساس نتیجه تصمیم بگیر
  } catch (e) {
    console.log(e);
    return false;
  }
};

const deleteMethod = async (url) => {
  const res = await fetch(url, { method: "Delete" });
  return res;
};
// Promise Delete
const deletePromise = (url) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await deleteMethod(url);
      const result = await res.json();
      console.log(result);
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

// deleteApi
const deleteApi = (url) => {
  try {
    toast.promise(deletePromise(url), {
      loading: "در حال پردازش اطلاعات...",
      success: (data) => {
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

// Login
const login = (data) => {
  const result = postApi("/api/login/", data);
  return result;
};

// OTP Countact us
const sendOtp = (data) => {
  const result = postApi("/api/contact_us/send/", data);
  return result;
};

const checkOtp = async (data) => {
  const result = postApi("/api/contact_us/check/", data);
  return result;
};

// OTP Invoice
const sendOtpInvoice = (data) => {
  const result = postApi("/api/invoice/send/", data);
  return result;
};

const checkOtpInvoice = async (data) => {
  const result = postApi("/api/invoice/check/", data);
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
  return deleteApi(`/api/contact_us/${id}`);
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

//Product

const create_Product = async (url, data) => {
  return postApi(url, data);
};
const edit_Product = async (url, data) => {
  return editApi(url, data);
};

const delete_Product = async (id) => {
  return deleteApi(`/api/product/${id}`);
};
const get_OneProduct = async (id) => {
  try {
    const res = await fetch(`/api/product/${id}`);
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

const get_CategoryProduct = async (data) => {
  try {
    const res = await fetch(
      `/api/category?${new URLSearchParams(data).toString()}`
    );
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
const delete_Image_Product = async (id, id_image) => {
  return deleteApi(`/api/product/${id}/${id_image}`);
};

// Category
const get_OneCategory = async (id) => {
  try {
    const res = await fetch(`/api/category/${id}`);
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
const create_Category = async (url, data) => {
  return postApi(url, data);
};
const edit_Category = async (url, data) => {
  return editApi(url, data);
};
const delete_Category = async (id) => {
  return deleteApi(`/api/category/${id}`);
};

const fetchCategory = async () => {
  let data = {
    listCategory: true,
  };
  const fetchData = await fetch(
    `/api/category?${new URLSearchParams(data).toString()}`
  );

  return fetchData.json();
};

// Invoice
const create_Invoice = async (url, data) => {
  return postPromise(url, data);
};

const get_Invoice = async (data) => {
  try {
    const queryString = params(data);

    const res = await fetch(`/api/invoice${queryString}`);
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
const get_OneInvoice = async (id) => {
  try {
    const res = await fetch(`/api/invoice/${id}`);
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
const delete_Invoice = async (id) => {
  return deleteApi(`/api/invoice/${id}`);
};
const edit_Invoice = async (id, data) => {
  try {
    const res = await fetch(`/api/invoice/${id}`, {
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

//Product

const create_Blog = async (url, data) => {
  return postApi(url, data);
};
const edit_Blog = async (url, data) => {
  return editApi(url, data);
};

const delete_Blog = async (id) => {
  return deleteApi(`/api/blog/${id}`);
};
const get_OneBlog = async (id) => {
  try {
    const res = await fetch(`/api/blog/${id}`);
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
    // Login
    login,

    // Otp ContactUs
    sendOtp,
    checkOtp,

    // Otp Invoice
    sendOtpInvoice,
    checkOtpInvoice,

    // ContactUs
    get_ContactUs,
    get_OneContactUs,
    edit_ContactUs,
    delete_ContactUs,

    // Product
    create_Product,
    get_OneProduct,
    delete_Product,
    edit_Product,
    get_CategoryProduct,
    delete_Image_Product,

    // Category
    get_OneCategory,
    create_Category,
    edit_Category,
    delete_Category,

    fetchCategory,

    // Invoice
    create_Invoice,
    get_Invoice,
    get_OneInvoice,
    delete_Invoice,
    edit_Invoice,

    // Invoice
    create_Blog,
    edit_Blog,
    delete_Blog,
    get_OneBlog,
  };
};
