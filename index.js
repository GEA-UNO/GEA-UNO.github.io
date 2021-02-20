const url = "url aca";

function increment(name){
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(name)
    })
}