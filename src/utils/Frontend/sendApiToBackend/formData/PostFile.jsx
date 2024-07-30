import { toast } from "sonner";

const sendRequest = (url, formData, router = false) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: formData,
      });

      if (res.redirected && router) {
        router.push(res.url);
        resolve({ routePush: 1 });
        return;
      }
      const result = await res.json();
      if (res.status === 200 || res.status === 201) {
        resolve({ result, res });
      } else {
        reject(result.message);
      }
    } catch (error) {
      console.log("error", error);
      reject("ارور در درخواست");
    }
  });
};

const postFile = async (
  url,
  data,
  router = false
  //  setloading
) => {
  const result = await toast.promise(
    sendRequest(url, data, router),
    {
        loading: 'Loading...',
        success: (data) => {
          return `${data.result.message}`;
        },
        error: 'Error',
    }
  );
  return result;
};




// const postFile = async (
//     url,
//     data,
//     router = false
//     //  setloading
// ) => {
//     try {
//         const res = await fetch(url, {
//             method: "POST",
//             // headers: { "Content-Type": "application/json" },
//             body: data,
//         });

//         if (res.redirected && router) {
//             router.push(res.url);
//             resolve({ routePush: 1 });
//             return;
//         }
//         const result = await res.json();
//         if (res.status === 200 || res.status === 201) {
//             // resolve({ result, res });
//             console.log(result)
//         } else {
//             // reject(result.message);
//         }
//     } catch (error) {
//         console.log("error", error);
//         reject("ارور در درخواست");
//     }
// }



export default postFile;
