async function searchArtist() {
  const artistName = document.getElementById('artistInput').value; // Get the artist name from the input field
  
  try {
    const token = await getAccessToken();  // Get the access token using your function

    const res = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is successful
    if (!res.ok) {
      throw new Error('Failed to fetch data from Spotify');
    }

    const data = await res.json();  // Convert the response to JSON

    // Check if the search returned any artists
    if (data.artists.items.length > 0) {
      const artist = data.artists.items[0];  // Get the first artist from the search results
      localStorage.setItem('artistId', artist.id);  // Save the artist ID to localStorage
      localStorage.setItem('artistName', artist.name);  // Save the artist name to localStorage
      window.location.href = 'artist.html';  // Redirect to the artist page
    } else {
      alert('No artist found. Please try a different search.');
    }

  } catch (error) {
    console.error('Error searching artist:', error);
    alert('There was an error. Please try again later.');
  }
}

window.searchArtist = searchArtist;

