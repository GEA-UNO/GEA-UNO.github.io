const url = "https://igna98.alwaysdata.net/";

const increment = (name) => {
        fetch(`${url}${name}`, { method: "PATCH", redirect: "manual" })
                .then(res => console.log(res))
                .catch(err => console.log(err))
}

const getLinks = (name) => {
        fetch(`${url}link?father=${name}`, { method: "GET"})
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(err => console.log(err))
}

const initPage = (pageTag, pagePath) => {
        increment(pageTag);
        getLinks(pagePath);
}