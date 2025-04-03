// contenuto.js
function SecretContent() {

  const contenuti = [
    { tipo: 'img', src: '/assets/meme1.jpg', testo: '😂 Meme del giorno!' },
    { tipo: 'img', src: '/assets/funny.gif', testo: '🎬 GIF divertente!' },
    { tipo: 'text', src: '/assets/motivazione.txt', testo: '💡 Frase del giorno!' }
  ];

  // Contenuto casuale ad ogni apertura
  const [contenutoCasuale, setContenutoCasuale] = React.useState(null);

  React.useEffect(() => {
    const contenuto = contenuti[Math.floor(Math.random() * contenuti.length)];
    setContenutoCasuale(contenuto);
  }, []);

  if (!contenutoCasuale) return <p>Caricamento contenuto...</p>;

  return (
    <div className="secret-content">
      <h2>{contenutoCasuale.testo}</h2>

      {contenutoCasuale.tipo === 'img' ? (
        <img src={contenutoCasuale.src} alt="contenuto divertente" className="secret-img"/>
      ) : (
        <MotivationText src={contenutoCasuale.src}/>
      )}

      <button onClick={() => window.location.reload()} className="reload-btn">
        🔄 Altro contenuto!
      </button>
    </div>
  );
}

// Componente per caricare il testo da file esterno
function MotivationText({ src }) {
  const [testo, setTesto] = React.useState("");

  React.useEffect(() => {
    fetch(src)
      .then(res => res.text())
      .then(data => setTesto(data));
  }, [src]);

  return <p className="motivational">{testo}</p>;
}
