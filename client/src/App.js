import Login from './Login';
import Navbar from './Navbar';
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <Login />
      </div>
    </div>
  );
}

export default App;
