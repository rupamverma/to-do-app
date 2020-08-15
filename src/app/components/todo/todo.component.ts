import { Component, OnInit } from '@angular/core';
import { AppData } from 'src/app/app-data';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/user/service/auth.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  user = sessionStorage.getItem('username');
  data: AppData = {
    todos: [
      {
        title: 'Eat food',
        completed: true,
        date: new Date()
      },
      {
        title: 'Complete project',
        completed: false,
        date: new Date()
      }
    ]
  };
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {

    this.data.todos.sort((val1, val2)=>{
      return  <any>new Date(val1.date) - <any>new Date(val2.date)
    });
  }

  addTodo(todo)
  {
    console.log(this.data.todos);
    if(todo=="")
    {
       alert("Please enter title");
    }
    else{
      this.data.todos.push({
        title: todo,
        completed: false,
        date: new Date()
      });
    }
   
  }
  deleteItem(todo) {
    for (let i = 0; i <= this.data.todos.length; i++) {
      if (todo == this.data.todos[i]) {
        this.data.todos.splice(i, 1)
      }
    }
  }
  logout() {  
    console.log('logout');  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  }  
  

}
