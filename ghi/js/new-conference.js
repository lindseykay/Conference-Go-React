window.addEventListener("DOMContentLoaded", async () => {

    const url = "http://localhost:8000/api/locations/";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("Bad Response!");
        } else {
            const data = await response.json();
            console.log(data);
            let selectTag = document.getElementById("location");

            for (let location of data.locations) {
                let option = document.createElement("option");
                option.value = location.id;
                option.innerHTML = location.name;

                selectTag.appendChild(option);
            }
        }




        const formTag = document.getElementById('create-conference-form');
        formTag.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(formTag); //object that constructs key/value pairs from form field
            const json = JSON.stringify(Object.fromEntries(formData));

            const conferenceUrl = "http://localhost:8000/api/conferences/";
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'applications/json',
                },
            };
            const response = await fetch(conferenceUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newLocation = await response.json();
            }

        });







    } catch (e) {
        console.error("There's been an error!");

    }
})
