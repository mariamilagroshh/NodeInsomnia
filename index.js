//importação dos arquivos express
const express = require('express');
const app = express();

const port = 8080

//SQL npm install -npm install --save sqlite3--save sequelize--//
const { Sequelize, DataTypes } = require('sequelize');

const TaskModel = require('./models/task')

const sequelize = new Sequelize({
    "storage": "my-database.db",
    "dialect": "sqlite"
  })

  const tasks = TaskModel(sequelize, DataTypes)

  app.use(express.json())

//Listar as tarefas 
app.get('/tasks', async (req, res) => {
  const allTasks = await tasks.findAll()
  res.json({ allTasks })
})


// Procurar tarefa por id 
app.get('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const task = await tasks.findByPk(taskId)
  console.log(req)

  res.json({ task })

})

app.post('/tasks', async (req, res) => {
  const body = req.body
  const task = await tasks.create({ description: body.description, done: body.done })
  res.json(task)

})

// Apagar tarefa
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const task = await tasks.destroy({ where: { id: taskId } })

  res.send('Tarefa apagada')
})
  // Atualizar tarefa

  app.put('/tasks/:id', async (req, res) => {
    const body = req.body
    const taskId = req.params.id
    const task = await tasks.findByPk(taskId)
    const result = await task.update({ description:body.description, done: body.done })
    res.send(result)
  })

// Criar tarefa 
// 1.Receber informação no corpo
// 2.Adicionar tarefa no banco de dados
// 3.Resposta para o cliente:tarefa criada ou er



app.listen(port, () => {
    console.log(`Exemplo listen porta!!! ${port}`)
}) //npm run dev -rodar-//

