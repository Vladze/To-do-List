function controlPage(){
    let btn1 = document.getElementById("btn_page1");
    let btn2 = document.getElementById("btn_page2");
    let btn3 = document.getElementById("btn_page3");
    let btn_search =document.querySelector(".search_btn");
    let btn_calendar = document.querySelector(".calendar_btn");
    let calendar = document.querySelector(".calendar");
    let sideBarBtn = document.querySelector(".sideBar_btn");
    let sideBar = document.querySelector(".sideBar");


    sideBarBtn.addEventListener("click", function(){
        sideBar.classList.toggle("active");
    })

    btn_page1.addEventListener("click", function(){
        clearDisplay();
        document.querySelector(".page_1").style.display = "block";
        this.classList.add("active");
    })

    btn_page2.addEventListener("click", function(){
        clearDisplay();
        document.querySelector(".page_2").style.display = "block";
        this.classList.add("active");
    })

    btn_page3.addEventListener("click", function(){
        clearDisplay();
        document.querySelector(".page_3").style.display = "block";
        this.classList.add("active");
    })


    function clearDisplay() {
        let pages = document.querySelectorAll(".main_page");
        let btns = document.querySelectorAll(".aside_item");

        for (let element of pages) {
            element.style.display = "none"
        }

        for (let btn of btns) {
            btn.classList.remove("active");
        }
    }

    btn_search.addEventListener("click", function(){
        this.parentElement.classList.toggle("active");
    })

    btn_calendar.addEventListener("click", function(){
        calendar.classList.toggle("active");
    })

    
};

controlPage();


