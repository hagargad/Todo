import { Component } from '@angular/core';
import { NavController,AlertController,reorderArray,ToastController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import{ArchivedTodosPage} from '../archived-todos/archived-todos';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 public todos=[];
 public reorderIsEnabled= false;
 //public ArchivedTodosPage =ArchivedTodosPage;
  constructor(public navCtrl: NavController,
    private alertController:AlertController ,
    private todosProvider: TodoProvider,
    private toastController:ToastController
  ) {
    this.todos =this.todosProvider.getTodos();

  }
  archivetodo(todoIndex){
    this.todosProvider.archivetodo(todoIndex);
  }


  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  toggleReorder(){
    this.reorderIsEnabled=!this.reorderIsEnabled;
  }

itemReorder($event){
 reorderArray(this.todos,$event);
}
editTodo(todoIndex){
      let editTodoAlert =this.alertController.create({
        title :"Edit A Todo",
        message:"Edit Your Todo",
        inputs:[
          {
               type:"text",
               name:"editTodoInput",
               value: this.todos[todoIndex]
          }
        ],
        buttons:[
          {
            text:"cancel"
          },
          {
            text:"Edit Todo",
            handler:(inputData)=>{
              let todoText;
              todoText =inputData.editTodoInput;
              this.todosProvider.editTodo(todoText,todoIndex);

              editTodoAlert.onDidDismiss(()=>{
                let editTodoToast =this.toastController.create(
                  {
                    message :"Todo Edited",
                    duration :2000
                  }
                );
               
                editTodoToast.present();
              }
             
            );
            }
          }
        ]
      });   
      editTodoAlert.present();
}


openTodoAlert(){
   let addTodoAlert=this.alertController.create({
  title:"Add a Todo",
  message :"Enter YOUR TODO",
   inputs:[
    {
       type:"text",
       name:"addTodoInput"
    }
  ],
  buttons: [
    {
      text:"Cancel"
    },
    {
      text:"Add Todo",
      handler:(inputData)=>{
         let todoText;
         todoText=inputData.addTodoInput;
         this.todosProvider.addTodo(todoText);

         addTodoAlert.onDidDismiss(()=>{
          let addTodoToast =this.toastController.create({
            message:"Todo Added",
            duration :2000
          });
          addTodoToast.present();
         });
        
       
         
         
      }
    }
  ]

});
addTodoAlert.present();

}
}
