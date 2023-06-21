import { Injectable } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';

// Create a Todo interface to show exactly the attribute of our Todo
interface Todo {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly isDone: boolean;
}
@Injectable()
export class TodoService {
  // Creates a Todo array with on Todo
  private todos: Todo[] = [
    {
      id: 1,
      title: 'Test',
      description: 'This is a test Todo',
      isDone: true,
    },
  ];
  //Creates a new todo
  async addTodo(createTodoDTO: CreateTodoDTO): Promise<Todo> {
    return new Promise((resolve) => {
      this.todos.push(createTodoDTO);
      resolve(this.todos.at(-1));
    });
  }
  //Todo by ID
  async getTodo(todoID: string): Promise<Todo> {
    const post = this.todos.find((todo) => todo.id === parseInt(todoID));
    return post;
  }
  // All Todos
  async getTodos(): Promise<Todo[]> {
    return this.todos;
  }
  // Deletes a todo by ID and add a new one (Update process)
  async editTodo(postID: number, createTodoDTO: CreateTodoDTO): Promise<Todo> {
    await this.deleteTodo(postID);
    this.todos.push(createTodoDTO);
    // return last added item
    return this.todos.at(-1);
  }
  // Deletes a todo from the array
  async deleteTodo(todoID: number): Promise<any> {
    const todoIndex = this.todos.findIndex((todo) => todo.id === todoID);
    return this.todos.splice(todoIndex, 1);
  }
}
