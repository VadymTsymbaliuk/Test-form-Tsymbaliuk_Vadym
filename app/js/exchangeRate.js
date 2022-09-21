const currList = document.querySelector(".exchange-list")


fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
    .then(response => {
        return response.json()
    }).then(data => {

    data.forEach((item) => {
        console.log(item)
        const listItem = document.createElement("li");
        listItem.classList.add("exchange-list__item")
        listItem.innerHTML = `
    <p>${item.ccy} : ${item.buy}</p>
    <p>${item.base_ccy} : ${item.sale}
`;

        currList.appendChild(listItem)
    })
}).catch(e => {
    console.log(e)
})