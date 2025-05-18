//Set up Authentication with Spotify API
async function getAccessToken() {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}


//JavaScript - Artist Search
import { getAccessToken } from './auth.js';

async function searchArtist() {
  const artistName = document.getElementById('artistInput').value;
  if (!artistName.trim()) {
    alert('Please enter an artist name.');
    return;
  }

  try {
    const token = await getAccessToken();

    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      alert('Failed to fetch artist data.');
      return;
    }

    const data = await res.json();
    const artist = data.artists.items[0];

    if (!artist) {
      alert('Artist not found.');
      return;
    }

    localStorage.setItem('artistId', artist.id);
    localStorage.setItem('artistName', artist.name);

    window.location.href = 'artist.html';
  } catch (error) {
    console.error(error);
    alert('Something went wrong. Please try again.');
  }
}

window.searchArtist = searchArtist;

