import { Header } from "@/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";

const { VITE_API_URL } = import.meta.env

interface aluno {
    id: number,
    nome: string,
    turma: string,
    disponibilidade: boolean,
}

export function Removidos() {
    const [alunos, setAlunos] = useState([])
    const [turmas, setTurmas] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function buscarAlunosBloqueados() {
            setLoading(true)

            try {
                const resposta = await axios.get(`${VITE_API_URL}/bloqueados`)
                setAlunos(resposta.data.alunos)
                setTurmas(resposta.data.turmas)
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
                <h1 className="font-bold text-3xl mb-5">Alunos Bloqueados</h1>

                {loading ? <div>Carregando...</div> : alunos.length === 0 && <div>Todos estão desbloqueados!</div>}
                {turmas.map((turma, index) => (
                    <section key={index} className="mb-9">
                        <h2 className="font-bold text-xl mb-3">{turma}</h2>

                        <ul>
                            {alunos.map((aluno: aluno) => (
                                aluno.turma === turma && (
                                    <li key={aluno.id} className="mb-2">{aluno.nome}</li>
                                )
                            ))}
                        </ul>
                    </section>
                ))}
            </main>
        </>
    )
}
