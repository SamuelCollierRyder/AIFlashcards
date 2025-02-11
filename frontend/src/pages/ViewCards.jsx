import React, { useState, useEffect } from "react";
import Layout from "../templates/Layout";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";

export default function ViewCards() {
  const [rowInfo, setRowInfo] = useState([]);
  const navigate = useNavigate();

  async function fetchCards() {
    await fetchWithAuth("/cards/get-all")
      .then((data) => data.json())
      .then((data) => {
        if (data.length != 0) {
          setRowInfo(data);
        }
      });
  }

  async function deleteCard(id) {
    setRowInfo(rowInfo.filter((row) => row.id !== id));
    await fetchWithAuth(
      "/cards/delete",
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
                  <th>Next review</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rowInfo.map((row) => (
                  <tr key={row.id}>
                    <th></th>
                    <td className="min-w-[25vw] max-w-[25vw]">
                      {row.question}
                    </td>
                    <td className="min-w-[25vw] max-w-[25vw]">{row.answer}</td>
                    <td className="min-w-[25vw] max-w-[25vw]">
                      {new Date(row.timeStamp).toDateString()}
                    </td>
                    <td className="min-w-[22vw] max-w-[22vw]">
                      <button
                        onClick={() =>
                          navigate(
                            `/add-cards?question=${row.question}&answer=${row.answer}&id=${row.id}`,
                          )
                        }
                        className="btn btn-warning p-3 m-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCard(row.id)}
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
