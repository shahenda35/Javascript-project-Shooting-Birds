window.addEventListener("load", function(){
    //second page
    let Timer= this.document.getElementById("timer");
    let Score=this.document.querySelector(".score");
    let kills=this.document.querySelector(".killed");
    let birdsdiv=this.document.querySelector(".birds_container");
    let Message=this.document.querySelector(".message");
    let imgs_Array=[`./images/bird1.gif` , `./images/bird2.gif` , `./images/bird3.gif`]

    //player
    this.document.querySelector(".player").innerHTML+=sessionStorage.getItem("name");

    let sum=0;
    let shot=0;
    Score.innerHTML="0";
    kills.innerHTML="0";

    //birds
    function FlyBirds(){
        let BirdElement=document.createElement("img");
        let random=Math.floor(Math.random()*imgs_Array.length);
        BirdElement.src=imgs_Array[random];
        BirdElement.setAttribute("class" , "birdsimgs");
        birdsdiv.appendChild(BirdElement);

        //score
        BirdElement.onclick = function(){
            switch(random){
                case 0: 
                    sum = sum+5;
                    Score.innerHTML= sum;
                    shot=shot+1;
                    kills.innerHTML=shot;
                    BirdElement.classList.add('hidden');
                break;
                case 1: 
                    sum = sum+3;
                    Score.innerHTML= sum;
                    shot=shot+1;
                    kills.innerHTML=shot;
                    BirdElement.classList.add('hidden');
                break;
                case 2: 
                    sum = sum-4;
                    Score.innerHTML= sum;
                    shot=shot+1;
                    kills.innerHTML=shot;
                    BirdElement.classList.add('hidden');
                break;

            }
        }

        let left=0;
        let top= 100 + Math.floor(Math.random()*(innerHeight-BirdElement.height-150));
        BirdElement.style.top=top+"px";

        //move birds
        const moveRight=function(){
                left+=5;
                BirdElement.style.left=left+"px";
                BirdElement.style.top=top+"px";
                    if(left>(innerWidth-BirdElement.width))
                    {
                        clearInterval(id); 
                        birdsdiv.removeChild(BirdElement);
                          
                       //moveRight(BirdElement);
                    }
                    if(Timer.innerHTML==0){
                        clearInterval(id);
                        BirdElement.onclick=null;
                    }
                    
            } 
            let id=setInterval(moveRight,30);
            
    }
    
   let birdsInt=setInterval(FlyBirds,2000);

    //timer
    Timer.innerHTML='60';
    const updateTimer=function(Timer){ 

        let idT=setInterval(function(){
            if(Timer.innerHTML>0)
            {
                Timer.innerHTML -- ;
                
            }
            else
            {
                clearInterval(idT);
                clearInterval(birdsInt);
                clearInterval(bombint);
                if(sum>=50){
                    Message.classList.add("win");
                    Message.innerHTML="you win";
                    Message.style.fontSize="x-large";
                    let winimg= document.createElement("img");
                    winimg.src='./images/win.jpg';
                    winimg.setAttribute("class" , "win-bird");
                    
                    Message.append(winimg);
                   
                }
                else
                {
                    Message.classList.add("lose");
                    Message.innerHTML="you lose";
                    Message.style.fontSize="x-large";
                    let loseimg= document.createElement("img");
                    loseimg.src='./images/lose.jpg';
                    loseimg.setAttribute("class" , "lose-bird");
                    
                    Message.append(loseimg);

                }

                let trybttn =document.createElement("button");
                trybttn.innerHTML="Try Again";
                trybttn.setAttribute("class" , "try-again");
                Message.append(trybttn);

                trybttn.onclick=function(){
                    location.href='../page1.html';
                }   
                
                let d = new Date();
                localStorage.setItem("name" , sessionStorage.getItem("name"));
                localStorage.setItem("score" , Score.innerHTML);
                localStorage.setItem("date", d.toLocaleString());

            }
        }, 1000);
    }
    updateTimer(Timer);

    //bomb
    function bomb(){
        let bombElement=document.createElement("img");
        bombElement.src=('./images/bomb.gif');
        bombElement.setAttribute("class" , "bomb");
        
        birdsdiv.appendChild(bombElement);

        let down=0;
        let leftt = Math.floor(Math.random()*(innerWidth-bombElement.width));
        bombElement.style.left= leftt + "px";
        bombElement.style.top=down + "px";

        const moveDown=function(){
            let bid=setInterval(function(){
                down+=10;
                if(down<innerHeight-bombElement.height-150){
                    bombElement.style.top = down + "px";
                    bombElement.style.left = leftt + "px";
                }
                else{
                    clearInterval(bid);
                    bombElement.remove();
                }
                if(Timer.innerHTML==0){
                    clearInterval(bid);
                    bombElement.onclick=null;
                }
                
            },60)

            bombElement.onclick=function(){
                let bleft =bombElement.offsetLeft - 400;
                let bright =bleft + bombElement.width + 600;
                let btop = bombElement.offsetTop - 400;
                let bdown = btop + bombElement.height + 600;
                let birdsArray = document.getElementsByClassName("birdsimgs");
    
                for(let i = 0 ; i< birdsArray.length ; i++){
                    let leftBird = birdsArray[i].offsetLeft + (0.5*birdsArray[i].width);
                    let topBird = birdsArray[i].offsetTop + (0.5*birdsArray[i].height);
    
                    if(bleft < leftBird && leftBird < bright && btop < topBird && topBird < bdown ){
                        
                        birdsArray[i].onclick(); 
                    } 
                }
                bombElement.src=('./images/fire.gif');
                clearInterval(bid);
                setInterval(function(){
                    bombElement.classList.add('hidden')
                },800);
            }   
        } 
        moveDown();
    }
    let bombint = setInterval(bomb,5000);

})
 