import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (e) => {
    axios
      .post("https://crud-application-react-js.onrender.com/create", {
        name,
        email,
        age,
      })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <section id="user-crud-create">
      <div className="create-user">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Add User</h2>
          <div className="mb-2">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter the name"
              className="form-control"
              name="name"
              {...register("name", {
                required: "Name is Required",
                validate: (value) => {
                  if (value[0].trim() === value[0].toUpperCase()) {
                    return true;
                  }
                  return "First letter is capital ";
                },
              })}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <div className="text-danger">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="">Email</label>
            <input
              type="email"
              placeholder="Enter the email"
              className="form-control"
              name="email"
              {...register("email", {
                required: "Email is required",
                validate: (value) => {
                  if (!value.includes("@")) {
                    return "must includes in @";
                  }
                  return true;
                },
              })}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-2">
            <label htmlFor="">Age</label>
            <input
              type="number"
              placeholder="Enter age"
              className="form-control"
              name="age"
              {...register("age", {
                required: "age number is required",
              })}
              onChange={(e) => setAge(e.target.value)}
            />
            {errors.age && (
              <div className="text-danger">{errors.age.message}</div>
            )}
          </div>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
    </section>
  );
}
export default CreateUser;
