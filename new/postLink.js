const url = "https://igna98.alwaysdata.net/";

const create = (data, key) => {
    fetch(`${url}/link?key=${key}`, {
        method: "POST",
        redirect: "manual",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((res) => console.log(res.json))
        .catch((err) => console.log(err));
};