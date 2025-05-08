import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://randomuser.me/api/?results=10") // buscando 10 usuários
      .then((res) => setUsers(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Usuários</h2>
      <ul className="space-y-4">
        {users.map((user, index) => (
          <li
            key={index}
            className="border p-4 rounded hover:shadow transition-all"
          >
            <Link to={`/detalhes/${index}`} className="text-blue-600 hover:underline">
              <div className="flex items-center gap-4">
                <img
                  src={user.picture.thumbnail}
                  alt={user.name.first}
                  className="rounded-full"
                />
                <span>
                  {user.name.first} {user.name.last}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
