

const entriesManager={

    entriesLog:[],
    customerNow:[],

    
    getCurrentTime:function(){
        const currenttime= new Date;
        return currenttime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },

    customerEntry: function(numberOfPeople=1) {
        const people = numberOfPeople;
        const time = this.getCurrentTime();
        this.entriesLog.push({people, time });
        this.customerNow.push({people})
        memoryManager.saveToLocalStorage(this.entriesLog,this.customerNow);
        
        
    },
    customerLeft:function(){
        if (this.customerNow.length >0){
            this.customerNow.pop();
            memoryManager.saveToLocalStorage(this.entriesLog,this.customerNow);
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
    },
    restartArrays: function(){
        this.entriesLog=[];
        this.customerNow=[];
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
    restartButton:document.querySelector(".restart"),

    init:function(){
        this.plusButton.addEventListener("click",()=>this.plusClick());
        this.minusButton.addEventListener("click",()=>this.minusClick());
        this.restartButton.addEventListener("click",()=>this.restartClick());
    },

    plusClick:function(){
        entriesManager.customerEntry();
        renderManager.update();

    },

    minusClick:function(){
        entriesManager.customerLeft();
        renderManager.update();
    },
    restartClick:function(){
        memoryManager.clearCache();
        entriesManager.restartArrays();
        renderManager.update()
    }



}


const memoryManager={
    
    clearCache:function(){
        localStorage.clear()
    },

    saveToLocalStorage: function (entriesLog, customerNow) {
        
        localStorage.setItem('entriesLog', JSON.stringify(entriesLog));
        localStorage.setItem('customerNow', JSON.stringify(customerNow));
    },

    loadFromLocalStorage: function () {
        
        const entriesLogData = JSON.parse(localStorage.getItem('entriesLog'));
        const customerNowData = JSON.parse(localStorage.getItem('customerNow'));

        // Return the data if available, else return empty arrays
        return {
            entriesLog: entriesLogData || [],
            customerNow: customerNowData || []
        };
        
    },

    loadDataToManager: function (entriesManager) {
        const data = this.loadFromLocalStorage();
        entriesManager.entriesLog = data.entriesLog;
        entriesManager.customerNow = data.customerNow;
    }
}
clickHandler.init();
memoryManager.loadDataToManager(entriesManager);
renderManager.update();
