import Navbar from './Navbar';
import Tabs from './Tabs';
import Content from './content/Content';
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Tabs />
      <Content />
    </div>
  );
}

export default App;
