// import React, { useState, useEffect } from "react";
// import ReservationForm from "./ReservationForm";
// import {
//   Calendar,
//   Clock,
//   Users,
//   CreditCard,
//   Trash2,
//   Edit,
//   Hospital,
//   LogOut
// } from "lucide-react";
// import "./Secretaire.css";



// // DONNÉES D'EXEMPLE POUR AFFICHAGE
// const exampleConsultations = [
//   {
//     id: 1,
//     doctorId: 1,
//     dateDebut: "2026-03-05",
//     dateFin: "2026-03-05",
//     heure: "09:00",
//     montant: 5000,
//     places: 5,
//   },
//   {
//     id: 2,
//     doctorId: 2,
//     dateDebut: "2026-03-06",
//     dateFin: "2026-03-06",
//     heure: "11:00",
//     montant: 3500,
//     places: 3,
//   },
//   {
//     id: 3,
//     doctorId: 3,
//     dateDebut: "2026-03-07",
//     dateFin: "2026-03-07",
//     heure: "14:00",
//     montant: 4000,
//     places: 2,
//   },
// ];

// const exampleReservations = [
//   {
//     patient: "Fatima Ould Ahmed",
//     nni: "12345678",
//     phone: "45236789",
//     email: "fatima@example.com",
//     doctor: "Dr Ahmed Mohamed",
//     date: "2026-03-05",
//     heure: "09:00",
//     montant: 5000,
//   },
//   {
//     patient: "Mohamed Ould Saleh",
//     nni: "87654321",
//     phone: "45239876",
//     email: "mohamed@example.com",
//     doctor: "Dr Fatima Ould Saleh",
//     date: "2026-03-06",
//     heure: "11:00",
//     montant: 3500,
//   },
// ];




// const API_BASE_URL = "http://127.0.0.1:8000/api"; // point d'accès Django REST API

// export default function Secretaire() {
//   const [active, setActive] = useState("dashboard");

//   // const [consultations, setConsultations] = useState([]);
//   // const [reservations, setReservations] = useState([]);

//   const [consultations, setConsultations] = useState(exampleConsultations);
//   const [reservations, setReservations] = useState(exampleReservations);

//   const [doctors, setDoctors] = useState([]);
//   const [editingConsultId, setEditingConsultId] = useState(null);
//   const [editingResId, setEditingResId] = useState(null);

//   const [consultForm, setConsultForm] = useState({
//     doctorId: "",
//     dateDebut: "",
//     dateFin: "",
//     heure: "",
//     places: "",
//     montant: "",
//   });

//   const [reservationForm, setReservationForm] = useState({
//     patient: "",
//     phone: "",
//     email: "",
//     doctorId: "",
//     nni: "",
//     montant: "",
//   });

//   /* ===============================
//           FETCH DATA FROM DJANGO
//   =============================== */
//  useEffect(() => {
//   fetchDoctors();
//   fetchConsultations();
//   fetchReservations();
// }, []);

// const fetchDoctors = async () => {
//   const res = await fetch(`${API_BASE_URL}/doctors/`);
//   const data = await res.json();
//   setDoctors(data);
// };

// const fetchConsultations = async () => {
//   const res = await fetch(`${API_BASE_URL}/consultations-temporaires/`);
//   const data = await res.json();
//   setConsultations(data);
// };

// const fetchReservations = async () => {
//   const res = await fetch(`${API_BASE_URL}/consultations-payees/`);
//   const data = await res.json();
//   setReservations(data);
// };


//   /* ===============================
//         HANDLE FORMS CHANGE
//   =============================== */
//   const handleConsultChange = (e) =>
//     setConsultForm({ ...consultForm, [e.target.name]: e.target.value });

//   const handleReservationChange = (e) =>
//     setReservationForm({ ...reservationForm, [e.target.name]: e.target.value });

//   const resetConsultForm = () => {
//   setConsultForm({
//     doctorId: "",
//     dateDebut: "",
//     heureDebut: "",
//     heureFin: "",
//     places: "",
//     montant: "",
//   });
//   setEditingConsultId(null);
// };

//   const resetReservationForm = () => {
//     setReservationForm({
//       patient: "",
//       phone: "",
//       email: "",
//       doctorId: "",
//       nni: "",
//       montant: "",
//     });
//     setEditingResId(null);
//   };

//   /* ===============================
//         CRUD CONSULTATIONS
//   =============================== */
//   const submitConsult = async (e) => {
//   e.preventDefault();

//   const payload = {
//     doctor: consultForm.doctorId,
//     date_fin: consultForm.dateDebut + "T" + consultForm.heureDebut, // exemple pour l’heure
//     montant: consultForm.montant,
//     n_places: consultForm.places
//   };

//   const method = editingConsultId ? "PUT" : "POST";
//   const url = editingConsultId
//     ? `${API_BASE_URL}/consultations-temporaires/${editingConsultId}/`
//     : `${API_BASE_URL}/consultations-temporaires/`;

//   await fetch(url, {
//     method,
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   fetchConsultations();
//   resetConsultForm();
//   setActive("consultations");
// };

//   const deleteConsult = async (id) => {
//     if (!window.confirm("Supprimer cette consultation ?")) return;

//     await fetch(`${API_BASE_URL}/consultations/${id}/`, { method: "DELETE" });
//     fetchConsultations();
//   };

//   /* ===============================
//         CRUD RESERVATIONS
//   =============================== */
//   const submitReservation = async (e) => {
//   e.preventDefault();

//   const payload = {
//     nom_complet: reservationForm.patient,
//     numero_tel: reservationForm.phone,
//     temporaire_id: reservationForm.doctorId, // correspond à la consultation temporaire sélectionnée
//     montant: reservationForm.montant,
//   };

//   const method = editingResId ? "PUT" : "POST";
//   const url = editingResId
//     ? `${API_BASE_URL}/consultations-payees/${editingResId}/`
//     : `${API_BASE_URL}/consultations-payees/`;

//   await fetch(url, {
//     method,
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   fetchReservations();
//   resetReservationForm();
//   setActive("reservations");
// };

//   const deleteReservation = async (id) => {
//     if (!window.confirm("Supprimer cette réservation ?")) return;

//     await fetch(`${API_BASE_URL}/reservations/${id}/`, { method: "DELETE" });
//     fetchReservations();
//   };

//   /* ===============================
//         UTILS
//   =============================== */
//   const getDoctorName = (id) => doctors.find((d) => d.id === id)?.name;
//   const getDoctorSpecialite = (id) => doctors.find((d) => d.id === id)?.specialite;

//   /* ===============================
//         LOGOUT
//   =============================== */
//   const handleLogout = async () => {
//     if (!window.confirm("Voulez-vous vraiment vous déconnecter ?")) return;

//     await fetch(`${API_BASE_URL}/logout/`, { method: "POST", credentials: "include" });
//     alert("Déconnecté ✅");
//     window.location.href = "/login"; // Redirige vers page login
//   };

//   return (
//     <div className="secretaire-container">

//       {/* HEADER */}
//       <header className="header">
//         <div className="header-left">
//           <Hospital size={50} color="#fff" />
//           <div>
//             <h1>Cabinet Médical</h1>
//             <p>Dashboard Secrétaire</p>
//           </div>
//         </div>

//         <nav className="menu">
          
//           <button onClick={() => setActive("form")}>Ajouter / Modifier Consultation</button>
//           <button onClick={() => setActive("consultations")}>Consultations</button>
//           <button onClick={() => setActive("reservations")}>Réservations</button>
//           <button onClick={handleLogout}><LogOut size={16}/> Déconnexion</button>
//         </nav>
//       </header>

   
    

      
//       {/* FORM CONSULTATION */}
// {active === "form" && (
//   <section className="section card">
//     <h2>{editingConsultId ? "Modifier" : "Ajouter"} Consultation</h2>
//     <form className="form-grid" onSubmit={submitConsult}>
      
//       <label>
//         Médecin :
//         <select
//           name="doctorId"
//           value={consultForm.doctorId}
//           onChange={handleConsultChange}
//           required
//         >
//           <option value="">Choisir médecin</option>
//           {doctors.map((d) => (
//             <option key={d.id} value={d.id}>
//               {d.name} ({d.specialite})
//             </option>
//           ))}
//         </select>
//       </label>

//       <label>
//         Date :
//         <input
//           type="date"
//           name="dateDebut"
//           value={consultForm.dateDebut}
//           onChange={handleConsultChange}
//           required
//         />
//       </label>

//       <label>
//         Heure Début :
//         <input
//           type="time"
//           name="heureDebut"
//           value={consultForm.heureDebut || ""}
//           onChange={handleConsultChange}
//           required
//         />
//       </label>

//       <input
//   type="datetime-local"
//   name="date_fin"
//   value={consultForm.date_fin}
//   onChange={handleConsultChange}
//   required
// />

//       <label>
//         Montant (UM) :
//         <input
//           type="number"
//           name="montant"
//           value={consultForm.montant}
//           placeholder="Montant"
//           onChange={handleConsultChange}
//           required
//         />
//       </label>

//       <label>
//         Places :
//         <input
//           type="number"
//           name="places"
//           value={consultForm.places}
//           placeholder="Nombre de places"
//           onChange={handleConsultChange}
//           required
//         />
//       </label>

//       <button type="submit">{editingConsultId ? "Modifier" : "Ajouter"}</button>
//     </form>
//   </section>
// )}

//       {/* CONSULTATIONS */}
//       {active === "consultations" && (
//         <section className="section">
//           <h2>Consultations Temporaires</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Médecin</th>
//                 <th>Date & Heure</th>
//                 <th>Montant</th>
//                 <th>Places</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {(consultations || []).map(c => (
//                 <tr key={c.id}>
//                   <td>{getDoctorName(c.doctorId)}</td>
//                   <td>{new Date(c.date).toLocaleString()}</td>
//                   <td>{c.montant} UM</td>
//                   <td>{c.places}</td>
//                   <td>
//                     <button onClick={() => handleReserveClick(c)}>Réserver</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </section>
//       )}

//       {/* RESERVATIONS */}
//       {active === "reservations" && (

//         <div>
//         <section className="section card">
          
//           <h2>{editingResId ? 'ajouter': "Modifier"} Réservation</h2>
//           <form className="form-grid" onSubmit={submitReservation}>
//             <input
//               type="text"
//               name="patient"
//               placeholder="Nom complet"
//               value={reservationForm.patient}
//               onChange={handleReservationChange}
//               required
//             />
//             <input
//               type="text"
//               name="phone"
//               placeholder="Téléphone"
//               value={reservationForm.phone}
//               onChange={handleReservationChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={reservationForm.email}
//               onChange={handleReservationChange}
//               required
//             />
//             <input
//               type="text"
//               name="nni"
//               placeholder="NNI (8 chiffres)"
//               value={reservationForm.nni}
//               onChange={handleReservationChange}
//               required
//             />
//             <select
//             name="doctorId"
//             value={reservationForm.doctorId}
//             onChange={handleReservationChange}
//            required
//            >
//   <option value="">Choisir consultation</option>
//   {(consultations || []).map((c) => (
//     <option key={c.id} value={c.id}>
//       {getDoctorName(c.doctor)} - {c.date_fin} ({c.places} places)
//     </option>
//   ))}
// </select>
//             <input
//               type="number"
//               name="montant"
//               placeholder="Montant"
//               value={reservationForm.montant}
//               onChange={handleReservationChange}
//               required
//             />
//             <button type="submit">{editingResId ? "Ajouter" : "Modifier"}</button>
//           </form>
          
//         </section>
        
// <div className="card-reserv">
//         <h3>Réservations existantes</h3>
//           <div className="cards-grid">
//             {(reservations || []).map((r) => (
//               <div className="card" key={r.id}>
//                 <h3>{r.patient}</h3>
//                 <div>Doctor: {getDoctorName(r.doctorId)}</div>
//                 <div>NNI: {r.nni}</div>
//                 <div>Tel: {r.phone}</div>
//                 <div>Email: {r.email}</div>
//                 <div>Montant: {r.montant} UM</div>
//                 <button className="M" onClick={() => { setReservationForm(r); setEditingResId(r.id); }}>
//                   <Edit size={16}/> Modifier
//                 </button>
//                 <button className="S" onClick={() => deleteReservation(r.id)}>
//   <Trash2 size={16}/> Supprimer
// </button>
//               </div>
//             ))}
//           </div>

//           </div>
// </div>
          

//       )}



//     </div>
//   );

// }


import React, { useState, useEffect } from "react";
import { Hospital, LogOut, Edit, Trash2 } from "lucide-react";
import ReservationForm from "./ReservationForm";
import { API_BASE_URL } from "../api/config";
import "./Secretaire.css";



export default function Secretaire() {
  const [active, setActive] = useState("consultations");
  const [consultations, setConsultations] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [editingConsult, setEditingConsult] = useState(null);
  const [selectedConsult, setSelectedConsult] = useState(null);


  const [consultForm, setConsultForm] = useState({
    doctorId: "",
    date: "",
    heure: "",
    places: "",
    montant: "",
  });

  const [reservationForm, setReservationForm] = useState({
    patient: "",
    phone: "",
    email: "",
    doctorId: "",
    nni: "",
    montant: "",
  });

  /** ====================== FETCH DATA ====================== */
  useEffect(() => {
    fetchDoctors();
    fetchConsultations();
    fetchReservations();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  const fetchDoctors = async () => {
    const res = await fetch(`${API_BASE_URL}/doctors/`, { headers: getAuthHeaders() });
    const data = await res.json();
    setDoctors(Array.isArray(data) ? data : []);
  };

  const fetchConsultations = async () => {
    const res = await fetch(`${API_BASE_URL}/consultations-temporaires/`, { headers: getAuthHeaders() });
    const data = await res.json();
    setConsultations(Array.isArray(data) ? data : []);
  };

  const fetchReservations = async () => {
    const res = await fetch(`${API_BASE_URL}/consultations-payees/`, { headers: getAuthHeaders() });
    const data = await res.json();
    setReservations(Array.isArray(data) ? data : []);
  };

  /** ====================== HANDLE FORMS ====================== */
  const handleConsultChange = (e) => {
    setConsultForm({ ...consultForm, [e.target.name]: e.target.value });
  };

  const handleReservationChange = (e) => {
    setReservationForm({ ...reservationForm, [e.target.name]: e.target.value });
  };

  const resetConsultForm = () => {
    setConsultForm({ doctorId: "", date: "", heure: "", places: "", montant: "" });
    setEditingConsult(null);
  };

  /** ====================== CRUD CONSULTATIONS ====================== */
  const submitConsultation = async (consultForm, editingConsult) => {
  const payload = {
    doctor: consultForm.doctorId,
    date_fin: `${consultForm.date}T${consultForm.heure}`,
    montant: parseInt(consultForm.montant),
    n_places: parseInt(consultForm.places),
  };

  const url = editingConsult 
    ? `${API_BASE_URL}/consultations-temporaires/${editingConsult.id}/` 
    : `${API_BASE_URL}/consultations-temporaires/`;

  const method = editingConsult ? "PUT" : "POST";

  await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(payload) });
  fetchConsultations();
};

  const editConsult = (c) => {
    setEditingConsult(c);
    const heure = new Date(c.date_fin).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    const date = new Date(c.date_fin).toISOString().split("T")[0];
    setConsultForm({
      doctorId: c.doctorId,
      date: date,
      heure: heure,
      places: c.n_places,
      montant: c.montant,
    });
    setActive("form");
  };

  const deleteConsult = async (id) => {
    if (!window.confirm("Supprimer cette consultation ?")) return;
    await fetch(`${API_BASE_URL}/consultations-temporaires/${id}/`, { method: "DELETE", headers: getAuthHeaders() });
    fetchConsultations();
  };

  /** ====================== UTILS ====================== */
  const getDoctorName = (id) => doctors.find((d) => d.id === id)?.name;
  const getDoctorSpecialite = (id) => doctors.find((d) => d.id === id)?.specialite;

  /** ====================== LOGOUT ====================== */
  const handleLogout = async () => {
    if (!window.confirm("Voulez-vous vraiment vous déconnecter ?")) return;
    await fetch(`${API_BASE_URL}/logout/`, { method: "POST", credentials: "include" });
    window.location.href = "/login";
  };




  return (
    <div className="secretaire-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <Hospital size={50} color="#fff" />
          <div>
            <h1>Cabinet Médical</h1>
            <p>Dashboard Secrétaire</p>
          </div>
        </div>
        <nav className="menu">
          <button onClick={() => setActive("form")}>Ajouter / Modifier Consultation</button>
          <button onClick={() => setActive("consultations")}>Consultations</button>
          <button onClick={() => setActive("reservations")}>Réservations</button>
          <button onClick={handleLogout}>Déconnexion</button>
        </nav>
      </header>

      {/* FORMULAIRE CONSULTATION */}
      {active === "form" && (
        <section className="section card">
          <h2>{editingConsult ? "Modifier" : "Ajouter"} Consultation</h2>
          {/* <form className="form-grid" onSubmit={submitConsult}> */}
            <form className="form-grid" onSubmit={(e) => { e.preventDefault(); submitConsultation(consultForm, editingConsult).then(fetchConsultations); resetConsultForm(); setActive("consultations"); }}>
            <label>
              Médecin :
              <select name="doctorId" value={consultForm.doctorId} onChange={handleConsultChange} required>
                <option value="">Choisir médecin</option>
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.specialite})
                  </option>
                ))}
              </select>
            </label>
            <label>
              Date :
              <input type="date" name="date" value={consultForm.date} onChange={handleConsultChange} required />
            </label>
            <label>
              Heure :
              <input type="time" name="heure" value={consultForm.heure} onChange={handleConsultChange} required />
            </label>
            <label>
              Montant :
              <input type="number" name="montant" value={consultForm.montant} onChange={handleConsultChange} required />
            </label>
            <label>
              Places :
              <input type="number" name="places" value={consultForm.places} onChange={handleConsultChange} required />
            </label>
            <button type="submit">{editingConsult ? "Modifier" : "Ajouter"}</button>
          </form>
        </section>
      )}

      {/* TABLEAU CONSULTATIONS TEMPORAIRES */}
      {active === "consultations" && (
        <section className="section card">
          <h2>Consultations Temporaire</h2>
          <table className="reservation-table">
            <thead>
              <tr>
                <th>Médecin</th>
                <th>Date & Heure</th>
                <th>Montant</th>
                <th>Places</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(consultations || []).map((c) => (
                <tr key={c.id}>
                  <td>{getDoctorName(c.doctorId)}</td>
                  <td>{new Date(c.date_fin).toLocaleString()}</td>
                  <td>{c.montant} UM</td>
                  <td>{c.n_places}</td>
                  <td>
                    <button onClick={() => editConsult(c)}>Modifier</button>
                    <button onClick={() => deleteConsult(c.id)}>Supprimer</button>
                    <button onClick={() => setSelectedConsult(c)}>Réserver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {selectedConsult && (
            <ReservationForm
              consultation={{ ...selectedConsult, doctor_name: getDoctorName(selectedConsult.doctorId) }}
              onClose={() => setSelectedConsult(null)}
            />
          )}
        </section>
      )}

      {/* RESERVATIONS */}
      {active === "reservations" && (
  <section className="section card">
    <h2>Réservations</h2>
    <table className="reservation-table">
      <thead>
        <tr>
          <th>Patient</th>
          <th>Doctor</th>
          <th>NNI</th>
          <th>Téléphone</th>
          <th>Email</th>
          <th>Montant</th>
        </tr>
      </thead>
      <tbody>
        {(reservations || []).map((r) => (
          <tr key={r.id}>
            <td>{r.patient}</td>
            <td>{getDoctorName(r.doctorId)}</td>
            <td>{r.nni}</td>
            <td>{r.phone}</td>
            <td>{r.email}</td>
            <td>{r.montant} UM</td>
          </tr>
        ))}
      </tbody>
    </table>
  </section>
)}
    </div>
  );
}