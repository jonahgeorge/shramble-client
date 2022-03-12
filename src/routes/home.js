import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import '../style/Home.css';

export default function Home() {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [owner, setOwner] = useState(false)

  const navigate = useNavigate();

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleCodeChange(e) {
    setRoomCode(e.target.value)
  }

  function handleCreateRoom(e) {
    fetch("http://localhost:4000/room", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        room: {
          player_name: name
        }
      })
    }).then((res) => res.json())
      .then(data => {
        setOwner(data['owner'])
        setRedirect(true)

        sessionStorage.setItem('shrambleToken', data['token'])
      })
      .catch((error) => console.log(error))
  }

  function handleJoinRoom(e) {
    fetch("http://localhost:4000/join", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken')
      },
      body: JSON.stringify({
        room: {
          player_name: name,
          room_code: roomCode
        }
      })
    }).then((res) => res.json())
      .then(data => {
        setOwner(data['owner'])
        setRedirect(true)

        if ('token' in data) {
          sessionStorage.setItem('shrambleToken', data['token'])
        }
      })
      .catch((error) => console.log(error))
  }

  if (redirect) {
    navigate('/match', { state: { owner: owner }})
  }

  return (
    <div className="Home body">
      <div className='row'>
        <div>
          <input type="text" className="input-text" placeholder='Who are you' value={name} onChange={handleNameChange} />
        </div>
        <div className='row'>
          <input type="text" className="input-text" placeholder='Enter room code' value={roomCode} onChange={handleCodeChange} />
          <button className='button-small' onClick={handleJoinRoom}>+</button>
        </div>
        <div className='row'>
          <button className="button-wide" onClick={handleCreateRoom}>Create new room</button>
        </div>
      </div>
    </div>
  );
}