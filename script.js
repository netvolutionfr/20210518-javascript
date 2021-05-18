console.log("script lancé");

const zoneSaisie = document.getElementById("saisie");
const zoneLongueur = document.getElementById("longueur");
const zoneBouton = document.getElementById("bouton");
const zoneSha256 = document.getElementById("sha256");

zoneSaisie.addEventListener('input', async (e) => {
    const texteSaisi = e.target.value;
    zoneLongueur.innerText = texteSaisi.length;

    zoneSha256.innerText = await digestMessage(texteSaisi);

    if (texteSaisi.length < 8) {
        zoneLongueur.classList.remove("vert");
        zoneLongueur.classList.add("rouge");
        zoneBouton.disabled = true;
    } else {
        zoneLongueur.classList.remove("rouge");
        zoneLongueur.classList.add("vert");
        zoneBouton.disabled = false;
    }
});

async function digestMessage(message) {
    const msgUint8 = new TextEncoder().encode(message);                           // encode comme (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // fait le condensé
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convertit le buffer en tableau d'octet
     // convertit le tableau en chaîne hexadélimale
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
