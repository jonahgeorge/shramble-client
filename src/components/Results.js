import React, { useEffect, useState } from 'react';

import { makeGetRequest } from '../hooks/makeRequest';
import Button from '../components/common/Button.tsx'

export default function Results({ owner, changeStage }) {
  const [standings, setStandings] = useState([{ name: '', winnings: 0.0 }])

  useEffect(async () => {
    const response = await makeGetRequest("/standings")

    if (response.ok) {
      setStandings(response.data['standings']);
    } else {
      // TODO handle error
    }
  }, [])

  function handleNewMatch(e) {
    console.log('todo');
  }

  return (
    <div className='Results'>
      <div className='Ongoing form'>
        <h1>Standings</h1>
        <div className='standings'>
          <table>
            <thead>
              <tr>
                <td>Player</td>
                <td>Winnings</td>
              </tr>
            </thead>
            <tbody>
              {standings.map((x, i) => {
                return (
                  <tr key={i}>
                    <td>{x.name}</td>
                    <td>{x.winnings}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {owner &&
          <div className='row'>
            <Button 
              text="End Match"
              className='wide primary'
              onClick={handleNewMatch}
            />
          </div>
        }
      </div>
    </div>
  )
}
