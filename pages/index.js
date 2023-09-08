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

      <header>
        <a href="{{site.baseurl}}/"><img src="https://cdn.discordapp.com/attachments/1010780182476496908/1143782132897042502/Screenshot_2023-08-21_at_9.23.54_AM.png" alt="Logo" /></a>
        
        <ul class="downloads">
          <li><a href="{{site.baseurl}}/blogs" ><strong>Blogs</strong></a></li>
          <li><a href="{{site.baseurl}}/labnotebook"><strong>Lab Notebook</strong></a></li>
          <li><a href=""><strong>GitHub</strong></a></li>
        </ul>
        
      </header>

      <main className={styles.main}>
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
