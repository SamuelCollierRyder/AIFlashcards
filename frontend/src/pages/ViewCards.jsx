import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Layout from "../templates/Layout";
import { fetchWithAuth } from "../utils/auth";

export default function ViewCards() {
  const [rowInfo, setRowInfo] = useState([]);
  const navigate = useNavigate();

  async function fetchCards() {
    await fetchWithAuth("http://localhost:5000/get-cards")
      .then((data) => data.json())
      .then((data) => {
        if (data.length === 0) {
          return;
        }
        setRowInfo(data);
      });
  }

  async function deleteCard(id) {
    setRowInfo(rowInfo.filter((row) => row._id.$oid !== id));
    await fetchWithAuth(
      "http://localhost:5000/remove-card",
      { id: id },
      "DELETE",
    );
  }

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <Layout
      authRequired={true}
      content={
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra table-xs">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rowInfo.map((row) => (
                  <tr key={row._id.$oid}>
                    <th></th>
                    <td class="min-w-[35vw] max-w-[35vw]">{row.question}</td>
                    <td class="min-w-[35vw] max-w-[35vw]">{row.answer}</td>
                    <td class="min-w-[20vw] max-w-[20vw]">
                      <button onClick={() => navigate(`/add-cards?question=${row.question}&answer=${row.answer}&id=${row._id.$oid}`)} className="btn btn-warning p-3 m-1">Edit</button>
                      <button
                        onClick={() => deleteCard(row._id.$oid)}
                        className="btn btn-error p-3"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      }
    />
  );
}
