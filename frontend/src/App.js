import React, { useState, useEffect } from "react";
import api from './services/api'

import "./App.css";

import Header from "./components/Header";

export default function App({ title }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject() {
    //setProjects([...projects, `Novo projeto ${Date.now()}`]);

    //faz uma requisição post para criar um novo projeto e armazena no backend
    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: "Christian Martins"
    })

    // a constante project recebe o novo projeto criado
    const project = response.data

    //copia todos os itens do array e adiciona um novo item
    setProjects([...projects, project]) 

  }

  return (
    <>
      <Header title="Projects" />

      <button type="button" onClick={handleAddProject}>
        Adicionar Projeto
      </button>

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
    </>
  );
}
