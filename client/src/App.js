import Login from './Login';
import Navbar from './Navbar';
import Tabs from './Tabs';
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Tabs />
      <div className="content">
        <Login />
      </div>
    </div>
  );
}

export default App;
