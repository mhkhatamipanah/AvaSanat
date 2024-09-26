import Cookies from "js-cookie";
import { toast } from "sonner";

const sendOtp = async (data) => {
  try {
    const res = await fetch("/api/contact_us/send/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      const result = await res.json();
      console.log(result);
      toast.info(result.otp);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const checkOtp = async (data) => {
  try {
    const res = await fetch("/api/contact_us/check/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.status === 200) {
      const result = await res.json();
      console.log(result);
      toast.info(result.otp);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

// ContactUs

const getContactUs = async (data) => {
  try {
    const res = await fetch("/api/contact_us/");
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
    getContactUs,
  };
};
