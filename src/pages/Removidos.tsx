import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
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

    async function guardarBloqueados() {
        try {
            await axios.post(`${VITE_API_URL}/guardarbloqueios`)
            alert("Bloqueios guardados com sucesso!")
        } catch(err) {
            console.log(err)
        }
    }

    async function desbloquearTodos() {
        try {
            await axios.post(`${VITE_API_URL}/desbloqueiogeral`)
            alert("Todos os alunos foram desbloqueados!");
        } catch(err) {
            console.log(err)
        }
    }

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

                <div className="flex gap-5 mt-10">
                    {alunos.length > 0 && <Button onClick={guardarBloqueados}>Guardar Bloqueios</Button>}
                    <Button onClick={desbloquearTodos}>Desbloquear Todos</Button>
                </div>
            </main>
        </>
    )
}
