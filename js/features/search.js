const searchresultfield = document.querySelector("#searchresultfield");
const input = document.querySelector("#searchinput");
const searchlabel = document.querySelector("#searchlabel");
const searchlabeltext = document.querySelector("#searchlabeltext");

fetch('/search-index.json')
  .then(res => res.json())
  .then(data => {
    const fuse = new Fuse(data, { keys: ["title", "category"], threshold: 0.3 });

    input.addEventListener("input", performSearch);
    input.addEventListener("click", performSearch);
    searchlabel.addEventListener("click", performSearch);

    function performSearch() {
        const results = fuse.search(input.value);
        const searchresultlist = document.querySelector("#searchresultlist");

        if (results.length > 8) { results.length = 8;};

        searchresultlist.innerHTML = "";

        if (results.length > 0) { 
            results.forEach(r => {
                const li = document.createElement("li");
                const a = document.createElement("a");
                li.classList.add("searchlistelement");
                a.href = r.item.url;
                a.textContent = r.item.title;
                li.appendChild(a);
                searchresultlist.appendChild(li);
            });
            searchresultfield.classList.remove("hidden");

        } else if (input.value != "") {
            const li = document.createElement("li");
            li.textContent = "Ingen resultater funnet";
            searchresultlist.appendChild(li);
            searchresultfield.classList.remove("hidden");

        } else if (input.value == "") {
            searchresultfield.classList.add("hidden");
        }
    }
});

document.addEventListener("click", (event) =>  {
  if (!searchresultfield.contains(event.target) && event.target !== input && event.target !== searchlabel && event.target !== searchlabeltext) {
    searchresultfield.classList.add("hidden");
  };
});
