window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
      const response = await fetch(url);

      if (!response.ok) {
        console.log("Bad Response!");
      } else {
        const data = await response.json();
        console.log(data);
        const conference = data.conferences[0];
        const nameTag = document.querySelector('.card-title');
        nameTag.innerHTML = conference.name;

        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
            const details = await detailResponse.json();
            const desc = document.querySelector('.card-text');
            desc.innerHTML = details.conference.description;
        }

      }
    } catch (e) {
      console.log("Error!");
    }

  });
