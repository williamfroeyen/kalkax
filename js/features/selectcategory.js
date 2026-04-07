const categoryLists = document.querySelectorAll(".category-field");
const categoriesSelectBtns = document.querySelectorAll(".categoryselection");

categoriesSelectBtns.forEach(button => {

    button.addEventListener("click", () => {
        const selected = button.dataset.category;

        categoriesSelectBtns.forEach(btn => {
            const isSelected = btn.dataset.category === selected;
            btn.classList.toggle("categoryselected", isSelected);
            btn.setAttribute("aria-pressed", isSelected);
        });

        categoryLists.forEach(list => {
            const isMatch = list.dataset.category === selected || selected === "alle";
            list.classList.toggle("hidden", !isMatch);
        });
    });
});
