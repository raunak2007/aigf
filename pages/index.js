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

<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></link>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

 
<div class="container">
<nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark nav-text">
  <div class="container">


    <a class="navbar-brand" href="https://2022.igem.wiki/dnhs-sandiego-ca/index.html">
      <img src="https://static.igem.wiki/teams/4386/wiki/nav-bar-logo.png" alt="DNHS iGEM" width="170" height="30" class="d-inline-block align-text-top"></img>
    </a>


    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto left-aligned">


        <li class="nav-item">
          <a class="nav-link" href="{{ url_for('index') }}">Home</a>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Project
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="{{ url_for('pages', page='background') }}">Background</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='description') }}">Description</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='design') }}">Design</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='model') }}">Modeling</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='implementation') }}">Implementation</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='safety') }}">Safety</a></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Engineering Success
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="{{ url_for('pages', page='protocols') }}">Protocols</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='parts') }}">Parts</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='future-directions') }}">Future Directions</a></li>
          </ul>
        </li>


        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Human Practices
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="{{ url_for('pages', page='human-practices') }}">Human Practices</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='survey') }}">Survey</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='education') }}">Education</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='communication') }}">Science Communication</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='contribution') }}">Contribution</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='collaborations') }}">Collaboration</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='partnership') }}">Partnership</a></li>
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Team
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a class="dropdown-item" href="{{ url_for('pages', page='team') }}">Team</a></li>
            <li><a class="dropdown-item" href="{{ url_for('pages', page='attributions') }}">Attributions</a></li>
          </ul>
        </li>

      </ul>
    </div>
  </div>
</nav>

</div>

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
