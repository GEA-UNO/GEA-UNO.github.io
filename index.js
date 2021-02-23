const url = "http://igna98.alwaysdata.net/link/";

function increment(name){
    fetch(`${url}${name}`, { method: "PATCH" })
}