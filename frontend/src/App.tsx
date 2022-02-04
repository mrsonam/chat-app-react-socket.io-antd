import './App.css';
import 'antd/dist/antd.css'
import Home from './pages/Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ChatRoom from './pages/ChatRoom/ChatRoom';

function App() {

	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/chat-room/:username" element={<ChatRoom />} />
			</Routes>
		</Router>

	);
}

export default App;
