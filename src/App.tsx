import React, { useState } from 'react'
import { Music, Sun } from 'lucide-react'
import MoodSlider from './components/MoodSlider'
import PlaylistDisplay from './components/PlaylistDisplay'

interface Song {
  title: string;
  artist: string;
}

function App() {
  const [energy, setEnergy] = useState(50)
  const [happiness, setHappiness] = useState(50)
  const [playlist, setPlaylist] = useState<Song[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generatePlaylist = async () => {
    setIsLoading(true)
    setError(null)
    
    const prompt = `Come up with 5 song titles with artist names for mood with ${happiness}% happiness and ${energy}% energy. The output should be a list of songs in json format.`
    
    // Log the prompt to the console
    console.log('Prompt being sent to Groq:', prompt)
    
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "mixtral-8x7b-32768",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 500
        })
      })

  

      if (!response.ok) {
        throw new Error('Failed to generate playlist')
      }

      const data = await response.json()
      console.log('Response from Groq:', data.choices[0].message.content)
      const generatedPlaylist = JSON.parse(data.choices[0].message.content)
      
      // Ensure generatedPlaylist is an array before setting it
      if (Array.isArray(generatedPlaylist)) {
        setPlaylist(generatedPlaylist)
      } else {
        throw new Error('Invalid playlist format received')
      }
    } catch (err) {
      setError('Failed to generate playlist. Please try again.')
      console.error('Error generating playlist:', err)
      setPlaylist([]) // Reset playlist to empty array on error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">Mood Playlist Generator</h1>
        <MoodSlider
          icon={<Sun className="text-yellow-500" />}
          label="Happiness"
          value={happiness}
          onChange={setHappiness}
        />
        <MoodSlider
          icon={<Music className="text-green-500" />}
          label="Energy"
          value={energy}
          onChange={setEnergy}
        />
        <button
          onClick={generatePlaylist}
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 mt-6 disabled:bg-indigo-400"
        >
          {isLoading ? 'Generating...' : 'Generate Playlist'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <PlaylistDisplay playlist={playlist} />
      </div>
    </div>
  )
}

export default App