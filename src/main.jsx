import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

// StrictMode intentionally omitted: its dev-only double-invoke remounts the
// WebGL context and re-inits react-pageflip, which both dislike being torn
// down and rebuilt mid-frame. Production behaviour is unaffected.
createRoot(document.getElementById('root')).render(<App />)
