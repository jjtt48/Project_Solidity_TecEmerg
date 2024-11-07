# Project_Solidity_TecEmerg
## Descripción del Proyecto

Este proyecto implementa un sistema de votación en blockchain en el cual los usuarios pueden votar "Sí" o "No" sobre una propuesta. Cada voto debe estar firmado con la wallet del usuario para garantizar su autenticidad y evitar duplicaciones. El sistema utiliza un contrato inteligente desarrollado en Solidity para gestionar los votos y un frontend en Next.js o React para la interacción del usuario.

## Objetivo

Crear un sistema de votación autenticada en la blockchain, permitiendo a cada usuario emitir un solo voto firmado y registrando este en la blockchain, asegurando la autenticidad y la trazabilidad de cada voto.

## Características

1. **Voto Autenticado**: Los usuarios pueden emitir un voto único ("Sí" o "No") firmando un JSON con su elección. Luego, envían el hash de la firma al contrato para autenticar su voto.
2. **Registro Único**: El contrato verifica que cada dirección vote solo una vez.
3. **Trazabilidad del Voto**: Cada voto se relaciona con un hash único de la firma del usuario, permitiendo la autenticación sin almacenar el mensaje completo en la blockchain.

## Instrucciones de Implementación

### Backend (Smart Contract)

El contrato inteligente desarrollado en Solidity incluye:

- **Función `vote(bool _vote, bytes32 _signatureHash)`**: Recibe el voto y el hash de la firma generada por el usuario.
- **Mappings**:
  - `hasVoted`: Registro de si un usuario ya ha votado, para evitar duplicaciones.
  - `voteSignatureHash`: Almacena el hash de la firma de cada usuario para verificar su autenticidad.
- **Variables de Conteo**: Contadores para el total de votos por "Sí" y "No".

### Frontend

El frontend guía al usuario a través del proceso de votación:

1. **Creación de JSON**: El usuario genera un JSON con su elección (por ejemplo: `{ "vote": "yes" }`).
2. **Firma del JSON**: Utiliza `signMessage` desde su wallet para firmar el JSON.
3. **Envío del Hash de la Firma**: El frontend envía el hash generado junto con el voto al contrato.

El frontend también muestra en tiempo real el conteo de votos.

### Flujo del Usuario

1. Elige "Sí" o "No" en el frontend.
2. Se genera el JSON con la elección.
3. Firma el JSON utilizando la wallet.
4. El hash de la firma es enviado al contrato al llamar la función `vote`.
5. El contrato almacena el voto y el hash de la firma.
6. El frontend actualiza el conteo de votos en tiempo real.

## Requisitos

- **Contratos en Solidity**: Desplegados en una red de pruebas como Avalanche Fuji.
- **Frontend**: Aplicación en Next.js o React conectada al contrato.
- **Firma de Votos**: Los usuarios deben firmar sus votos con su wallet, registrándose el hash de la firma en el contrato para autenticación.


