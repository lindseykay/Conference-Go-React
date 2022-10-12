window.addEventListener("DOMContentLoaded", async () => {

    const url = "http://localhost:8000/api/states/";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("Bad Response!");
        } else {
            const data = await response.json();
            console.log(data);
            let selectTag = document.getElementById("state");

            for (let state of data.states) {
                let option = document.createElement("option");
                option.value = state.abbreviation;
                console.log(option.value);
                option.innerHTML = state.name;

                selectTag.appendChild(option);

            }

        }
    } catch (e) {
        console.error("There's been an error!");

    }
})
