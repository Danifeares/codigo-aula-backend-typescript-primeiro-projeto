import { Router } from "express" // Router é uma propriedade do express, para criação de rotas
import {
    atualizarCarros,
    cadastrarCarros,
    detalharCarros,
    excluirCarros,
    listarCarros
} from './controladores/carros'

const rotas = Router() // ao invés de instanciar o express(), instancio o Router(), que é uma propriedade do express

rotas.get('/carros', listarCarros)
rotas.get('/carros/:id', detalharCarros)
rotas.post('/carros', cadastrarCarros)
rotas.put('/carros/:id', atualizarCarros)
rotas.delete('/carros/:id', excluirCarros)

export default rotas