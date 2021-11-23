import Navbar from './nav/Navbar';
import Tabs from './Tabs';
import Content from './content/Content';
import Transfer from './dialog/Transfer';
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Tabs />
      <Content />
      <Transfer />
    </div>
  );
}

export default App;
