import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AppointList(){
    let [appoints,setAppoints]=useState([]);

    useEffect(()=>{
        getData();
    },[]);

    function getData(){
        axios.get("http://127.0.0.1:8000/bookappointments/").then((res)=>{setAppoints(res.data)}).catch((error)=>{alert(error.message)});

    }

    function approvalRequest(id){
        axios.patch(`http://127.0.0.1:8000/bookappointments/${id}/`, { approved: true }) // 
        .then((res) => {
            setAppoints((prev) =>
                prev.map((a) => (a.id === id ? res.data : a))
            );
        })
        .catch((error) => {
            console.error(error.response?.data || error.message);
            alert(error.message);
        });
    }

    function del(id){
        axios.delete(`http://127.0.0.1:8000/bookappointments/${id}/`).then(()=>{alert("Record Deleted Successfully")
            getData()
        }).catch((error)=>{alert(error.message)});
    }
    

   return (

  <div className="container mt-5">
    <div className="card shadow-lg border-0">
      <div className="card-header bg-dark text-white text-center">
        <h3>Appointment Management</h3>
      </div>

      <div className="card-body p-0">

        {appoints.length > 0 ? (

          <table className="table table-hover text-center mb-0">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {appoints.map((a) => {

                const formattedDate = new Date(a.date)
                  .toLocaleString();

                return (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td className="fw-semibold">{a.name}</td>
                    <td>{a.email}</td>
                    <td>{a.phone}</td>
                    <td>{formattedDate}</td>

                    <td>
                      {a.approved ? (
                        <span className="badge bg-success px-3 py-2">
                          Approved
                        </span>
                      ) : (
                        <span className="badge bg-warning text-dark px-3 py-2">
                          Pending
                        </span>
                      )}
                    </td>

                    <td>
                      {!a.approved && (
                        <button
                          className="btn btn-sm btn-outline-success"
                          onClick={() => approvalRequest(a.id)}
                        >
                          Approve
                        </button>
                      )}
                    </td>
                    <td>
                        <i className="fa fa-trash text-danger" onClick={()=>{del(a.id)}} ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>

        ) : (
          <div className="text-center p-4 text-danger fw-bold">
            No Appointments Found
          </div>
        )}

      </div>
    </div>
  </div>
);
}