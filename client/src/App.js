import {Routes, Route} from 'react-router-dom'
import Users from './User';
import UserCreate from './UserCreate';
import SignIn from './signIn';
import Print from './print';
import Signup from './signup';
import AudioPlayer from './audioPlayer'




function App() {
  return (
<div>
  <Routes>
    <Route path='/' element={<Users />} />
    <Route path='create' element={<UserCreate />} />
    <Route path='signin' element={<SignIn />} />
    <Route path='print/:vn' element={<Print />} />
    <Route path='signup' element={<Signup />} />
    {/* <Route path='TextToSpeech' element={<TextToSpeech />} /> */}
    <Route path='monitor' element={<AudioPlayer />} />
  </Routes>
</div>
  );
}

export default App;
