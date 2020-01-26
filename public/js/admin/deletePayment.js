let isButtonShown = false;
class Payment{
    constructor(ref, preventDefault=false){
        this.ref = ref;
        this.preventDefault = preventDefault;
        this.isClicked = false;
        this.isActive = false;
        this.hasButton = false;
        this.timer = 0;
        this.maxTimer = 30;
        this.lastDate = -1;
        this.timeInterval = 300;
        this.clickCount = 0;
        this.maxClickCount = (screen.availWidth < 767?4:2);
        this.setListeners();
    }
    setListeners(){
        this.ref.addEventListener("click", (e)=>{
            if(this.preventDefault)e.preventDefault();
            let newDate = Date.now();
            if(this.lastDate === -1){
                this.lastDate = newDate;
                this.clickCount++;
            }else{
                if(newDate-this.lastDate < this.timeInterval){
                    this.clickCount++;
                    if(this.clickCount >= this.maxClickCount){
                        e.stopPropagation();
                        if(!this.isActive)this.setActive();
                    }
                }else{
                    this.clickCount = 0;
                }
                this.lastDate = newDate;
            }
        });
        // this.ref.addEventListener("mousedown", (e)=>{
        //     this.isClicked = true;
        //     this.animate();
        // });
        // this.ref.addEventListener("mouseup", (e)=>{
        //     this.isClicked = false;
        // });
        this.ref.addEventListener("touchstart", (e)=>{
            if(this.preventDefault)e.preventDefault();
            let newDate = Date.now();
            if(this.lastDate === -1){
                this.lastDate = newDate;
                this.clickCount++;
            }else{
                if(newDate-this.lastDate < this.timeInterval){
                    this.clickCount++;
                    if(this.clickCount >= this.maxClickCount){
                        e.stopPropagation();
                        if(!this.isActive)this.setActive();
                    }
                }else{
                    this.clickCount = 0;
                }
                this.lastDate = newDate;
            }
        });
    }
    animate(){
        if(this.isClicked){
            if(this.timer > this.maxTimer && !this.isActive){
                this.setActive();
            }else if(!this.isActive){
                this.timer++;
            }
            requestAnimationFrame(()=>this.animate());
        }
    }
    setActive(){
        for(let payment of payments){
            payment.deactivate();
        }
        this.isActive = true;
        this.ref.style.background = backgroundColour;
        if(!isButtonShown){
            delButton.style.display = "block";
            isButtonShown = true;
        }
        if(!this.hasButton)this.ref.appendChild(delButton);
        this.hasButton = true;
        activePayment = this;
    }
    deactivate(){
        this.timer = 0;
        this.isClicked = false;
        this.isActive = false;
        this.ref.style.background = "transparent";
        if(this.hasButton)this.ref.removeChild(delButton);
        this.hasButton = false;
        activePayment = null;
    }
}