import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

import { MovieCard } from "../../components/MovieCard"

const searchURL = import.meta.env.VITE_SEARCH
const apiKey = import.meta.env.VITE_API_KEY

import '../styles/global-pages.css'

export function Search() {
    const [ searchParams ] = useSearchParams()
    const query = searchParams.get("q")

    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        const searchWithQueryURL = `${searchURL}?${apiKey}&query=${query}`

        async function getSearchedMovies(url) {
            const response = await fetch(url)
            const data = await response.json()

            setMovies(data.results)
        }

        getSearchedMovies(searchWithQueryURL)
    }, [query])


    return (
        <div className="container">
            <h2 className="title">Resultados para <span className="query-text">{query}</span> </h2>
            <div className="movies-container">
                {movies.length === 0 && <p>Carregando...</p>}
                {movies.length > 0 && movies.map(item => <MovieCard key={item.id} movie={item} />)}
            </div>
        </div>
    )
}

/* 
    useSearchParams():   => Hook do react-router-dom
    desestruturamos e pegamos um objeto de dentro dele chamado searchParams que tem uma função chamada 'get', vamos utiliza-la para pegar exatamente o conteúdo de 'q' do parâmetro HTTP que foi passado lá do NavBar, esse valor nada mais é que o valor digitado pelo usuário no input de pesquisa
    
        const [ searchParams ] = useSearchParams()
        const query = searchParams.get("q")

    vamos usar esse parametro, junto com as variáveis de ambiente para gerar uma string HTTP e manda-lo como requisição dentro de um fetch para buscar exatamente os filmes que o usuário pesquisou que tem aquele nome.

    fazemos o fetch dentro do useEffect, encarregado de carregar logo quando carregamos a página. a variável 'query' usada para pegar do parametro http o valor do input ficará sendo observada como gatilho do useEffect, assim que o valor dela mudar, o useEffect será disparado novamente, fazendo uma nova busca na API.

    Assim que a busca é feita através da requisição da api usando fetch, retornamos o response para uma variável e sua data pegando a variável tranformando-a em json. Pegamos essa variável data e armazenamos ela na função de estado 'set' de movies.
    Logo depois esses filmes são printados em tela utilizando o map no retorno do HTML (JSX)
*/