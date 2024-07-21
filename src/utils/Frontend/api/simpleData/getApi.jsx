const getApi = async (url, setdata = null, setloading = null , router=null) => {
    try {
    
      const res = await fetch(url);
      if(res.redirected && router){
          router.push(res.url)
      }
  
      const result = await res.json();
      if (setdata !== null) {
        setdata(result);
      }
      if (setloading) {
        setloading(false);
      }
      return result;
    } catch (error) {
      console.log("error", error);
    }
  };
  
  export default getApi;
  