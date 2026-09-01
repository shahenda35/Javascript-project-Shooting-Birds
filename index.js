window.addEventListener("load", function(){
    //select button go
    let startbutton=this.document.getElementsByClassName("gobttn")[0];
    let Entername=this.document.querySelector("input[name=player]");
    let secondbutton=this.document.getElementsByClassName("hidden")[2];
    let div1=this.document.getElementsByClassName("main")[0];
    let div2=this.document.getElementsByClassName("main")[1];
    let welcome= this.document.getElementsByClassName("welcome")[0];
    let checkError=this.document.getElementsByClassName("Error")[0];
    let nameError=this.document.getElementsByClassName("Error")[1];
    let storageN=this.document.querySelector(".storageName");
    let storageS=this.document.querySelector(".storageScore");
    let storageD=this.document.querySelector(".storageDate");

    //event
    startbutton.onclick=function(){
        let levelchecked=document.querySelector("option:checked").value;
       
        if(levelchecked=='D'){
                checkError.classList.remove('hidden'); //required
        }
        else{

            if(Entername.value==''){
                
                nameError.classList.remove('hidden');  //required
                div1.classList.remove('hidden');
                div2.classList.remove('hidden');   
    
            }
             else{
                checkError.classList.add('hidden');
                nameError.classList.add('hidden');
                secondbutton.classList.remove('hidden');
                welcome.innerHTML="Welcome"+ " " + Entername.value
                div1.classList.add('hidden');
                div2.classList.add('hidden');
                
                // Display storage data only on success
                let lastNameData = localStorage.getItem("name");
                let lastScoreData = localStorage.getItem("score");
                let lastDateData = localStorage.getItem("date");
                
                if(lastNameData) storageN.innerHTML+="Last name: " + lastNameData;
                if(lastScoreData) storageS.innerHTML+="last Score: "+lastScoreData;
                if(lastDateData) storageD.innerHTML+="Date: " + lastDateData;
            }
            
        }
    }

    secondbutton.onclick=function(){
        sessionStorage.setItem("name" , Entername.value );
        location.href='/page2.html';
        
    }

    


})