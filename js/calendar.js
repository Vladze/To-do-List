function calendar(){
    let date = new Date();
    function renderCal(){
        date.setDate(1);
        let monthsDays = document.querySelector(".days");
        let lastDay = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
        let prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        
        let firstDayIndex = date.getDay();
        let lastDayIndex = new Date(date.getFullYear(),date.getMonth() + 1, 0).getDay();
        
        let nextDays = 7 - lastDayIndex - 1;

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

        document.querySelector(".date h2").innerText = months[date.getMonth()];
        document.querySelector(".date p").innerText = new Date().toDateString();

        let days = "";

        for(let i=firstDayIndex; i>0; i--){
            days += `<div class="prev-date">${prevLastDay+ 1 -i}</div>`;
        }

        for(let i=1; i<=lastDay; i++){
            if(i=== new Date().getDate() && date.getMonth() === new Date().getMonth()){
                days += `<div class="today">${i}</div>`
            } else {
                days += `<div>${i}</div>` 
            }
        }

        for(let i=1; i<=nextDays; i++){
            days += `<div class="next-date">${i}</div>`;
            monthsDays.innerHTML = days;
        }
    }


    document.querySelector(".arrow-prev").
    addEventListener("click", function(){
        date.setMonth(date.getMonth()-1);
        renderCal();
    })

    document.querySelector(".arrow-next").
    addEventListener("click", function(){
        date.setMonth(date.getMonth()+1);
        renderCal();
    })

    renderCal();
}

calendar();