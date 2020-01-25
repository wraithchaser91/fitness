///Allowing functionality to delete payments
let isButtonShown = false;
class Payment{
    constructor(ref){
        this.ref = ref;
        this.isClicked = false;
        this.isActive = false;
        this.hasButton = false;
        this.timer = 0;
        this.maxTimer = 30;
        this.setListeners();
    }
    setListeners(){
        this.ref.addEventListener("click", (e)=>e.stopPropagation());
        this.ref.addEventListener("mousedown", (e)=>{
            this.isClicked = true;
            this.animate();
        });
        this.ref.addEventListener("mouseup", (e)=>{
            this.isClicked = false;
        });
        this.ref.addEventListener("touchstart", (e)=>{
            this.isClicked = true;
            this.animate();
        });
        this.ref.addEventListener("touchend", (e)=>{
            this.isClicked = false;
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