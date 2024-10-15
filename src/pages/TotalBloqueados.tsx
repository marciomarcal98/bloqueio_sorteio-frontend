import { Header } from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

const { VITE_API_URL } = import.meta.env

interface aluno {
    id: number,
    nome: string,
    turma: string,
    disponibilidade: boolean,
    qtdBloqueios: number
}

export function TotalBloqueados() {
    const [alunos, setAlunos] = useState([])
    const [turmas, setTurmas] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function buscarAlunosBloqueados() {
            setLoading(true)

            try {
                const resposta = await axios.get(`${VITE_API_URL}/totalbloqueios`)
                setAlunos(resposta.data.alunos)
                setTurmas(resposta.data.turmas)
                console.log(resposta.data.alunos)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        buscarAlunosBloqueados()
    }, [])

    return (
        <>
            <Header />

            <main className="p-4">
                <h1 className="font-bold text-3xl mb-5">Total de Bloqueios</h1>

                {loading ? <div>Carregando...</div> : alunos.length === 0 && <div>Todos estão desbloqueados!</div>}
                {turmas.map((turma, index) => (
                    <section key={index} className="mb-9">
                        <h2 className="font-bold text-xl mb-3">{turma}</h2>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-lg">Aluno</TableHead>
                                    <TableHead className="text-center text-lg">Quantidade de Bloqueios</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {alunos.map((aluno: aluno) => (
                                    aluno.turma === turma && (
                                        <TableRow key={aluno.id}>
                                            <TableCell>{aluno.nome}</TableCell>
                                            <TableCell className="text-center">{aluno.qtdBloqueios}</TableCell>
                                        </TableRow>
                                    )
                                ))}
                            </TableBody>
                        </Table>
                    </section>
                ))}
            </main>
        </>
    )
}
