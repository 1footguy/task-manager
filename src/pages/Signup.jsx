import React from "react";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import { signUp } from "../firebase/authentication";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function Signup() {
  const navigate = useNavigate();
  const { handleSubmit, register, reset } = useForm();

  async function newUser(data) {
    const {email, password} = data
    try {
      await signUp(email, password);
      reset();
      navigate("/login");
    } catch (error) {
      alert("Algo deu errado");
      console.error(error);
    }
  }

  return (
    <>
      <Header />
      <main
        style={{ flexGrow: 1, justifyItems: "center", alignContent: "center" }}
      >
        <h1 className="text-white">Cadastre-se</h1>
        <form
          onSubmit={handleSubmit(newUser)}
          style={{ display: "flex", flexDirection: "column", width: "40%" }}
        >

          <label htmlFor="email">Email </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            autoComplete="off"
          />

          <label htmlFor="password">Senha </label>
          <input type="password" id="password" {...register("password")} />

          <Button type="submit" variant="dark" className="mt-2">Criar</Button>
        </form>
      </main>
      <Footer />
    </>
  );
}
