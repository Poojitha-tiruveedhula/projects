const ROLE_KEYWORDS = {
  "web developer": ['html', 'css', 'javascript', 'react', 'node', 'responsive', 'frontend', 'backend'],
  "java developer": ['java', 'spring', 'hibernate', 'oop', 'api', 'mysql'],
  "data scientist": ['python', 'pandas', 'numpy', 'machine learning', 'data analysis', 'model', 'scikit'],
};

const pdfUpload = document.getElementById("pdfUpload");
const analyzeBtn = document.getElementById("analyzeBtn");
const backBtn = document.getElementById("backBtn");

pdfUpload.addEventListener("change", () => {
  const file = pdfUpload.files[0];
  if (!file || file.type !== "application/pdf") {
    alert("Please upload a valid PDF.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function () {
    const typedArray = new Uint8Array(this.result);
    pdfjsLib.getDocument({ data: typedArray }).promise.then(pdf => {
      let allText = "";
      let loadPage = pageNum =>
        pdf.getPage(pageNum).then(page =>
          page.getTextContent().then(content => {
            allText += content.items.map(item => item.str).join(" ") + " ";
          })
        );

      let loaders = [];
      for (let i = 1; i <= pdf.numPages; i++) loaders.push(loadPage(i));

      Promise.all(loaders).then(() => {
        document.getElementById("resumeText").value = allText;
      });
    });
  };
  reader.readAsArrayBuffer(file);
});

analyzeBtn.addEventListener("click", () => {
  const text = document.getElementById('resumeText').value.toLowerCase();
  const role = document.getElementById('jobRole').value;

  if (!role) {
    alert("Please select a job role!");
    return;
  }

  const keywords = ROLE_KEYWORDS[role];
  const found = keywords.filter(kw => text.includes(kw));
  const missing = keywords.filter(kw => !text.includes(kw));
  const score = Math.round((found.length / keywords.length) * 100);

  let msg = `<p><strong>✅ Found Skills:</strong> ${found.join(", ") || "None"}</p>`;
  msg += `<p><strong>❌ Missing Skills:</strong> ${missing.join(", ") || "None"}</p>`;
  msg += `<p><strong>📈 ATS Score:</strong> ${score}%</p>`;

  msg += score >= 80
    ? `<p class="good">🎯 Great match!</p>`
    : score >= 50
    ? `<p class="average">⚠️ Add more skills.</p>`
    : `<p class="poor">🚫 Needs improvement.</p>`;

  document.getElementById("result").innerHTML = msg;
  renderChart(score);

  // Hide page 1, show page 2
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
});

backBtn.addEventListener("click", () => {
  // Hide page 2, show page 1
  document.getElementById("page2").style.display = "none";
  document.getElementById("page1").style.display = "block";
});

function renderChart(score) {
  const ctx = document.getElementById("scoreChart").getContext("2d");
  if (window.scoreChartInstance) window.scoreChartInstance.destroy();

  window.scoreChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Matched', 'Unmatched'],
      datasets: [{
        data: [score, 100 - score],
        backgroundColor: ['#4caf50', '#ffcdd2']
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' }
      }
    }
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
