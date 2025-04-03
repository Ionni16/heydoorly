// script.js

// Assicurati di aver incluso lo script di Firebase e di aver inizializzato Firebase
// con la tua configurazione (firebaseConfig) in index.html o in un file separato.

// Esempio:
// <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js"></script>
// <script>
//   const firebaseConfig = { ... };
//   firebase.initializeApp(firebaseConfig);
// </script>

// In questo esempio usiamo le API compat di Firebase v9. 
// Se usi la v8, cambiano leggermente i metodi.

// Firebase Auth: inizializzazione (API compat, v9 o v8)
const auth = firebase.auth();

// Login con popup Google
function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .catch((error) => {
      console.error("Errore login:", error);
    });
}

// Logout
function logout() {
  auth.signOut();
}

// ===========================================
// DEFINIZIONE COMPONENTE PRINCIPALE REACT
// ===========================================
function App() {
  const [user, setUser] = React.useState(null);
  const [hasPaid, setHasPaid] = React.useState(false);
  const [doorOpened, setDoorOpened] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handlePayment = () => {
    setHasPaid(true);
    alert("Pagamento effettuato con successo! Ora puoi aprire la porta.");
  };

  const handleOpenDoor = async () => {
    if (!hasPaid) {
      alert("Devi prima pagare 1€ per aprire la porta!");
      return;
    }
    setDoorOpened(true);

    // Import dinamico per canvas-confetti (potrebbe non funzionare in tutti i contesti)
    // Se hai un bundler (webpack/vite), meglio installare "canvas-confetti" via npm
    // e importarlo direttamente. Qui mostro come esempio "on-the-fly".
    try {
      const module = await import("https://cdn.skypack.dev/canvas-confetti");
      module.default();
    } catch (error) {
      console.error("Errore import confetti:", error);
    }
  };

  return (
    <div className="container">
      {/* Barra di autenticazione */}
      <div className="auth-bar">
        {user ? (
          <div className="welcome">
            <span>👋 Ciao, {user.displayName || "Utente"}!</span>
            <button onClick={logout}>Esci</button>
          </div>
        ) : (
          <button onClick={loginWithGoogle}>Accedi con Google</button>
        )}
      </div>

      {/* Contenuto principale */}
      {!doorOpened ? (
        <div className="door-container">
          <h1 className="title">HeyDoorly</h1>
          <p className="subtitle">
            Scopri cosa c'è dietro la porta per solo 1€!
          </p>
          <img
            src="door.png"
            alt="Porta"
            className={`door ${doorOpened ? "open" : ""}`}
          />
          <div className="buttons">
            <button onClick={handlePayment}>Paga 1€</button>
            <button onClick={handleOpenDoor}>Apri la porta</button>
          </div>
        </div>
      ) : (
        <SecretContent />
      )}
    </div>
  );
}

// ===========================================
// DEFINIZIONE DEL CONTENUTO SEGRETO
// ===========================================
// Se non l'hai già in un file separato, definiscilo qui.
function SecretContent() {
  return (
    <div className="secret-content">
      <h1>Ecco la tua sorpresa!</h1>
      <p>
        Hai aperto la porta e puoi vedere questo contenuto segreto (e usare
        canvas-confetti)!
      </p>
    </div>
  );
}

// ===========================================
// MONTAGGIO FINALE DI REACT
// ===========================================
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
