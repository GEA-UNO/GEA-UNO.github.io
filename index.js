const url = "https://igna98.alwaysdata.net/";

function increment(name){
        fetch(`${url}${name}`, { method: "PATCH", redirect: "manual" })
        .then(res => console.log(res))
        .catch(err => console.log(err))
}
