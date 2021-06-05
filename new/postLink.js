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
    let title = document.getElementById("titleTest");
    let inTitle = document.getElementById("title");
    let inIconStyle = document.getElementById("iconStyle");
    let inIsImg = document.getElementById("isImg");

    let icon = inIsImg.checked
        ? imgTemplate(inIconStyle.value)
        : spanTemplate(inIconStyle.value);

    title.innerHTML = titleTemplate(icon, inTitle.value);
};

window.addEventListener("load", () => {
    let inTag = document.getElementById("tag");
    let inFathers = document.getElementById("fathers");
    let inApiKey = document.getElementById("apiKey");

    let inLink = document.getElementById("link");
    inLink.addEventListener("input", linkChange);

    let inDesc = document.getElementById("desc");
    document.getElementById("descTest").style.display = "none";
    inDesc.addEventListener("input", descChange);

    let inTitle = document.getElementById("title");
    inTitle.addEventListener("input", titleChange);

    let inIsImg = document.getElementById("isImg");
    inIsImg.addEventListener("input", titleChange);

    let inIconStyle = document.getElementById("iconStyle");
    inIconStyle.addEventListener("input", titleChange);
});
