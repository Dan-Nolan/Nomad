import StoreProvider from './Store';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

ReactDOM.render(
    <StoreProvider>
        <App />
    </StoreProvider>,
    document.getElementById('root')
);