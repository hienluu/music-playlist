import React from 'react'

interface Song {
  title: string;
  artist: string;
}

interface PlaylistDisplayProps {
  playlist: Song[]
}

const PlaylistDisplay: React.FC<PlaylistDisplayProps> = ({ playlist }) => {
  if (!Array.isArray(playlist) || playlist.length === 0) return null

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-3 text-indigo-700">Your Playlist</h2>
      <ul className="space-y-2">
        {playlist.map((song, index) => (
          <li key={index} className="bg-indigo-100 p-2 rounded-md text-indigo-800">
            <span className="font-medium">{song.title}</span> by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PlaylistDisplay