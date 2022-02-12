const url = "https://gealinks-api.herokuapp.com/";
//const url = "https://igna98.alwaysdata.net/";

const create = (data, key) => {
    fetch(`${url}link?key=${key}`, {
        method: "POST",
        redirect: "manual",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((res) => {
            if(res.status === 201){
                alert(`Respuesta aceptada, link ${res.json.name} creado`);
            } else if(res.status === 401){
                alert("Error la password es incorrecta");
            } else if(res.status === 500){
                alert("Error en el servidor, vuelve a intentar mas tarde");
            }
        })
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
    let errLink = document.getElementById("errLink")
    let expression =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let regex = new RegExp(expression);
    if (!inLink.value.match(regex)) {
        errLink.style.display = "block";
        return false;
    } else {
        errLink.style.display = "none";
        return true;
    }
};

const validImg = () => {
    let inIsImg = document.getElementById("isImg");
    let errImg = document.getElementById("errImg");
    let inIconStyle = document.getElementById("iconStyle");
    if (!inIconStyle.value.startsWith("src") && inIsImg.checked) {
        errImg.style.display = "block";
        return false;
    } else {
        errImg.style.display = "none";
        return true;
    }
};

const validFathers = (pageUrl) => {
    let inFathers = document.getElementById("fathers");
    let errFather = document.getElementById("errFather")
    let validFathers = inFathers.value.split(",");
    let invalidFathers = [];
    validFathers.forEach((e) => {
        if (!pageUrl.includes(e)) invalidFathers.push(e);
    });
    if (invalidFathers != undefined && invalidFathers.length > 0) {
        errFather.innerText = "*Nota: los padres [" + invalidFathers + "] no existen";
        errFather.style.display = "block"
        return false;
    } else {
        errFather.style.display = "none";
        return true;
    }
};

const validTag = (existentsLinks) => {
    let inTag = document.getElementById("tag");
    let errTag = document.getElementById("errTag");
    if (existentsLinks.includes(inTag.value)) {
        errTag.style.display = "block";
        return false;
    } else {
        errTag.style.display = "none";
        return true;
    }
};

const linkFactory = () => {
    let desc = document.getElementById("desc").value;
    let fathers = document.getElementById("fathers").value;
    let tag = document.getElementById("tag").value;
    let link = document.getElementById("link").value;
    let tit = document.getElementById("title").value;
    let icon = document.getElementById("iconStyle").value;
    if(desc && desc.length > 8){
        return {
            father: fathers,
            name: tag,
            count: 0,
            url: link,
            title: tit,
            description: desc,
            iconStyle: icon
        }
    }
    return {
        father: fathers,
        name: tag,
        count: 0,
        url: link,
        title: tit,
        iconStyle: icon
    }
}

const sendData = (e, pageUrl, existentsLinks) => {
    e.preventDefault();
    let inApiKey = document.getElementById("apiKey");
    if(validInputs(pageUrl, existentsLinks)) {
        create(linkFactory(), inApiKey.value)
    }
}

const controlForm = (pageUrl, existentsLinks) => {
    document.getElementById("tag").addEventListener("change", () => validTag(existentsLinks));
    document.getElementById("fathers").addEventListener("change", () => validFathers(pageUrl));

    let inLink = document.getElementById("link");
    inLink.addEventListener("input", linkChange);
    inLink.addEventListener("change", validLink);

    let inDesc = document.getElementById("desc");
    document.getElementById("descTest").style.display = "none";
    inDesc.addEventListener("input", descChange);

    document.getElementById("title").addEventListener("input", titleChange);

    let inIsImg = document.getElementById("isImg");
    inIsImg.addEventListener("input", titleChange);
    inIsImg.addEventListener("change", validImg);

    let inIconStyle = document.getElementById("iconStyle");
    inIconStyle.addEventListener("input", titleChange);
    inIconStyle.addEventListener("change", validImg);

    let formulario = document.getElementById("formulario");
    formulario.addEventListener("submit", (e) => sendData(e, pageUrl, existentsLinks))
};

const controlNotas = (pageUrl) => {
    let state = false;
    let notas = document.getElementById("notas");
    document.getElementById("btnVer").addEventListener("click", (e) => {
        console.log("in")
        notas.style.display = state?  "none" : "flex";
        state = !state;
    })
    document.getElementById("fatherListInterpolate").innerText = `[ ${pageUrl.map(e => ' '+e)} ]`;
};

window.addEventListener("load", async () => {
    let pageUrl = await getPages();
    let existentsLinks = await getLinks();
    await controlForm(pageUrl, existentsLinks);
    controlNotas(pageUrl);
});
