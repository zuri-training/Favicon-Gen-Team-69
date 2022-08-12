const mobile= document.getElementById('mobile-menu')
var state=0
function menu(){
    
    if (state==0){
    mobile.classList.add("mobile-menu-open-popup");
    state++;
    }
    else if(state==1){
        mobile.classList.remove("mobile-menu-open-popup")
        state--;    
    }
    
}