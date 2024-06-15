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
                // Handle response data as needed
                console.log('Response:', data);
                // Example: update UI with response data
                document.getElementById('musicosList').innerText = JSON.stringify(data, null, 2);
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
