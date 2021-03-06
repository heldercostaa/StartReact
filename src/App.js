import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((res) => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post("repositories", {
      title: "NoteIt",
      url: "http://github.com/heldercostaa/NoteIt",
      techs: ["Node", "Express", "Jest"],
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const res = await api.delete(`repositories/${id}`);

    if (res.status === 204) {
      setRepositories(repositories.filter((repo) => repo.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Add repository</button>
    </div>
  );
}

export default App;
