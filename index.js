const url = "https://gealinks-api.herokuapp.com/";
//const url = "https://igna98.alwaysdata.net/";

const increment = (name) => {
    fetch(`${url}${name}`, {
        method: "PATCH",
        redirect: "manual",
    })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
};

const createTemplate = (data) => {
    let template = `
<a class="frame" onclick='increment("link/${data.name}")' onauxclick='increment("link/${data.name}")' href="${data.url}" target="_blank">
    <div class="title">
`;
    template += data.iconStyle.startsWith("src")
        ? `<img class="iconify" ${data.iconStyle}>`
        : `<span class="iconify" ${data.iconStyle}></span>`;
    template += `${data.title} </div>`;
    template += data.description
        ? `<div class="content"> ${data.description} </div> </a>`
        : `</a>`;

    return template;
};

const appendLinks = (data) => {
    data.sort( () => .5 - Math.random())
    let parent = document.getElementById("container");
    data.forEach((e) => {
        parent.innerHTML = createTemplate(e) + parent.innerHTML;
    });
};

const getLinks = (name) => {
    fetch(`${url}link?father=${name}`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((res) => appendLinks(res.data))
        .catch((err) => console.log(err));
};

const initPage = (pageTag, pagePath) => {
    increment(pageTag);
    getLinks(pagePath);
};
