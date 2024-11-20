import Header from "../components/Header";
import Layout from "../templates/Layout";

export default function ViewCards() {
  return (
    <Layout
      authRequired="true"
      content={
        <>
          <div className="overflow-x-auto">
            <table className="table table-zebra table-xs">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>Question</th>
                  <th>Answer</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Blue</td>
                  <td>
                    <button className="btn btn-warning p-3 m-1">Edit</button>
                    <button className="btn btn-error p-3">Delete</button>
                  </td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                  <td>
                    <button className="btn btn-warning p-3 m-1">Edit</button>
                    <button className="btn btn-error p-3">Delete</button>
                  </td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                  <td>
                    <button className="btn btn-warning p-3 m-1">Edit</button>
                    <button className="btn btn-error p-3">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      }
    />
  );
}
