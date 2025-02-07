document.addEventListener("DOMContentLoaded", function () {
    function findParking() {
        let search = document.getElementById("search").value;
        let map = document.getElementById("map");

        if (search.trim() !== "") {
            map.innerHTML = `<p class='parking-spot'>🚗 Parking available at ${search}!</p>`;
        } else {
            map.innerHTML = "<p>No results found.</p>";
        }
    }

    // Attach event listener to button
    document.querySelector("button").addEventListener("click", findParking);
});
