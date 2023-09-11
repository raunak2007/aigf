import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>AIsha</title>
      </Head>

      <style>
        /* CSS for the navigation bar */
        ul.navbar {
            list-style-type: none;
            margin: 0;
            padding: 0;
            background-color: #333; /* Background color for the navbar */
        }

        ul.navbar li {
            display: inline;
        }

        ul.navbar li a {
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }

        ul.navbar li a:hover {
            background-color: #555; /* Background color on hover */
        }
    </style>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

    <img src="https://cdn.discordapp.com/attachments/923041823562276894/1150632754707451964/Screenshot_2023-09-10_at_8.23.39_PM.png" alt="Logo" width="300" height="100"></img>
      <ul class="navbar">
        <ul><a href="#home">Home</a></ul>
        <ul><a href="#about">About</a></ul>
        <ul><a href="#services">Services</a></ul>
        <ul><a href="#contact">Contact</a></ul>
      </ul>

      <main className={styles.main}>
        <p>Dating in the 21st century is hard. That's why we've created an AI girlfriend – a revolutionary digital companion designed to provide companionship, support, and genuine connection in an increasingly complex world of relationships.</p>
        <h3>Talk to Rachita</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Start Talking"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Talk to your girlfriend" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
