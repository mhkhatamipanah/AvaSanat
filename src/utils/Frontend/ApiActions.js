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

// 3- PostApi
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
const editApi = (url, data) => {
  try {
    toast.promise(editPromise(url, data), {
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
      console.log(result)
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
const delete_Image_Product = async (id , id_image) => {
  return deleteApi(`/api/product/${id}/${id_image}`);
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

    // Product
    create_Product,
    get_OneProduct,
    delete_Product,
    edit_Product,
    get_CategoryProduct,
    delete_Image_Product,
  };
};
