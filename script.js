const entriesManager={

    entriesLog:[],
    customerNow:[],

    
    getCurrentTime:function(){
        const currenttime= new Date;
        return currenttime.toLocaleTimeString();
    },

    customerEntry: function(numberOfPeople=1) {
        const people = numberOfPeople;
        const time = this.getCurrentTime();
        this.entriesLog.push({people, time });
        this.customerNow.push({people})
        
        
    },
    customerLeft:function(){
        if (this.customerNow.length >0){
            this.customerNow.pop();
        }else return;
    },
    findAllEntries:function(){
        return this.entriesLog.length;
    },
    findAllCustomerNow:function(){
        let sum=0;
        this.customerNow.forEach(function(entry){
            sum+=entry.people;
        })
        return sum;
    }
    
}

const renderManager={
    nowDiv: document.querySelector(".people-now-div"),
    totalDiv: document.querySelector(".people-sum-div"),

    update:function(){
        this.nowDiv.textContent=` ${entriesManager.findAllCustomerNow()}`;
        this.totalDiv.textContent=` ${entriesManager.findAllEntries()}`;
    }
    
    
}

const clickHandler={
    plusButton: document.querySelector(".add-button"),
    minusButton:document.querySelector(".minus-button"),

    init:function(){
        this.plusButton.addEventListener("click",()=>this.plusClick());
        this.minusButton.addEventListener("click",()=>this.minusClick());
    },

    plusClick:function(){
        entriesManager.customerEntry();
        renderManager.update();

    },

    minusClick:function(){
        entriesManager.customerLeft();
        renderManager.update();
    }



}
clickHandler.init()