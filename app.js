let count=0;
let tasks=[];
let completed_tasks=[];

const h_btns = document.querySelectorAll(`.h-btn`);
const f_port = document.querySelectorAll(`.f-display`);
const a_input = document.querySelectorAll(`.a-input`);
const template = document.querySelector(`#task-template`);
const h_list = document.getElementById("home-list");
const c_list = document.getElementById("c-list");
const cTemplate = document.getElementById(`ctask-template`);
console.log(cTemplate);


class taskContainer{
    constructor(name='',desc=''){
        this.taskName=name;
        this.taskDesc=desc;
    }
}
function portalDisplay(index){
    for(let i=0;i<f_port.length;i++){
        f_port[i].style.visibility = (i===index) ? "visible" : "hidden";
    }
    for(let i=0;i<h_btns.length;i++){
        h_btns[i].style.borderBottom = (i===index)? "3px solid #ffffff" : "3px solid #2564cf";
    }
}
function homeDelete(event){
    //btn-3
    //01234
    let match = event.target.id.match(/\d+/);
    let idNum = match ? Number(match[0]):-1;
    h_list.removeChild(document.getElementById(`task-${idNum}`));
    tasks.splice(idNum,1);
    updateId();
}
function cDelete(event){
    let match = event.target.id.match(/\d+/);
    let idNum = match ? Number(match[0]):-1;
    c_list.removeChild(document.getElementById(`ctask-${idNum}`));
    completed_tasks.splice(idNum,1);   
    cUpdateId();    
}
function cUpdateId(){
    let items = c_list.querySelectorAll(`li`);
    items.forEach((item,index)=>{
        item.id = `ctask-${index}`;
        item.querySelector(`.c-del`).id = `cbtn-${index}`;
    });
}
function updateId(){
    let items = h_list.querySelectorAll(`li`);
    items.forEach((item,index)=>{
        item.id=`task-${index}`;
        item.querySelector(`.home-del`).id=`btn-${index}`;
        item.querySelector(`input[type="checkbox"]`).id=`check-${index}`;
    });
    count=items.length;
}
function homeMarkup(event){
    let match = event.target.id.match(/\d+/);
    let idNum = match ? Number(match[0]):-1;
    completed_tasks.push(tasks[idNum]);
    tasks.splice(idNum,1);
    h_list.removeChild(document.getElementById(`task-${idNum}`));
    updateId();
    console.log(completed_tasks);
}
function addTask(){
    //creating Object and appending
    let newTask = new taskContainer(a_input[0].value,a_input[1].value);
    tasks.push(newTask);
    //cloning the template and creating the element
    let clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    //Adding id
    li.id=`task-${count}`;
    li.querySelector(`.home-del`).id=`btn-${count}`;
    li.querySelector("input[type=checkbox]").id=`check-${count}`;
    //Updating text-content and appending.
    li.querySelector(`.home-taskTitle`).textContent = newTask.taskName;
    h_list.appendChild(li);
    //Adding eventListeners
    li.querySelector(`.home-del`).addEventListener
    ("click",(e)=>{
        homeDelete(e);
    })
    li.querySelector(`.home-done`).addEventListener
    ("change",(e)=>{
        homeMarkup(e);
    });
    //updating count
    count++;
}
function updateCompleted(){
    c_list.innerHTML="";
    for(let i=0;i<completed_tasks.length;i++){
        let clone = cTemplate.content.cloneNode(true);
        const li = clone.querySelector(`li`);
        //Adding Id
        li.id=`ctask-${i}`;
        li.querySelector(`.c-del`).id=`cbtn-${i}`;
        //Update text and append.
        li.querySelector(`.c-taskTitle`).textContent = completed_tasks[i].taskName;
        c_list.appendChild(li);
        //EventListeners
        li.querySelector(`.c-del`).addEventListener("click", (e)=> cDelete(e));
    }
}



//EventListeners
h_btns[0].addEventListener("click",()=> portalDisplay(0));
h_btns[1].addEventListener("click",()=> portalDisplay(1));
h_btns[2].addEventListener
("click",()=>{
    updateCompleted();
    portalDisplay(2);
});
h_btns[3].addEventListener
("click",()=>{
    alert(`${count} Task(s) are yet to be Done`);
});

document.getElementById("a-subm").addEventListener
("click",(e)=>{
    addTask();
    setTimeout
    (()=>{
    f_port[1].style.visibility='hidden';
    f_port[0].style.visibility='visible';
    },100)
    h_btns[1].style.borderBottom = "3px solid #2564cf";
    h_btns[0].style.borderBottom = "3px solid #ffffff";
    e.preventDefault();
})


/**
0: button#h-home.h-btn
1: button#h-add.h-btn
2: button#h-view.h-btn
3: button#h-status.h-btn
 */
/** 
0: div#f-home.f-display
1: div#f-add.f-display
2: div#f-comp.f-display
*/

