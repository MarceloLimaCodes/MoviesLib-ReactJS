import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 

import { App } from './App'
import { Home } from './pages/Home'
import { Movie } from './pages/Movie'
import { Search } from './pages/Search'

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route element={<App />} >
                <Route path='/' element={<Home />} />
                <Route path='movie/:id' element={<Movie />} />
                <Route path='search' element={<Search />} />
            </Route>
        </Routes>
    </BrowserRouter>
</React.StrictMode>
)

// para importar com mais facildiade, insira primeiro o componente '<Home />' depois é só dar um (ctrl + espaço) nele que a primeira opção é a importação automática, isso serve pra qualquer componente