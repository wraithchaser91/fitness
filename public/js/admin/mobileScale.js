class Scaler{
    constructor(ref, container, isOpen=false){
        this.ref = ref;
        this.ref.addEventListener("click", ()=>this.move());
        this.isOpen = isOpen;
        this.container = container;
        this.height = window.getComputedStyle(this.container).height;
        this.move();
    }
    move(){
        if(this.isOpen){
            this.ref.className = "scaleHeading up";
            this.container.style.height = this.height;
            this.container.style.transform = "scaleY(1)";
        }else{
            this.ref.className = "scaleHeading down";
            this.container.style.height = "0";
            this.container.style.transform = "scaleY(0)";
        }
        this.isOpen = !this.isOpen;
    }
}