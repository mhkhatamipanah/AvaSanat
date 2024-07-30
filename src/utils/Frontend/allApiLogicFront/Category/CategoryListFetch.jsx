const fetchCategory = async ()=>{
    let data = {
        listCategory: true,
    };
    const fetchData = await fetch(`/api/category?${(new URLSearchParams(data)).toString()}`)

    return fetchData.json()
}

export default fetchCategory;