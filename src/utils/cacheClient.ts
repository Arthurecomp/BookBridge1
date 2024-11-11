import NodeCache from "node-cache";

// Criação de uma instância do cache com tempo de expiração de 1 hora (3600 segundos)
const cache = new NodeCache({ stdTTL: 3600, checkperiod: 600 }); // stdTTL: tempo de expiração, checkperiod: intervalo para checar expiração

export default cache;
