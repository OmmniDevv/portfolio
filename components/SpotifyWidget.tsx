"use client";
import { useState } from "react";

const SVG_URL =
  "https://spotify-github-profile.kittinanx.com/api/view?uid=31sm4cskejxqpe3x6qoraaq6mqbq&cover_image=true&theme=default&show_offline=false&background_color=0d1b2a&interchange=true&bar_color_cover=false";

const REDIRECT_URL =
  "https://open.spotify.com/user/31sm4cskejxqpe3x6qoraaq6mqbq";

export default function SpotifyWidget() {
  const [expanded, setExpanded] = useState(false);

  return (
    <a
      href={REDIRECT_URL}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      aria-label="Spotify Now Playing"
      className="fixed bottom-6 left-6 z-50 block rounded-xl overflow-hidden border border-gold/30 transition-all duration-300"
      style={{
        width: expanded ? "300px" : "52px",
        height: expanded ? "auto" : "52px",
        boxShadow: "0 0 20px rgba(200,169,110,0.15)",
        background: "#0d1b2a",
      }}
    >
      {expanded ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={`${SVG_URL}&t=${Math.floor(Date.now() / 30000)}`}
          alt="Spotify Now Playing"
          className="w-full"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="#1DB954" className="w-6 h-6">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
        </div>
      )}
    </a>
  );
}
