import { Request, Response } from 'express'  // importo request e response do express, pois o ts precisa dessa tipagem
import { knex } from '../bancodedados/conexao'
import { Carro } from '../tipos'

export const listarCarros = async (_: Request, res: Response) => { // por convenção, se não vou usar um parâmetro, uso _ no lugar dele, nesse caso o request não será utilizado nessa rota
    try {
        const carros = await knex<Carro>('carros') // <carro> define o tipo do objeto carro, facilitando o uso de where por exemplo, ao acessar as propriedades da tabela carros pela tipagem
        return res.json(carros)
    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const detalharCarros = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const carro = await knex<Carro>('carros')
            .where({ id: Number(id) })
            .first()

        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado.' })
        }

        return res.json(carro)
    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const cadastrarCarros = async (req: Request, res: Response) => {
    const { marca, modelo, cor, ano, valor } = req.body

    try {
        // <omit> é um tipo utilitário para excluir a possibilidade de cadastro de id no insert, nesse caso, pois o id é manipulado direto no db, como autoencremento
        const carro = await knex<Omit<Carro, 'id'>>('carros').insert({
            marca,
            modelo,
            cor,
            ano,
            valor
        }).returning('*')

        return res.status(201).json(carro[0])
    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const atualizarCarros = async (req: Request, res: Response) => {
    const { id } = req.params
    const { marca, modelo, cor, ano, valor } = req.body

    try {
        const carro = await knex<Carro>('carros')
            .where({ id: Number(id) })
            .first()

        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado.' })
        }

        await knex<Carro>('carros')
            .where({ id: Number(id) })
            .update({ marca, modelo, cor, ano, valor })

        return res.status(204).send()
    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}

export const excluirCarros = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const carro = await knex<Carro>('carros')
            .where({ id: Number(id) })
            .first()

        if (!carro) {
            return res.status(404).json({ mensagem: 'Carro não encontrado.' })
        }

        await knex<Carro>('carros')
            .where({ id: Number(id) })
            .del()

        return res.status(204).send()
    } catch {
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' })
    }
}