import React, { useEffect, useState } from 'react'

export default function Employes() {
  const [employes, setEmployes] = useState([])
  const [employes2, setEmployes2] = useState([])
  const [id, setId] = useState(1)
  const [matricule, setMatricule] = useState()
  const [nom, setNom] = useState()
  const [ville, setVille] = useState()
  const [codePostal, setCodePostal] = useState()
  const [salaire, setSalaire] = useState()
  const [salaireMax, setSalaireMax] = useState(0)
  const [salaireMin, setSalaireMin] = useState(0)


  const ajouter = () => {
    if (
      matricule.length == 0 || nom.length == 0 || ville.length == 0 ||
      codePostal.length == 0) {
      alert('Vérifier la saisie')
    } else {
      const empl = {
        id: id, matricule: matricule, nom: nom, ville: ville,
        codePostal: codePostal, salaire: salaire
      }
      setEmployes([...employes, empl])
      setId(id + 1)
    }
  }


  const editer = (id) => {
    const empl = employes.find((emp) => emp.id == id)
    setId(empl.id)
    setMatricule(empl.matricule)
    setNom(empl.nom)
    setVille(empl.ville)
    setCodePostal(empl.codePostal)
    setSalaire(empl.salaire)
  }


  const vider = () => {
    setMatricule('')
    setNom('')
    setVille('')
    setCodePostal('')
    setSalaire('')
  }


  const supprimer = (id) => {
    setEmployes(employes.filter(emp => emp.id != id))
  }


  const filtrer = (nom, ville) => {
    setEmployes2(employes.filter(emp => emp.nom == nom && emp.ville == ville))
  }


  const initialiser = () => {
    setEmployes2([])
  }


  const getSalaires = () => {
    setSalaireMax(Math.max(...employes.map(emp => Number(emp.salaire))))
    setSalaireMin(Math.min(...employes.map(emp => Number(emp.salaire))))

  }

  useEffect(() => { getSalaires() })


  return (
    <div>
      <h2>Liste des employés</h2>
      <p>
        {employes.length == 0 ? <p style={{ color: "#FF2625" }}>Liste des employés vide
        </p> : <p>
          <table width="80%" border="1">
            <tr>
              <th>ID</th>
              <th>Matricule</th>
              <th>Nom</th>
              <th>Ville</th>
              <th>Code Postal</th>
              <th>Salaire</th>
              <th>Supprimer</th>
              <th>Editer</th>
            </tr>
            {
              employes.map((emp) =>
                <tr>
                  <td>{emp.id}</td>
                  <td>{emp.matricule}</td>
                  <td>{emp.nom}</td>
                  <td>{emp.ville}</td>
                  <td>{emp.codePostal}</td>
                  <td>{emp.salaire}</td>
                  <td><button type="button" onClick={() => { supprimer(emp.id) }}>Supprimer</button></td>
                  <td><button type="button" onClick={() => { editer(emp.id) }}>Editer</button></td>
                </tr>
              )
            }
          </table>
        </p>
        }
      </p>
      <form>
        <table>
          <tr>
            <td><label>ID</label></td>
            <td><input type='text' value={id} disabled={true} /></td>
          </tr>
          <tr>
            <td><label>Matricule</label></td>
            <td><input type="text" value={matricule}
              onChange={e => { setMatricule(e.target.value) }} /></td>
          </tr>
          <tr>
            <td><label>Nom</label></td>
            <td><input type="text" value={nom}
              onChange={e => { setNom(e.target.value) }} /></td>
          </tr>
          <tr>
            <td><label>Ville</label></td>
            <td><input type="text" value={ville}
              onChange={e => { setVille(e.target.value) }} /></td>
          </tr>
          <tr>
            <td><label>Code Postal</label></td>
            <td><input type="text" value={codePostal}
              onChange={e => { setCodePostal(e.target.value) }} /></td>
          </tr>
          <tr>
            <td><label>Salaire</label></td>
            <td><input type="text" value={salaire}
              onChange={e => { setSalaire(e.target.value) }} /></td>
          </tr>
          <tr>
            <td>
              <button type="button" onClick={ajouter}>Ajouter</button>
              <button type="button"
                onClick={() => { filtrer(nom, ville) }}>Filtrer</button>
              <button type="button" onClick={vider}>Vider</button>
              <button type="button" onClick={initialiser}>Initialiser</button>
            </td>
            <td> </td>

          </tr>
        </table>
      </form>
      <p>
        <ul>
          <li>Le salaire maximal est: {salaireMax}</li>
          <li>Le salaire minimal est: {salaireMin}</li>
        </ul>
      </p>
      <p>
        {employes2.length == 0 ? <p>Tableau de recherche vide</p> :
          <p>
            {employes2.map(emp => <ul>L'employé de l'id {emp.id}
              <li>Matricule: {emp.matricule}</li>
              <li>Nom: {emp.nom}</li>
              <li>Ville: {emp.ville}</li>
              <li>Code Postal: {emp.codePostal}</li>
              <li>Salaire: {emp.salaire}</li>
            </ul>)
            }
          </p>
        }
      </p>
    </div>
  )
}
