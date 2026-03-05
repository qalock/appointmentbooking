import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AddAppoint() {

    const [appoint, setappoint] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
    });

    const [message, setMessage] = useState("");
    const [appointmentId, setAppointmentId] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [approved, setApproved] = useState(false);

    function updateInput(e) {
        setappoint({
            ...appoint,
            [e.target.name]: e.target.value,
        });
    }

    function safe(e) {
        e.preventDefault();

        const formattedData = {
            ...appoint,
            date: new Date(appoint.date).toISOString(),
        };

        axios.post("http://127.0.0.1:8000/bookappointments/", formattedData)
            .then((res) => {
                setAppointmentId(res.data.id);
                setMessage("Appointment request sent. Waiting for confirmation...");
                setSubmitted(true);
            })
            .catch((error) => {
                console.log("ERROR:", error.response?.data || error.message);
                alert("Something went wrong. Check console.");
            });
    }

    // 🔥 Poll for approval
    useEffect(() => {
        if (!appointmentId) return;

        const interval = setInterval(() => {
            axios.get(`http://127.0.0.1:8000/bookappointments/${appointmentId}/`)
                .then((res) => {
                    if (res.data.approved) {
                        setApproved(true);
                        setMessage("🎉 Your appointment has been approved. Congratulations!");
                        clearInterval(interval);
                    }
                })
                .catch((err) => console.log(err.message));
        }, 3000);

        return () => clearInterval(interval);

    }, [appointmentId]);

    return (
        <section className="vh-100 d-flex align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7">

                        <div className="card shadow-lg border-0">

                            {/* 🔥 Header disappears after submit */}
                            {!submitted && (
                                <div className="card-header bg-info text-white text-center slide-up">
                                    <h2>Book Your Appointment</h2>
                                </div>
                            )}

                            <div className="card-body text-center">

                                {submitted ? (

                                    <div className="fade-in">

                                        <h4 className="mb-3 text-success">
                                            {message}
                                        </h4>

                                        {/* ⏳ Show spinner only while waiting */}
                                        {!approved && (
                                            <div className="spinner-border text-info mt-3" role="status"></div>
                                        )}

                                        {/* ✅ Show success icon after approval */}
                                        {approved && (
                                            <div className="display-1 text-success mt-3">
                                                ✔
                                            </div>
                                        )}

                                    </div>

                                ) : (

                                    <form onSubmit={safe} className="slide-up">

                                        <input
                                            type="text"
                                            name="name"
                                            value={appoint.name}
                                            onChange={updateInput}
                                            placeholder="Enter Your Name"
                                            className="form-control mb-3"
                                            required
                                        />

                                        <input
                                            type="email"
                                            name="email"
                                            value={appoint.email}
                                            onChange={updateInput}
                                            placeholder="Enter Your Email"
                                            className="form-control mb-3"
                                            required
                                        />

                                        <input
                                            type="text"
                                            name="phone"
                                            value={appoint.phone}
                                            onChange={updateInput}
                                            placeholder="Enter Your Phone Number"
                                            className="form-control mb-3"
                                            required
                                        />

                                        <input
                                            type="datetime-local"
                                            name="date"
                                            value={appoint.date}
                                            onChange={updateInput}
                                            className="form-control mb-3"
                                            required
                                        />

                                        <button className="btn btn-info w-100">
                                            Book Appointment
                                        </button>

                                    </form>

                                )}

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}