// import { toast } from "react-toastify";

// const sendRequest = (url, formData, router = false) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const res = await fetch(url, {
//         method: "POST",
//         // headers: { "Content-Type": "application/json" },
//         body: formData,
//       });

//       if (res.redirected && router) {
//         router.push(res.url);
//         resolve({ routePush: 1 });
//         return;
//       }
//       const result = await res.json();
//       if (res.status === 200 || res.status === 201) {
//         resolve({ result, res });
//       } else {
//         reject(result.message);
//       }
//     } catch (error) {
//       console.log("error", error);
//       reject("ارور در درخواست");
//     }
//   });
// };

// const postFile = async (
//   url,
//   data,
//   router = false
//   //  setloading
// ) => {
//   const result = await toast.promise(
//     sendRequest(url, data, router),
//     {
//       pending: {
//         render() {
//           return "در حال پردازش اطلاعات";
//         },
//       },
//       success: {
//         render({ data }) {
//           if (data.routePush === 1) {
//             return "درخواست موفق";
//           }
//           return data.result.message;
//         },
//       },
//       error: {
//         render({ data }) {
//           return data;
//         },
//       },
//     },
//     {
//       position: "bottom-left",
//       autoClose: 3500,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       progress: undefined,
//       theme: "light",
//     }
//   );
//   return result;
// };

const postFile = async (
    url,
    data,
    router = false
    //  setloading
) => {
    try {
        const res = await fetch(url, {
            method: "POST",
            // headers: { "Content-Type": "application/json" },
            body: data,
        });

        if (res.redirected && router) {
            router.push(res.url);
            resolve({ routePush: 1 });
            return;
        }
        const result = await res.json();
        if (res.status === 200 || res.status === 201) {
            // resolve({ result, res });
            console.log(result)
        } else {
            // reject(result.message);
        }
    } catch (error) {
        console.log("error", error);
        reject("ارور در درخواست");
    }
}



export default postFile;
