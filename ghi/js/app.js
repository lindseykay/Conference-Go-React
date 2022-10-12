function createCard(name, description, pictureUrl, startDate, endDate, location) {
    return `
      <div class="card shadow mb-5">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer">${startDate} - ${endDate}</div>
      </div>
    `;
  }


function errorAlert () {
    return `
    <div class="alert alert-danger" role="alert">
    Oopsies! There's been an error!
    </div>
    `
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

    if (!response.ok) {
        console.log("Bad Response!");
      } else {
        const data = await response.json();

        let index = 0;
        for (let conference of data.conferences) {
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();
                const title = details.conference.name;
                const description = details.conference.description;
                const pictureUrl = details.conference.location.picture_url;
                const startDate = new Date(details.conference.starts).toLocaleDateString('en-US');
                const endDate = new Date(details.conference.ends).toLocaleDateString('en-US');
                const location = details.conference.location.name;
                const html = createCard(title, description, pictureUrl, startDate, endDate, location);
                const column = document.querySelector(`#col-${index % 3}`);
                column.innerHTML += html;
                index += 1;
              }
      }

      }
    } catch (e) {
        console.error("There's been an error!");

        const newHTML = errorAlert();
        const somethingWrong = document.querySelector("#somethingwrong");
        somethingWrong.innerHTML = newHTML;
    }

  });
