export const CONTACT = {
  whatsappDisplay: "(41) 98427-8783",
  whatsappNumber: "5541984278783",
  email: "contato@deki.com.br",
  address: "R. Emb. José Carlos de Macedo Soares, 379 — Xaxim, Curitiba/PR, 81810-260",
  instagram: "https://instagram.com/dekimoveis",
  facebook: "https://facebook.com/dekimoveis",
  youtube: "https://youtube.com/@dekimoveisclinicos3401",
  linktree: "https://linktr.ee/dekimoveisclinicos",
  mercadoLivre: "https://linktr.ee/dekimoveisclinicos",
};

export const WHATSAPP_URL = (product?: string) => {
  const msg = product
    ? `Olá! Tenho interesse no ${product}. Pode me passar mais informações?`
    : "Olá! Gostaria de saber mais sobre os móveis DEKI.";
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(msg)}`;
};
