"use client";

import { useState } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}
function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      setUsers(data.users);
      console.log(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchUsers}
        className="bg-gray-800 text-white px-4 py-2 rounded text-sm cursor-pointer"
      >
        {loading ? "Loading..." : "Fetch Users"}
      </button>

      {users.length > 0 && (
        <ol className="mt-10 list-decimal pl-6">
          {users.map((user) => (
            <li
              key={user.id}
              className="my-2 bg-[#f2f2f2] w-[300px] rounded p-2"
            >
              👤 {user.firstName} {user.lastName}
              <br />
              <span className="text-xs text-gray-600">📧 {user.email}</span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Users;
