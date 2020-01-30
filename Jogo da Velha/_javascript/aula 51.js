var jogo = [[],[],[]];
var tabuleiro = [[],[],[]];
var quemJoga = 0; // 0 - CPU | 1  - Jogador 1 | 2 - Jogador 2;
var verifica;
var jogando = true;
var nivel = 2;
var quemComeca = 0;
var peca = "X";

var modoDoisJogadores = false;


var tagControlaNivel = document.querySelector("#tagControlaNivel");
var tagsQuantJogadores = document.querySelectorAll("input[name='quantJogadores']");


tagsQuantJogadores[0].addEventListener("change",motorVerificaQuantJogadores);
tagsQuantJogadores[1].addEventListener("change",motorVerificaQuantJogadores);




function motorVerificaQuantJogadores(){


for(var x = 0; x < tagsQuantJogadores.length; x++){

if(tagsQuantJogadores[x].checked)    
modoDoisJogadores = parseInt(tagsQuantJogadores[x].value);

}


if(!(modoDoisJogadores) && (quemJoga == 2)){

    quemJoga = 0;
    CpuJoga();    

}


}





tagControlaNivel.addEventListener("change",function(){

nivel = this.value;


});



var posJogo = document.querySelectorAll(".posJogo");
var btIniciaJogo = document.querySelector("#btIniciaJogo"); 


function addEventosJogar(){

for(var x = 0; x < posJogo.length; x++){

posJogo[x].addEventListener("click",Jogar);

}

}


btIniciaJogo.addEventListener("click",Inicio);


Inicio();

function Inicio(){

jogando = true;
jogo = [
        ["","",""],
        ["","",""],
        ["","",""]
       ];

tabuleiro = [
                [document.querySelector("#p1"),document.querySelector("#p2"),document.querySelector("#p3")],
                [document.querySelector("#p4"),document.querySelector("#p5"),document.querySelector("#p6")],
                [document.querySelector("#p7"),document.querySelector("#p8"),document.querySelector("#p9")]
            ];
            
motorVerificaQuantJogadores();            
AtualizaTabuleiro(); 
addEventosJogar();   

if(modoDoisJogadores)
    quemComeca = (quemComeca == 1) ? 2 : 1;
else
    quemComeca = (quemComeca == 0) ? 1 : 0;


if(quemComeca){
    
    quemJoga = quemComeca;
    
    if(quemComeca == 1)
        peca = "X";
    else
        peca = "O";


    var strMsg = "Jogador" + " " + peca;
   

    document.querySelector("#dvQuemComeca").innerHTML = "Quem Começa: " + strMsg; 
}else{
   
    quemJoga = quemComeca;
    peca = "O";
   var strMsg = "CPU";

   document.querySelector("#dvQuemComeca").innerHTML = "Quem Começa:" + strMsg;
   
   CpuJoga();
 
}


}

function AtualizaTabuleiro(){

    for(var l = 0; l < 3; l++){
        
        for(var c = 0; c < 3; c++){

            if(jogo[l][c] == "X"){
                tabuleiro[l][c].innerHTML = "X";
                tabuleiro[l][c].style.cursor = "default";
            }else if(jogo[l][c] == "O"){
                tabuleiro[l][c].innerHTML = "O";
                tabuleiro[l][c].style.cursor = "default";
            }else{
                tabuleiro[l][c].innerHTML = "";
                tabuleiro[l][c].style.cursor = "pointer";
            }    
        }
    }

}


function CpuJoga(){


if(jogando){

    var l,c;

    if(nivel == 1){

        do{

        l = Math.round(Math.random() * 2);
        c = Math.round(Math.random() * 2);    

        }while(jogo[l][c] != "");

        jogo[l][c] = "O";

    }else if(nivel == 2){

      

            if(!(FechaJogo())){

        if(!(VerificaExtremidades(["X"]))){ 

           if(!(VerificaCentros(["X"]))){

            if(!(VerificaMeio())){
            
            if(!(VerificaExtremidades2("O"))){
                    
                if(!(VerificaCentros2("O"))){
             
                    do{

                        l = Math.round(Math.random() * 2);
                        c = Math.round(Math.random() * 2);    
                
                        }while(jogo[l][c] != "");
                
                        jogo[l][c] = "O";
                         
                }    

           }

        }
        
    }
        
    }
          
      }
    
    
    } else if(nivel == 3){






    }
                    
    
    

AtualizaTabuleiro();
var msgFinal;
var empate;
verifica = VerificaVitoria();

if(verifica == ""){
    var empate = VerificaEmpate();

    if(empate)
        msgFinal = "Deu Velha!";

}else{
    msgFinal = verifica + " Venceu!";

}    


if(verifica != "" || empate){

alert(msgFinal);
jogando = false;
}else{
peca = "X";
quemJoga = 1;

}

}

}


function VerificaMeio(){
      

    var jogadaRealizada = false;

    if(jogo[1][1] == ""){
        jogo[1][1] = "O";
        jogadaRealizada = true;
    }    

    return jogadaRealizada;

}


function FechaJogo(){



 if(!(VerificaExtremidades("O"))){

    if(!(VerificaCentros("O"))){

        return false;
    }    

    return true;
}    

return true; 

}



function VerificaExtremidades(simbolos){


  
 var jogadasPosiveis = [];  

for(var x = 0; x < simbolos.length; x++){

    jogadasPosiveis = [];    

if(
    ((jogo[0][0] == "") && (jogo[0][1] == simbolos[x]) && (jogo[0][2] == simbolos[x])) ||   
    ((jogo[0][0] == "") && (jogo[1][1] == simbolos[x]) && (jogo[2][2] == simbolos[x])) ||
    ((jogo[0][0] == "") && (jogo[1][0] == simbolos[x]) && (jogo[2][0] == simbolos[x]))
  ){

    jogadasPosiveis.push([0,0]);
}

if(
    ((jogo[2][0] == "") && (jogo[1][0] == simbolos[x]) && (jogo[0][0] == simbolos[x])) ||   
    ((jogo[2][0] == "") && (jogo[1][1] == simbolos[x]) && (jogo[0][2] == simbolos[x])) ||
    ((jogo[2][0] == "") && (jogo[2][1] == simbolos[x]) && (jogo[2][2] == simbolos[x]))
  
    ){

        jogadasPosiveis.push([2,0]); 

}

if(
   ((jogo[0][2] == "") && (jogo[0][1] == simbolos[x]) && (jogo[0][0] == simbolos[x])) ||   
   ((jogo[0][2] == "") && (jogo[1][1] == simbolos[x]) && (jogo[2][0] == simbolos[x])) ||
   ((jogo[0][2] == "") && (jogo[1][2] == simbolos[x]) && (jogo[2][2] == simbolos[x]))
   ){
  
            jogadasPosiveis.push([0,2]); 
  
}

if(
    ((jogo[2][2] == "") && (jogo[2][1] == simbolos[x]) && (jogo[2][0] == simbolos[x])) ||   
    ((jogo[2][2] == "") && (jogo[1][1] == simbolos[x]) && (jogo[0][0] == simbolos[x])) ||
    ((jogo[2][2] == "") && (jogo[1][2] == simbolos[x]) && (jogo[0][2] == simbolos[x]))
   ){
  
     jogadasPosiveis.push([2,2]); 
  
    }


if(jogadasPosiveis.length)
    break;


}


return SorteiaJogada(jogadasPosiveis);

}



function VerificaCentros(simbolos){


 
  
    var jogadasPosiveis = [];  
   
   for(var x = 0; x < simbolos.length; x++){
   

       jogadasPosiveis = [];    
   

       if(
           ((jogo[1][0] == "") && (jogo[1][1] == simbolos[x]) && (jogo[1][2] == simbolos[x])) ||   
           ((jogo[1][0] == "") && (jogo[0][0] == simbolos[x]) && (jogo[2][0] == simbolos[x]))
          ){
       
           jogadasPosiveis.push([1,0]);
       
       }
       
       if(
           ((jogo[0][1] == "") && (jogo[0][0] == simbolos[x]) && (jogo[0][2] == simbolos[x])) ||   
           ((jogo[0][1] == "") && (jogo[1][1] == simbolos[x]) && (jogo[2][1] == simbolos[x]))
          ){
       
           jogadasPosiveis.push([0,1]);
       
       }
       
       if(
           ((jogo[1][2] == "") && (jogo[1][1] == simbolos[x]) && (jogo[1][0] == simbolos[x])) ||   
           ((jogo[1][2] == "") && (jogo[0][2] == simbolos[x]) && (jogo[2][2] == simbolos[x]))
          ){
       
           jogadasPosiveis.push([1,2]);
       }

       if(
           ((jogo[2][1] == "") && (jogo[2][0] == simbolos[x]) && (jogo[2][2] == simbolos[x])) ||   
           ((jogo[2][1] == "") && (jogo[1][1] == simbolos[x]) && (jogo[0][1] == simbolos[x]))
          ){
       
           jogadasPosiveis.push([2,1]);
       }
   
   
   
   
   if(jogadasPosiveis.length)
       break;
   
   }
   
   
   
return SorteiaJogada(jogadasPosiveis);    


}





function VerificaExtremidades2(simbolo){


  
   var jogadasPosiveis = [];  
    
    
    if(
        ((jogo[0][0] == "") && (jogo[0][1] == simbolo || jogo[0][1] == "") && (jogo[0][2] == simbolo || jogo[0][2] == "")) ||   
        ((jogo[0][0] == "") && (jogo[1][1] == simbolo || jogo[1][1] == "") && (jogo[2][2] == simbolo || jogo[2][2] == "")) ||
        ((jogo[0][0] == "") && (jogo[1][0] == simbolo || jogo[1][0] == "") && (jogo[2][0] == simbolo || jogo[2][0] == ""))
      ){
    
        jogadasPosiveis.push([0,0]);             
    
    
    }
    
    if(
       ((jogo[2][0] == "") && (jogo[1][0] == simbolo || jogo[1][0] == "") && (jogo[0][0] == simbolo || jogo[0][0] == "")) ||   
        ((jogo[2][0] == "") && (jogo[1][1] == simbolo || jogo[1][1] == "") && (jogo[0][2] == simbolo || jogo[0][2] == "")) ||
       ((jogo[2][0] == "") && (jogo[2][1] == simbolo || jogo[2][1] == "") && (jogo[2][2] == simbolo || jogo[2][2] == ""))
      ){
    
        jogadasPosiveis.push([2,0]);    
              
    
    }
    
    if(
      ((jogo[0][2] == "") && (jogo[0][1] == simbolo || jogo[0][1] == "") && (jogo[0][0] == simbolo || jogo[0][0] == "")) ||   
        ((jogo[0][2] == "") && (jogo[1][1] == simbolo || jogo[1][1] == "") && (jogo[2][0] == simbolo || jogo[2][0] == ""))  ||
       ((jogo[0][2] == "") && (jogo[1][2] == simbolo || jogo[1][2] == "") && (jogo[2][2] == simbolo || jogo[2][1] == ""))
      ){
      
        jogadasPosiveis.push([0,2]);        
              
      
    }
    
    if(
       ((jogo[2][2] == "") && (jogo[2][1] == simbolo || jogo[2][1] == "") && (jogo[2][0] == simbolo || jogo[2][0] == "")) ||   
       ((jogo[2][2] == "") && (jogo[1][1] == simbolo || jogo[1][1] == "") && (jogo[0][0] == simbolo || jogo[0][0] == ""))  ||
       ((jogo[2][2] == "") && (jogo[1][2] == simbolo || jogo[1][2] == "") && (jogo[0][2] == simbolo || jogo[0][2] == ""))
       ){
      
        jogadasPosiveis.push([2,2]);          
         
    }


    
     
    return SorteiaJogada(jogadasPosiveis);    


}





function VerificaCentros2(simbolo){



  
    var jogadasPosiveis = [];  
   
  
   

       if(
           ((jogo[1][0] == "") && (jogo[1][1] == simbolo || jogo[1][1] == "") && (jogo[1][2] == simbolo || jogo[1][2] == "")) ||   
           ((jogo[1][0] == "") && (jogo[0][0] == simbolo || jogo[0][0] == "") && (jogo[2][0] == simbolo || jogo[2][0] == ""))
          ){
       
           jogadasPosiveis.push([1,0]);
       
       }
       
       if(
           ((jogo[0][1] == "") && (jogo[0][0] == simbolo || jogo[0][0] == "") && (jogo[0][2] == simbolo || jogo[0][2] == "")) ||   
           ((jogo[0][1] == "") && (jogo[1][1] == simbolo || jogo[1][1] == "") && (jogo[2][1] == simbolo || jogo[2][1] == ""))
          ){
       
           jogadasPosiveis.push([0,1]);
       
       }
       
       if(
           ((jogo[1][2] == "") && (jogo[1][1] == simbolo || jogo[1][1] == "") && (jogo[1][0] == simbolo || jogo[1][0] == "")) ||   
           ((jogo[1][2] == "") && (jogo[0][2] == simbolo || jogo[0][2] == "") && (jogo[2][2] == simbolo || jogo[2][2] == ""))
          ){
       
           jogadasPosiveis.push([1,2]);
       }
       
       if(
           ((jogo[2][1] == "") && (jogo[2][0] == simbolo || jogo[2][0] == "") && (jogo[2][2] == simbolo || jogo[2][2] == "")) ||   
           ((jogo[2][1] == "") && (jogo[1][1] == simbolo || jogo[1][1] == "") && (jogo[0][1] == simbolo || jogo[0][1] == ""))
          ){
       
           jogadasPosiveis.push([2,1]);
       }
   
   
  

   
   
return SorteiaJogada(jogadasPosiveis);    


}














function SorteiaJogada(jp){

    if(jp.length){
        
      
        var indiceSorteado = Math.round(Math.random() * (jp.length - 1));
        
        jogo[jp[indiceSorteado][0]][jp[indiceSorteado][1]] = "O";
        
        }


return jp.length;

}






function VerificaVitoria(){


var l,c;

for(l = 0; l < 3; l++){

if((jogo[l][0] != "") && (jogo[l][0] == jogo[l][1]) && (jogo[l][1] == jogo[l][2])){

return jogo[l][0];

}

}

for(c = 0; c < 3; c++){

    if((jogo[0][c] != "") && (jogo[0][c] == jogo[1][c]) && (jogo[1][c] == jogo[2][c])){
    
    return jogo[0][c];
    
    }
    
}

if((jogo[0][0] != "") && (jogo[0][0] == jogo[1][1]) && (jogo[1][1] == jogo[2][2])){
    
    return jogo[0][0];
    
    }

    if((jogo[0][2] != "") && (jogo[0][2] == jogo[1][1]) && (jogo[1][1] == jogo[2][0])){
    
        return jogo[0][2];
        
        } 




return "";

}


function VerificaEmpate(){

for(var x = 0; x < jogo.length; x++){

    for(var i = 0; i < jogo.length; i++){

        if(jogo[x][i] == "")
            return false
    }

}

return true;

}





function Jogar(){

var p = parseInt(this.getAttribute("id").substr(1,1));

if((jogando) && ((quemJoga))){

    switch (p){
       
        case 1: 

           if(jogo[0][0] == ""){
           jogo[0][0] = peca;
           posJogo[(p - 1)].removeEventListener("click",Jogar); 

          MudaQuemJoga(); 
           }
        
        break;

        case 2:   
        
            if(jogo[0][1] == ""){
            jogo[0][1] = peca;
            posJogo[(p - 1)].removeEventListener("click",Jogar);     

            MudaQuemJoga(); 

            }
        
        break;

            case 3:   
            
            if(jogo[0][2] == ""){
            jogo[0][2] = peca;
            posJogo[(p - 1)].removeEventListener("click",Jogar); 

            MudaQuemJoga(); 

            }
            
            break;

        case 4:   
        
          if(jogo[1][0] == ""){
          jogo[1][0] = peca;
          posJogo[(p - 1)].removeEventListener("click",Jogar); 
          MudaQuemJoga(); 

           }
        
        break;

        case 5:   
            
           if(jogo[1][1] == ""){
            jogo[1][1] = peca;
            posJogo[(p - 1)].removeEventListener("click",Jogar); 

            MudaQuemJoga(); 

            }
        
        break;

        case 6:   

        if(jogo[1][2] == ""){
        jogo[1][2] = peca;
        posJogo[(p - 1)].removeEventListener("click",Jogar); 
        MudaQuemJoga(); 

        }

        break;

        case 7:   

        if(jogo[2][0] == ""){
        jogo[2][0] = peca;
        posJogo[(p - 1)].removeEventListener("click",Jogar);  
        MudaQuemJoga(); 

        }

        break;


        case 8:   
        
        if(jogo[2][1] == ""){
        jogo[2][1] = peca;
        posJogo[(p - 1)].removeEventListener("click",Jogar); 
        MudaQuemJoga(); 

        }

        break;

        case 9:   
        
       if(jogo[2][2] == ""){
       jogo[2][2] = peca;
       posJogo[(p - 1)].removeEventListener("click",Jogar); 
       MudaQuemJoga(); 

       }
        
        break;

}   


    AtualizaTabuleiro();
    var msgFinal;
    var empate;

   
    verifica = VerificaVitoria();

   

    if(verifica == ""){
        var empate = VerificaEmpate();

        if(empate)
            msgFinal = "Deu Velha!";

    }else{
        msgFinal = verifica + " Venceu!";

    }    

 
    if(verifica != "" || empate){

    alert(msgFinal);
    jogando = false;
    }else{

      
        if(!(quemJoga))
            CpuJoga();
        else
            {
             if(peca == "X")   
                peca = "O";
             else
                peca = "X";  
             
           

             
            }

        }

   
}

}




function MudaQuemJoga(){

if(modoDoisJogadores){

quemJoga = (quemJoga == 1) ? 2 : 1; 


}else{

quemJoga = 0;    

}

} 