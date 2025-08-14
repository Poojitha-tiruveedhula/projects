document.addEventListener("DOMContentLoaded", function () {
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });
    fadeElements.forEach(el => observer.observe(el));

    // Borrow Chart
    new Chart(document.getElementById("borrowChart"), {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "Books Borrowed",
                data: [320, 450, 400, 520, 610, 700],
                borderColor: "#ff512f",
                fill: true,
                backgroundColor: "rgba(255,81,47,0.2)"
            }]
        }
    });

    // Category Chart
    new Chart(document.getElementById("categoryChart"), {
        type: "doughnut",
        data: {
            labels: ["Fiction", "Science", "History", "Children", "Technology"],
            datasets: [{
                data: [35, 20, 15, 18, 12],
                backgroundColor: ["#ff512f", "#dd2476", "#ff9800", "#4caf50", "#2196f3"]
            }]
        }
    });

    // Member Growth Chart
    new Chart(document.getElementById("memberChart"), {
        type: "bar",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "New Members",
                data: [50, 65, 70, 90, 100, 120],
                backgroundColor: "#dd2476"
            }]
        }
    });

    // Book Availability Chart
    new Chart(document.getElementById("availabilityChart"), {
        type: "pie",
        data: {
            labels: ["Available", "Borrowed", "Reserved"],
            datasets: [{
                data: [8500, 3000, 1347],
                backgroundColor: ["#4caf50", "#ff512f", "#ff9800"]
            }]
        }
    });
});
