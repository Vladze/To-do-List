let tasks_page = document.querySelector("#allTasks");
let tasks_importand_page = document.querySelector("#importandTasks");
let tasks_remoted_page = document.querySelector("#remotedTasks");
let input = document.querySelector("#input_add");
let input_search = document.querySelector(".input_search");
let btn_add = document.querySelector("#add_btn");
let btn_clear = document.querySelector("#btn_clear");
let btns_importand = document.getElementsByClassName("star");
let btns_delete = document.getElementsByClassName("delete")
let btns_change = document.getElementsByClassName("change");
let tasks;

function pageLoad(){
    localStorage.getItem("tasks") ? tasks = JSON.parse(localStorage.getItem("tasks")) : tasks = [];
    showTasksHTML();
    searchPeriod();
}
pageLoad();

input.addEventListener("keydown", function(event){
    if(event.code == "Enter" && input.value != ""){
        tasks.unshift(new Task(input.value));
        saveTasks();
        showTasksHTML()
        input.value = "";
    } 
})


btn_add.addEventListener("click", function(){
    if(input.value != ""){
        tasks.unshift(new Task(input.value));
        saveTasks();
        showTasksHTML()
        input.value = "";
    } 
})

btn_clear.addEventListener("click", function(){
    tasks = tasks.filter(item => item.remoted === false); 
    saveTasks();
    showTasksHTML();
})


function Task(desc){
    this.desc = desc;
    this.importand = false;
    this.remoted = false;
    this.fulldate = new Date();
}


function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function importandTasks(){
    for(let btn of btns_importand){
        btn.addEventListener("click", function(){
            let index = this.closest(".task").getAttribute("data-num");

            tasks[index].importand = !(tasks[index].importand);

            saveTasks();
            showTasksHTML();
        })
    }
}

function deleteTasks(){
    for(let btn of btns_delete){
        btn.addEventListener("click", function(){
            let index = this.closest(".task").getAttribute("data-num");

            tasks[index].remoted = true;

            saveTasks();
            showTasksHTML();
        })
    }
}

function changeTasks(){
    for(let btn of btns_change){
        btn.addEventListener("click", function(){
            let index = this.closest(".task").getAttribute("data-num");
            let desc = this.previousElementSibling;
            desc.setAttribute("contenteditable", "");
            desc.focus();
    
            
            desc.addEventListener("blur", function(){
                desc.removeAttribute("contenteditable");
                tasks[index]["desc"] = desc.innerHTML;

                saveTasks();
                showTasksHTML();
            })
        })
    }
}

function showTasksHTML(){
    tasks_page.innerHTML = "";
    tasks_importand_page.innerHTML = "";
    tasks_remoted_page.innerHTML = "";

    let sortDate = document.querySelector(".date_sort");
    let sortMonth = document.querySelector(".month_sort");
    let sortDateFrom = document.querySelector(".periodFrom");
    let sortDateTo = document.querySelector(".periodTo");

    let tasksSort = tasks;

    if(sortDateFrom){
        tasksSort = tasksSort.filter(task => Date.parse(returnNormilizeDate(sortDateFrom.textContent))-(3*60*60*1000) < Date.parse(task.fulldate) && (Date.parse(returnNormilizeDate(sortDateTo.textContent))+(21*60*60*1000)) > Date.parse(task.fulldate));
    }

    tasksSort.forEach(function(item, index, arr){
        if(item.remoted === false) {
            tasks_page.innerHTML += `
            <div class="task" data-num="${index}">
                <div class="task_date">${getDate(item.fulldate)}</div>
                <div class="task_btn star">${item.importand ? '<ion-icon name="star"></ion-icon>' : '<ion-icon name="star-outline"></ion-icon>'}</div>
                <div class="description">${item.desc}</div>
                <div class="task_btn change"><ion-icon name="create-outline"></ion-icon></div>
                <div class="task_btn delete"><ion-icon name="close-circle-outline"></ion-icon></div>
            </div>`
        } 
    })

    tasksSort.forEach(function(item, index){
        if(item.remoted === false && item.importand === true) {
            tasks_importand_page.innerHTML += `
            <div class="task" data-num="${index}">
                <div class="task_date">${getDate(item.fulldate)}</div>
                <div class="star">${item.importand ? '<ion-icon name="star"></ion-icon>' : '<ion-icon name="star-outline"></ion-icon>'}</div>
                <div class="description">${item.desc}</div>
                <div class="change"><ion-icon name="create-outline"></ion-icon></div>
                <div class="delete"><ion-icon name="close-circle-outline"></ion-icon></div>
            </div>`
        }
    })

    tasksSort.forEach(function(item, index){
        if(item.remoted === true) {
            tasks_remoted_page.innerHTML += `
            <div class="task" data-num="${index}">
                <div class="description">${item.desc}</div> 
            </div>`
        }
    })

    if(tasks_page.innerHTML === ""){
        tasks_page.innerHTML = `<div class="empty-backgound">
        <img src="img/catsleeping.png" alt="empty"></div>`;
    }

    if(tasks_importand_page.innerHTML === ""){
        tasks_importand_page.innerHTML = `<div class="empty-backgound">
        <img src="img/catsleeping.png" alt="empty"></div>`;
    }

    if(tasks_remoted_page.innerHTML === ""){
        tasks_remoted_page.innerHTML =`<div class="empty-backgound">
        <img src="img/catsleeping.png" alt="empty"></div>`;
    }
    
    importandTasks();
    deleteTasks();
    changeTasks();
}


function getTaskDate(task){
    let nowDate = new Date();

    return task.getMonth() + " " + task.getDate(); 
}

input_search.addEventListener("input", function(){
    let displayTasks = document.getElementsByClassName("description");
    
    if(this.value.length != 0){
        for(let task of displayTasks){
            task.innerHTML = task.innerText;    
            if(task.innerText.search(this.value) == -1){
                task.parentElement.style.display = "none";
                    
            } else {
                task.parentElement.style.display = "flex";
                task.innerHTML = markText(task.innerText, task.innerText.search(this.value), this.value.length);
            }
                
        }
        
    } else {
        for(let task of displayTasks){
            task.parentElement.style.display ="flex";
            task.innerHTML = task.innerText;
        }
    }
    
   
})


function markText(string, pos, len){
    return string.slice(0, pos) + '<span class="markText">' + string.slice(pos, pos+len) + '</span>' + string.slice(pos + len);
    
}

function normolizeTime(num){
    return String(num).length === 1 ? "0"+ num : num 
}


function getNumMonth(str){
    let months = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];

    return months.indexOf(str);
}


function searchPeriod(){
    let periodFrom = document.querySelector("#periodFrom");
    let periodTo = document.querySelector("#periodTo");
    let btnShow = document.querySelector("#periodShow");
    let calendar = document.querySelector(".calendar_period");
    
    btnShow.addEventListener("click", function(){
       calendar.innerHTML = 
       `<div class="periodFrom">${normalizeDate(periodFrom.value)}</div>
        <div>-</div>
        <div class="periodTo">${normalizeDate(periodTo.value)}</div>
        <div class='period_delete_btn'><ion-icon name="close-circle-outline"></ion-icon></div>`;

        document.querySelector(".calendar").classList.remove("active");
        document.querySelector(".period_delete_btn").addEventListener("click", function(){
            calendar.innerHTML = "";
            pageLoad();
        })
        showTasksHTML();
    })
    
}

searchPeriod();

function normalizeDate(date) {
    return date.split("-").reverse().join(".");
}

function returnNormilizeDate(date){
    return date.split(".").reverse().join("-");
}

function getDate(date){
    let dateNow = new Date();
    let dateTask = new Date(Date.parse(date));
    let months = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June", 
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];

    if(dateNow.getMonth() === dateTask.getMonth() && dateNow.getDate() === dateTask.getDate()){
        return normolizeTime(dateTask.getHours()) + ":" + normolizeTime(dateTask.getMinutes());
    }
    
    return months[dateTask.getMonth()] + " " + dateTask.getDate();
}
