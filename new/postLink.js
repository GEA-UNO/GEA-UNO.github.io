const url = "https://igna98.alwaysdata.net/";

const create = (data, key) => {
    fetch(`${url}/link?key=${key}`, {
        method: "POST",
        redirect: "manual",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => console.log(res.json))
        .catch((err) => console.log(err));
};

const getLinks = () => {
    return fetch(`${url}link`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((res) => res.data.map((e) => e.name))
        .catch((err) => console.log(err));
};

const getPages = () => {
    return fetch(`${url}page`, {
        method: "GET",
    })
        .then((res) => res.json())
        .then((res) => res.data.map((e) => e.url))
        .catch((err) => console.log(err));
};

const linkChange = (e) => {
    let link = document.getElementById("linkTest");
    link.href = e.target.value;
};

const descChange = (e) => {
    let desc = document.getElementById("descTest");
    e.target.value == null || e.target.value == ""
        ? (desc.style.display = "none")
        : (desc.style.display = "block");

    desc.innerText = e.target.value;
};

const spanTemplate = (styles) =>
    `<span id="iconSpanTest" class="iconify" ${styles}></span>`;

const imgTemplate = (styles) =>
    `<img id="iconImgTest" class="iconify" ${styles}/>`;

const titleTemplate = (icon, title) => {
    return `${icon}${title}`;
};

const titleChange = (e) => {
    let inTitle = document.getElementById("title");
    let inIsImg = document.getElementById("isImg");
    let inIconStyle = document.getElementById("iconStyle");
    let title = document.getElementById("titleTest");

    let icon = inIsImg.checked
        ? imgTemplate(inIconStyle.value)
        : spanTemplate(inIconStyle.value);

    title.innerHTML = titleTemplate(icon, inTitle.value);
};

const validInputs = (pageUrl, existentsLinks) => {
    if(validLink() && validImg() && validFathers(pageUrl) && validTag(existentsLinks)){
        return true;
    }
    return false;
};

const validLink = () => {
    let inLink = document.getElementById("link");
    let expression =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let regex = new RegExp(expression);
    if (!inLink.value.match(regex)) {
        console.log("el link no es valido"); //not valid
        return false;
    }
    return true;
};

const validImg = () => {
    let inIsImg = document.getElementById("isImg");
    let inIconStyle = document.getElementById("iconStyle");
    if (!inIconStyle.value.startsWith("src") && inIsImg.checked) {
        console.log("si es una img debe comenzar con src"); //not valid
        return false;
    }
    return true;
};

const validFathers = (pageUrl) => {
    let inFathers = document.getElementById("fathers");
    let validFathers = inFathers.value.split(",");
    let invalidFathers = [];
    validFathers.forEach((e) => {
        if (!pageUrl.includes(e)) invalidFathers.push(e);
    });
    if (invalidFathers != undefined && invalidFathers.length > 0) {
        console.log(validFathers);
        console.log(invalidFathers);
        console.log("los padres [" + invalidFathers + "] no existen"); //not valid
        return false;
    }
    return true;
};

const validTag = (existentsLinks) => {
    let inTag = document.getElementById("tag");
    if (existentsLinks.includes(inTag.value)) {
        console.log("el tag existe"); //not valid
        return false;
    }
    return true;
};

const sendData = (e, pageUrl, existentsLinks) => {
    e.preventDefault();
    if(validInputs(pageUrl, existentsLinks)) {
        console.log("enviar");
    }
}

const controlForm = (pageUrl, existentsLinks) => {
    let inTag = document.getElementById("tag");
    inTag.addEventListener("change", () => validTag(existentsLinks));
    let inFathers = document.getElementById("fathers");
    inFathers.addEventListener("change", () => validFathers(pageUrl));
    let inApiKey = document.getElementById("apiKey");

    let inLink = document.getElementById("link");
    inLink.addEventListener("input", linkChange);
    inLink.addEventListener("change", validLink);

    let inDesc = document.getElementById("desc");
    document.getElementById("descTest").style.display = "none";
    inDesc.addEventListener("input", descChange);

    let inTitle = document.getElementById("title");
    inTitle.addEventListener("input", titleChange);

    let inIsImg = document.getElementById("isImg");
    inIsImg.addEventListener("input", titleChange);
    inIsImg.addEventListener("change", validImg);

    let inIconStyle = document.getElementById("iconStyle");
    inIconStyle.addEventListener("input", titleChange);
    inIconStyle.addEventListener("change", validImg);

    let formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (e) => sendData(e, pageUrl, existentsLinks))
};

const controlNotas = () => {
    let notas = document.getElementById("notas");
    notas.style.display = "none";
};

window.addEventListener("load", async () => {
    let pageUrl = await getPages();
    let existentsLinks = await getLinks();
    await controlForm(pageUrl, existentsLinks);
    controlNotas();
});
