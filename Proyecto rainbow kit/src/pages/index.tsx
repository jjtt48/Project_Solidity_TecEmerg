import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useReadContract, useSignMessage, useWaitForTransactionReceipt, useWriteContract, useAccount } from 'wagmi';
import constants from "../../constants.json"
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

const Home: NextPage = () => {
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [selectedVote, setSelectedVote] = useState<string>('');
  const [yesVotes, setYesVotes] = useState<number>(0);
  const [noVotes, setNoVotes] = useState<number>(0);

  // Leer los votos desde el contrato
  const { data: yesVotesData } = useReadContract({
    abi: constants.abi,
    address: constants.address as `0x${string}`,
    functionName: 'yesVotes',
  });

  const { data: noVotesData } = useReadContract({
    abi: constants.abi,
    address: constants.address as `0x${string}`,
    functionName: 'noVotes',
  });

  // Actualizar los valores de votos al cargar la página
  useEffect(() => {
    if (yesVotesData !== undefined) setYesVotes(Number(yesVotesData));
    if (noVotesData !== undefined) setNoVotes(Number(noVotesData));
  }, [yesVotesData, noVotesData]);

  const handleVote = async () => {
    if (!selectedVote) {
      alert("Por favor selecciona una opción de voto.");
      return;
    }

    try {
      // Determinar si el voto es positivo (true) o negativo (false)
      const voteBoolean = selectedVote === "yes";

      // Firmar el mensaje y obtener el hash de la firma
      const signature = await signMessageAsync({ message: `Voto: ${selectedVote}` });
      const signatureHash = ethers.utils.keccak256(signature);

      // Enviar el voto al contrato con el valor booleano y el hash de la firma
      await writeContract({
        address: constants.address as `0x${string}`,
        abi: constants.abi,
        functionName: 'vote',
        args: [voteBoolean, signatureHash],  
      });

      alert("¡Voto enviado exitosamente!");
    } catch (error) {
      console.error("Error al enviar el voto:", error);
      alert("Hubo un error al enviar tu voto. Inténtalo de nuevo.");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <h1>Votación en Blockchain</h1>
        <p>Selecciona una opción para votar:</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          <select
            value={selectedVote}
            onChange={(e) => setSelectedVote(e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>

          <button onClick={handleVote}>
            Enviar Voto
          </button>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <h2>Conteo de Votos</h2>
          <p>Votos a favor (Sí): {yesVotes}</p>
          <p>Votos en contra (No): {noVotes}</p>
        </div>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  );
};

export default Home;
