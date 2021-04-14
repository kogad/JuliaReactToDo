using Merly
using JSON
using MySQL
using Tables: rowtable


const host = "127.0.0.1"
const user = "root"
const password = ""

const conn = DBInterface.connect(MySQL.Connection, host, user, password)
DBInterface.execute(conn, "create database if not exists julia_react_todo")

create_table = """
create table if not exists julia_react_todo.todos(
    id int PRIMARY KEY,
    description varchar(255),
    deadline date
)
"""
DBInterface.execute(conn, create_table)

function find_all(conn)
    res = DBInterface.execute(conn, "select * from julia_react_todo.todos")
    return json(rowtable(res))
end

function delete(conn, id)
    DBInterface.execute(conn, "delete from julia_react_todo.todos where id = $id")
end

function insert(conn, todo)
    id = todo["id"]
    description = todo["description"]
    deadline = todo["deadline"]
    DBInterface.execute(conn, "insert into julia_react_todo.todos values($id, \"$description\", \"$deadline\")")
end

useCORS(
AllowOrigins = "*"
, AllowHeaders = "Origin, Content-Type, Accept"
, AllowMethods = "GET,POST,PUT,DELETE"
, MaxAge = "178000")

Get("/todo", (request, HTTP) -> begin
    println(find_all(conn))

    HTTP.Response(201
          , HTTP.mkheaders(["Content-Type" => "application/json"])
          ,body=find_all(conn))
end)

Post("/todo", (request, HTTP) -> begin
    println(request.body)
    todo = JSON.parse(request.body)
    insert(conn, todo)
    HTTP.Response(201, "ok")
end)

Delete("/todo/:id", (request, HTTP) -> begin
    delete(conn, request.params["id"])
    HTTP.Response(201, "ok")
end)


start(host = "127.0.0.1", port = 8086, verbose = true)
