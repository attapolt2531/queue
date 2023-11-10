import React, { useState } from 'react';
import googleTTS from 'google-translate-tts';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSpeak = async () => {
    try {
      if (text.trim() === '') {
        alert('Please enter text to speak.');
        return;
      }

      const url = await googleTTS.getAudioUrl(text, {
        lang: language,
        slow: false,
        host: 'https://translate.google.com',
      });

      const audio = new Audio(url);
      audio.play();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <textarea
        rows="4"
        cols="50"
        value={text}
        onChange={handleTextChange}
        placeholder="Enter text to speak..."
      ></textarea>

      <select value={language} onChange={handleLanguageChange}>
        <option value="en">English</option>
        <option value="th">Thai</option>
        {/* Add more languages as needed */}
      </select>

      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
