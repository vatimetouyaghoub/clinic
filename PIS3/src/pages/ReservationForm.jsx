// import React, { useState } from "react";
// import "./ReservationForm.css";

// function ReservationForm({ consultation, onClose }) {
//   const [formData, setFormData] = useState({
//     nom_complet: "",
//     email: "",
//     numero_tel: "",
//     NNI: null,
//     montant: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "image") {
//       setFormData({ ...formData, image: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Préparer les données pour l'envoi à Django
//     const dataToSend = new FormData();
//     dataToSend.append("nom", formData.nom_complet);
//     dataToSend.append("email", formData.email);
//     dataToSend.append("phone", formData.numero_tel);
//     dataToSend.append("nni", formData.NNI);
//     dataToSend.append("montant", formData.montant);
//     dataToSend.append("consultation_id", consultationTemp.id); // <-- ID de la consultation temporaire
//     dataToSend.append("date", new Date().toISOString());

//     // Exemple de POST vers Django (à adapter selon ton endpoint)
//     fetch("http://127.0.0.1:8000/api/rservations/", {
//       method: "POST",
//       body: dataToSend,
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Réservation enregistrée :", data);
//         alert("Réservation réussie !");
//         onClose();
//       })
//       .catch((err) => {
//         console.error("Erreur lors de la réservation :", err);
//         alert("Erreur lors de la réservation !");
//       });
//   };

//   return (
//     <div className="modal-overlay">
//       <div className="modal">
//         <h2>Réserver une consultation avec {consultation.doctor}</h2>
//         <form onSubmit={handleSubmit}>
//           <label>
//             nom_complet:
//             <input type="text" name="nom_complet:" value={formData.nom} onChange={handleChange} required />
//           </label>
//           <label>
//             Email:
//             <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//           </label>
//           <label className="form-label" >
//             NNI :
//             <input type="number" name="crd" onChange={handleChange} required />
//           </label>
//           <label>
//             Téléphone:
//             <input type="tel" name="numero_tel" value={formData.phone} onChange={handleChange} required />
//           </label>
//           <label>
//             montant:
//             <input type="number" name="montant"  onChange={handleChange} required />
//           </label>

//           <div className="buttons">
//             <button type="submit">Réserver</button>
//             <button type="button" onClick={onClose}>Annuler</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ReservationForm;


import React, { useState } from "react";
import { apiUrl } from "../api/config";
import "./ReservationForm.css";

function ReservationForm({ consultation, onClose }) {
  const [formData, setFormData] = useState({
    nom_complet: "",
    numero_tel: "",
    NNI: "",
    montant: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nom_complet || !formData.numero_tel || !formData.NNI || !formData.montant) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    // Préparer les données pour le backend
    const dataToSend = {
      nomComplet_patient: formData.nom_complet,
      numero_tel_patient: formData.numero_tel,
      NNI: formData.NNI,
      montant: parseFloat(formData.montant),
      consultation_id: consultation.id,
    };

    try {
      const response = await fetch(apiUrl("reservations/"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur serveur");
      }

      alert("Réservation réussie !");
      onClose();
    } catch (err) {
      console.error("Erreur lors de la réservation :", err);
      alert("Erreur lors de la réservation : " + err.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Réserver une consultation avec {consultation.doctor_name}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nom complet:
            <input
              type="text"
              name="nom_complet"
              value={formData.nom_complet}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Téléphone:
            <input
              type="tel"
              name="numero_tel"
              value={formData.numero_tel}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            NNI:
            <input
              type="text"
              name="NNI"
              value={formData.NNI}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Montant:
            <input
              type="number"
              name="montant"
              value={formData.montant}
              onChange={handleChange}
              required
            />
          </label>

          <div className="buttons">
            <button type="submit">Réserver</button>
            <button type="button" onClick={onClose}>Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservationForm;
