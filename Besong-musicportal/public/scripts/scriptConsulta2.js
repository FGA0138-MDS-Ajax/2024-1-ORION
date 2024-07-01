document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('musicoGenero');
    const submitBtn = document.getElementById('submitBtn');

    submitBtn.addEventListener('click', function() {
        const selectedValue = selectElement.value;

        if (selectedValue) {
            const apiUrl = 'http://54.242.81.142:81/api/musicosList';

            const requestData = {
                estiloMusical: selectedValue
            };

            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
            .then(response => response.json())
            .then(data => {
                // Handle response data
                console.log('Response:', data);
                // Example: update UI with response data
                const musicosList = document.getElementById('musicosList');
                musicosList.innerHTML = ''; // Clear previous content

                data.forEach(musico => {
                    // Create table for each musician
                    const table = document.createElement('table');
                    table.className = 'musician-table';

                    // Add musician data to the table
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);
                    const cell3 = row.insertCell(2);

                    cell1.innerHTML = `<img src="${musico.image}" alt="${musico.nome}" style="width:100px;height:auto;">`;
                    cell2.innerHTML = `<strong>${musico.nome}</strong><br>${musico.descricao}`;
                    cell3.innerHTML = `<a href="portfolio.html?id=${musico.id}">Portfólio</a>`;

                    // Append the table to the musicians list
                    musicosList.appendChild(table);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle errors gracefully
            });
        } else {
            alert('Por favor, selecione um gênero musical.');
        }
    });
});
