// function createLocation {
//     return `
//     `
// }




window.addEventListener("DOMContentLoaded", async () => {

    const url = "http://localhost:8000/api/states/";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("Bad Response!");
        } else {
            const data = await response.json();
            let selectTag = document.getElementById("state");

            for (let state of data.states) {
                let option = document.createElement("option");
                option.value = state.abbreviation;
                option.innerHTML = state.name;

                selectTag.appendChild(option);
            }
        }




        const formTag = document.getElementById('create-location-form');
        formTag.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(formTag); //object that constructs key/value pairs from form field
            const json = JSON.stringify(Object.fromEntries(formData));

            const locationUrl = "http://localhost:8000/api/locations/";
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'applications/json',
                },
            };
            const response = await fetch(locationUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newLocation = await response.json();
            }

        });







    } catch (e) {
        console.error("There's been an error!");

    }
})
