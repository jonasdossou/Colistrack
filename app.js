const colisData = [
  {
    trackingNumber: "OJU123456",
    status: "En transit",
    sender: "Paris",
    receiver: "Lyon",
    history: [
      { status: "Déposé", location: "Paris", date: "2026-05-01T08:30:00" },
      { status: "En transit", location: "Dijon", date: "2026-05-02T14:15:00" }
    ]
  },
  {
    trackingNumber: "OJU654321",
    status: "Livré",
    sender: "Marseille",
    receiver: "Nice",
    history: [
      { status: "Déposé", location: "Marseille", date: "2026-05-01T10:00:00" },
      { status: "Livré", location: "Nice", date: "2026-05-02T16:45:00" }
    ]
  },
  {
    trackingNumber: "OJU987654",
    status: "En attente",
    sender: "Toulouse",
    receiver: "Bordeaux",
    history: [
      { status: "Déposé", location: "Toulouse", date: "2026-05-01T09:00:00" },
      { status: "En attente", location: "Bordeaux", date: "2026-05-02T12:00:00" }
    ]
  }
];

function getStatusClass(status) {
  switch (status) {
    case "Livré":
      return "status-livre";
    case "Arrivé":
      return "status-arrive";
    case "En transit":
      return "status-transit";
    case "Déposé":
      return "status-depose";
    case "En attente":
      return "status-attente";
    default:
      return "";
  }
}

function addHistory(trackingNumber, status, location) {
  const colis = colisData.find(c => c.trackingNumber === trackingNumber);
  if (!colis) return;

  colis.history.push({
    status: status,
    location: location,
    date: new Date().toISOString()
  });
}

// 🔍 TRACKING
function trackColis() {
  const trackingNumber = document.getElementById("trackingInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!trackingNumber) {
    resultDiv.innerHTML = "<p>Entrez un numéro de suivi.</p>";
    return;
  }

  const data = colisData.find(c => c.trackingNumber.toUpperCase() === trackingNumber.toUpperCase());

  if (!data) {
    resultDiv.innerHTML = "<p>Colis non trouvé.</p>";
    return;
  }

  const historyHTML = data.history
    .map(h => `<li>${h.status} - ${h.location} (${new Date(h.date).toLocaleString()})</li>`)
    .join("");

  resultDiv.innerHTML = `
    <div class="card">
      <h3>Statut : <span class="status ${getStatusClass(data.status)}">${data.status}</span></h3>
      <p>Expéditeur : ${data.sender}</p>
      <p>Destinataire : ${data.receiver}</p>
      <h4>Historique :</h4>
      <ul>${historyHTML}</ul>
    </div>
  `;
}

function renderIndexSections() {
  const arriveHome = document.getElementById('arriveHome');
  const livreHome = document.getElementById('livreHome');

  if (!arriveHome && !livreHome) return;

  const arriveCards = colisData
    .filter(c => c.status === 'Arrivé')
    .map(c => `
      <div class="card" style="min-width: 260px; flex: 1 1 260px;">
        <p><strong>${c.trackingNumber}</strong></p>
        <p>Statut : <span class="status ${getStatusClass(c.status)}">${c.status}</span></p>
        <p>Départ : ${c.sender}</p>
        <p>Arrivée : ${c.receiver}</p>
      </div>
    `).join("");

  const livreCards = colisData
    .filter(c => c.status === 'Livré')
    .map(c => `
      <div class="card" style="min-width: 260px; flex: 1 1 260px;">
        <p><strong>${c.trackingNumber}</strong></p>
        <p>Statut : <span class="status ${getStatusClass(c.status)}">${c.status}</span></p>
        <p>Départ : ${c.sender}</p>
        <p>Arrivée : ${c.receiver}</p>
      </div>
    `).join("");

  if (arriveHome) arriveHome.innerHTML = arriveCards || '<p>Aucun colis arrivé.</p>';
  if (livreHome) livreHome.innerHTML = livreCards || '<p>Aucun colis livré.</p>';
}

// 📊 DASHBOARD
function loadDashboard() {
  const dashboard = document.getElementById("dashboard");
  const arriveSection = document.getElementById("arriveSection");
  const livreSection = document.getElementById("livreSection");

  const allCards = colisData.map(c => `
    <div class="card">
      <p><strong>${c.trackingNumber}</strong></p>
      <p>Statut : <span class="status ${getStatusClass(c.status)}">${c.status}</span></p>
      <p>Départ : ${c.sender}</p>
      <p>Arrivée : ${c.receiver}</p>
      <div class="dashboard-actions">
        ${c.status === 'En attente' || c.status === 'Déposé' ? `<button onclick="departColis('${c.trackingNumber}')">Départ</button>` : ''}
        ${c.status === 'En transit' ? `<button onclick="arriveColis('${c.trackingNumber}')">Arrivée</button>` : ''}
        ${c.status === 'Arrivé' ? `<button onclick="livrerColis('${c.trackingNumber}')">Livré</button>` : ''}
      </div>
    </div>
  `).join("");

  const arriveCards = colisData
    .filter(c => c.status === 'Arrivé')
    .map(c => `
      <div class="card">
        <p><strong>${c.trackingNumber}</strong></p>
        <p>Statut : <span class="status ${getStatusClass(c.status)}">${c.status}</span></p>
        <p>Départ : ${c.sender}</p>
        <p>Arrivée : ${c.receiver}</p>
      </div>
    `).join("");

  const livreCards = colisData
    .filter(c => c.status === 'Livré')
    .map(c => `
      <div class="card">
        <p><strong>${c.trackingNumber}</strong></p>
        <p>Statut : <span class="status ${getStatusClass(c.status)}">${c.status}</span></p>
        <p>Départ : ${c.sender}</p>
        <p>Arrivée : ${c.receiver}</p>
      </div>
    `).join("");

  if (dashboard) dashboard.innerHTML = allCards || '<p>Aucun colis enregistré.</p>';
  if (arriveSection) arriveSection.innerHTML = arriveCards || '<p>Aucun colis arrivé.</p>';
  if (livreSection) livreSection.innerHTML = livreCards || '<p>Aucun colis livré.</p>';
}

function departColis(trackingNumber) {
  const colis = colisData.find(c => c.trackingNumber === trackingNumber);
  if (!colis) return;

  colis.status = "En transit";
  addHistory(trackingNumber, "En transit", colis.sender);
  loadDashboard();
}

function arriveColis(trackingNumber) {
  const colis = colisData.find(c => c.trackingNumber === trackingNumber);
  if (!colis) return;

  colis.status = "Arrivé";
  addHistory(trackingNumber, "Arrivé", colis.receiver);
  loadDashboard();
}

function livrerColis(trackingNumber) {
  const colis = colisData.find(c => c.trackingNumber === trackingNumber);
  if (!colis) return;

  colis.status = "Livré";
  addHistory(trackingNumber, "Livré", colis.receiver);
  loadDashboard();
}

function addColis(event) {
  event.preventDefault();

  const tracking = document.getElementById('newTracking').value.trim();
  const sender = document.getElementById('newSender').value.trim();
  const receiver = document.getElementById('newReceiver').value.trim();
  const status = document.getElementById('newStatus').value;

  if (!tracking || !sender || !receiver) {
    alert('Veuillez remplir tous les champs.');
    return;
  }

  const newColis = {
    trackingNumber: tracking.toUpperCase(),
    status: status,
    sender: sender,
    receiver: receiver,
    history: [
      { status: status, location: sender, date: new Date().toISOString() }
    ]
  };

  colisData.push(newColis);
  document.getElementById('addForm').reset();
  loadDashboard();
}

if (document.getElementById('addForm')) {
  document.getElementById('addForm').addEventListener('submit', addColis);
}
