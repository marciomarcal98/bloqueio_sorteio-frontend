import { Header } from "@/components/Header"
import { useState } from "react"
import axios from "axios"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"

const { VITE_API_URL } = import.meta.env

interface aluno {
  id: number,
  nome: string,
  turma: string,
  disponibilidade: boolean,
}

export function Home() {
  const [alunos, setAlunos] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function buscarAlunos(turma: string) {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get(`${VITE_API_URL}?turma=${turma}`)
      setAlunos(response.data)
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  function handleSelectChange(valor: string) {
    const turma = valor

    buscarAlunos(turma)
  }

  async function handleBloquearDesbloquearAluno(id: number, disponibilidade: boolean, turma: string) {
    try {
      const dadosAluno = {
        id,
        disponibilidade
      }

      await axios.post(`${VITE_API_URL}/disponibilidade`, dadosAluno)
      buscarAlunos(turma)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      <Header />

      <main className="p-4">
        <h1 className="font-bold text-3xl mb-5">Bloquear Alunos</h1>

        <section className="mb-5">
          <p className="mb-3">Pesquisar pela turma:</p>
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Selecione a turma" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-center">1º ano</SelectLabel>
                <SelectItem value="TI01MA">TI01MA</SelectItem>
                <SelectItem value="TI01MB">TI01MB</SelectItem>
                <SelectItem value="TI01MC">TI01MC</SelectItem>
                <SelectItem value="TI01TA">TI01TA</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-center">2º ano</SelectLabel>
                <SelectItem value="TI02MA">TI02MA</SelectItem>
                <SelectItem value="TI02MB">TI02MB</SelectItem>
                <SelectItem value="TI02MC">TI02MC</SelectItem>
                <SelectItem value="TI02TA">TI02TA</SelectItem>
                <SelectItem value="TI02TB">TI02TB</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel className="text-center">3º ano</SelectLabel>
                <SelectItem value="TI03MA">TI03MA</SelectItem>
                <SelectItem value="TI03MB">TI03MB</SelectItem>
                <SelectItem value="TI03TA">TI03TA</SelectItem>
                <SelectItem value="TI03TB">TI03TB</SelectItem>
                <SelectItem value="TI03TC">TI03TC</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </section>

        <section>
          {loading && <div>Carregando...</div>}
          {error && <div>Erro ao buscar alunos: {error}</div>}
          {!loading && !error && alunos.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alunos.map((aluno: aluno) => (
                  <TableRow key={aluno.id}>
                    <TableCell>{aluno.nome}</TableCell>
                    <TableCell>{aluno.disponibilidade ? "Disponível" : "Indisponível"}</TableCell>
                    <TableCell>
                      <Button 
                        className={aluno.disponibilidade ? "bg-destructive text-white" : ""}
                        onClick={() => handleBloquearDesbloquearAluno(aluno.id, aluno.disponibilidade, aluno.turma)}>
                          {aluno.disponibilidade ? "Bloquear" : "Desbloquear"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>
      </main>
    </>
  )
}