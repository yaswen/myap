import React from 'react';

/**
 * 用于显示一个音乐的艺术家或艺术家们。如果有多个艺术家，用/隔开
 * @param artists
 * @param fontColor
 * @returns {Array}
 * @constructor
 */
export default function Artists ({ artists, fontColor }) {
  const newArtists = [];
  const n = artists.length;
  for (let i = 0; i < n; i++) {
    let artist = artists[i];
    newArtists.push(
      <a
        key={artist.link}
        href={artist.link}
        target="_blank"
        title={artist.name}
        style={{ color: fontColor }}
      >
        {artist.name}
      </a>
    );
    if (i < n - 1) {
      newArtists.push(' / ');
    }
  }
  return newArtists;
};
