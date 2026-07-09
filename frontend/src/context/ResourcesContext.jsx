import { createContext, useState, useEffect } from "react";
import { API_URL } from "../config/api";

const ResourcesContext = createContext();

export function ResourcesProvider({ children }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/resources`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((data) => { setResources(data); setLoading(false); })
      .catch((err) => { console.log(err); setLoading(false); });
  }, []);

  const addResource = async (formData) => {
    try {
      const res = await fetch(`${API_URL}/resources/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      const newResource = { id: data.id, ...formData, created_at: new Date().toISOString() };
      setResources((prev) => [newResource, ...prev]);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const deleteResource = async (id) => {
    try {
      await fetch(`${API_URL}/resources/${id}`, {
        method: "DELETE",
        headers: { Authorization: localStorage.getItem("token") },
      });
      setResources((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ResourcesContext.Provider value={{ resources, loading, addResource, deleteResource }}>
      {children}
    </ResourcesContext.Provider>
  );
}

export default ResourcesContext;