// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VotingSystem {
    // Mappings para rastrear si un usuario ha votado y almacenar el hash de su firma
    mapping(address => bool) public hasVoted;
    mapping(address => bytes32) public voteSignatureHash;

    // Variables para contabilizar los votos 
    uint256 public yesVotes;
    uint256 public noVotes;

    // Evento para registrar cuando se emite un voto
    event VoteCast(address indexed voter, bool vote, bytes32 signatureHash);

    // Función para votar
    function vote(bool _vote, bytes32 _signatureHash) external {
        require(!hasVoted[msg.sender], "Ya has votado");
        hasVoted[msg.sender] = true;
        voteSignatureHash[msg.sender] = _signatureHash;

        
        if (_vote) {
            yesVotes++;
        } else {
            noVotes++;
        }

        // Emitir el evento con la dirección del votante, el voto y el hash de la firma
        emit VoteCast(msg.sender, _vote, _signatureHash);
    }
}

