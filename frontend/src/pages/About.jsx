import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

function About() {
  const [from_name, setFromName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [is_sending, setIsSending] = useState(false);

  const sendEmail = async (e) => {
    setIsSending(true);

    e.preventDefault();

    emailjs
      .sendForm("service_8pchbdl", "template_pc2a2pk", e.target, {
        publicKey: "eBwRXr74Pd6_6l7ws",
      })
      .then(
        (result) => {
          console.log(result);
          toast.success("Ton message a été envoyé", {
            position: "top-center",
            autoClose: 4000, // Auto-closes after 3 seconds
            // ... other options
          });
          setIsSending(false);
          setMessage("");
          setFromName("");
          setEmail("");
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center m-2">
      <h1>À propos</h1>
      <p>
        Oyenga est ton carnet de chants catholique. Avec lui, tu as plus de{" "}
        <strong>500 chants</strong> dans ta poche.
      </p>
      Nous nous sommes inspirés du livret physique des chants de l'Association
      Coeur d'amour de Jésus, qui lui même s'inspire du Jubilé catholique.
      <p>
        Si tu as un message,des rémarques ou suggestions, fais nous les parvenir
        ici:
      </p>
      <form onSubmit={sendEmail}>
        <input
          type="text"
          placeholder="nom"
          name="from_name"
          value={from_name}
          onChange={(e) => setFromName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <textarea
          placeholder="message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <button
          type="submit"
          disabled={is_sending}
          className="w-100"
        >
          {is_sending ? (
            <RotatingLines
              width={20}
              strokeColor="white"
              ariaLabel="loading"
              strokeWidth="5"
              animationDuration="0.75"
            />
          ) : (
            "Envoyer"
          )}
        </button>
      </form>
    </div>
  );
}

export default About;
