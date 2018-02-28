var jogadores = [];

var start;

var cont = 0;

var tempoPartida;
var inicioPartida;

function Pessoa(nome,sexo,tipo,pontuacao,jogada,resultadoPartida,partidaDisputadas,tempoTotal){
	this.nome = nome;
	this.sexo = sexo;
	this.tipo = tipo;
	this.pontuacao= 0;	
	this.jogada= jogada;
	this.resultadoPartida=resultadoPartida;
	this.partidaDisputadas= partidaDisputadas;
	this.tempoTotal = tempoTotal;

	
}


function converTempo(num){

	var hora = Math.floor(num/3600000)%24;
    var min = Math.floor(num/60000)%60;
    var seg = Math.floor(num/1000)%60;
	var hms = hora+" : "+min+" : "+seg;
	return hms;	
}

 function analisaJogada(escolha1, escolha2) {

 	

    if (escolha1 === escolha2){
   	 		return "empate"
    	}
    else if (escolha1 === "pedra" && escolha2==="tesoura" || escolha1 === "papel" && escolha2==="pedra" ||  escolha1 === "tesoura" && escolha2==="papel") {
    		return "jogador1"

       }
        else if (escolha1 === "pedra" && escolha2==="papel" || escolha1 === "papel" && escolha2==="tesoura"|| escolha1 === "tesoura" && escolha2==="pedra") {
    		return "jogador2"
       }

   }

function cadastrarJogador() {
	inicioPartida = performance.now();

	var nome =document.forms.cadastro.nome.value;
	var sexo = document.forms.cadastro.sexo.value;
	var tipo = "humano";
	var jogador = new Pessoa(nome,sexo,tipo,0,"","",0,0);
	
	return jogador;
}

function cadastrarComputador(){
	var cpuNome = "Computador";
	var cpuSexo = "Indefinid";
	var cpuTipo = "computer";
	var comp = new Pessoa(cpuNome,cpuSexo,cpuTipo,0,"","","-","-");

	return comp;
}



function inserirNaTabela(jogador,time,timetotal){

	var tabela = document.getElementById("JogadoresCadastrados");
	var row = tabela.insertRow();

	if(cont%2==0){
		row.className = "par";
		cont ++;
	}else{
		row.className = "impar";
		cont++;
	}
	row.insertCell().innerHTML = jogador.nome;
	row.insertCell().innerHTML = jogador.tipo;
	row.insertCell().innerHTML = jogador.jogada;
	row.insertCell().innerHTML = jogador.resultadoPartida;	
	row.insertCell().innerHTML = jogador.pontuacao;	
	row.insertCell().innerHTML = jogador.partidaDisputadas;
	row.insertCell().innerHTML = time;	
	row.insertCell().innerHTML = timetotal;	
}


function apagaLinha() {
	document.getElementById("JogadoresCadastrados").deleteRow(2);
    document.getElementById("JogadoresCadastrados").deleteRow(1);
}

function opcaoCpu(){
	var num =Math.floor(Math.random() * 3);

	if (num == 0)
		return "papel";
	
	 else if(num == 1)
		return "pedra";

	else
		return "tesoura";	
}

function pontuacaoJogadores(res){
	var pontos=[];

	if (res === "jogador1") {
		pontos[0]= 3;
		pontos[1]= 0;
		pontos[2]="Ganhou";
		pontos[3]="Perdeu";
		return pontos;
	}else if (res === "jogador2") {
		pontos[0]= 0;
		pontos[1] = 3;
		pontos[2]="Perdeu";
		pontos[3]="Ganhou";
		return pontos;
	}else if (res === "empate"){
		pontos[0]= 1;
		pontos[1]= 1;
		pontos[2]="Empate";
		pontos[3]="Empate";
		return pontos;
	}


}

function validaNome(nome){
	var contador= 0;
	while(contador < jogadores.length){
		if (nome === jogadores[contador].nome) {
			return contador;

	}

	contador = contador+ 2;
}
return -1;
}

function carregaInfomacoes(escolhaMAn) {
			
	var play = cadastrarJogador();
	var cpu = cadastrarComputador(); 
	
	var escolhaCpu = opcaoCpu();
	var res= analisaJogada(escolhaMAn, escolhaCpu);
	alert("computador escolheu: " + escolhaCpu);

	var pontos = pontuacaoJogadores(res);

	play.pontuacao = pontos[0];
	play.jogada=escolhaMAn;
	play.resultadoPartida=pontos[2];
	play.partidaDisputadas+=1;

	cpu.pontuacao = pontos[1];
	cpu.jogada= escolhaCpu;
	cpu.resultadoPartida=pontos[3];


	

	if (jogadores.length === 0){

		jogadores.push(play);
		jogadores.push(cpu);
		play.tempoTotal = tempoPartida;
		inserirNaTabela(jogadores[0],converTempo(tempoPartida),converTempo(play.tempoTotal));
		inserirNaTabela(jogadores[1],"-","-");
	

	}else{
		var nomevalido = validaNome(play.nome);
		

		if (nomevalido === -1) {
				
			jogadores.push(play);
			jogadores.push(cpu);
			
			inserirNaTabela(jogadores[jogadores.length-2],converTempo(tempoPartida),converTempo(tempoPartida));
			inserirNaTabela(jogadores[jogadores.length-1],"-","-");
		}else{
			
			jogadores[nomevalido].pontuacao += play.pontuacao;
			jogadores[nomevalido].jogada=escolhaMAn;
			jogadores[nomevalido].resultadoPartida=pontos[2];
			jogadores[nomevalido].partidaDisputadas++;

			jogadores[nomevalido+1].pontuacao += cpu.pontuacao;
			jogadores[nomevalido+1].jogada= escolhaCpu;
			jogadores[nomevalido+1].resultadoPartida=pontos[3];

			jogadores[nomevalido].tempoTotal += tempoPartida;
			var tempoFinal=jogadores[nomevalido].tempoTotal;

			inserirNaTabela(jogadores[nomevalido],converTempo(tempoPartida),converTempo(tempoFinal));
			inserirNaTabela(jogadores[nomevalido+1],"-","-");
		}

		var table = document.getElementById("JogadoresCadastrados");
	
		var rowLength = table.rows.length;

		for(var i=1; i<rowLength; i+=2){
			
			var row = table.rows[i];
			var row2 = table.rows[(i + 1)];
			
			if (row.cells[0].textContent.indexOf(document.forms.cadastro.nome.value) >= 0) {
				row.style.display = "";
				row2.style.display = "";
			} 
			else{
				row.style.display = "none";
				row2.style.display = "none";
			}
		}

	}
				


}


	$(document).ready(function() {
			
			$(".selecionaJogada").hide();
			$("#dadosCadastrados").hide();
			$(".continuaJogo").hide();

		

			$("#cpu").click(function(){
				$(".selecionaJogada").show();
				$("#inicio").hide();

			});

			$(".continuar").click(function(){
				$(".selecionaJogada").show();
				$(".continuaJogo").hide();
				$("#dadosCadastrados").hide();
				
				tempoPartida = (performance.now() - inicioPartida);

			});
			$(".sair").click(function(){
				$(".selecionaJogada").hide();
				$(".continuaJogo").hide();
				$("#dadosCadastrados").hide();
				$("#inicio").show();
			});


			$(".escolha").click(function() {
			$("#dadosCadastrados").show();
				tempoPartida = (performance.now() - inicioPartida);

			 	var escolhaMAn = $(this).attr('value');
    			if (jogadores.length > 0) {
//        				apagaLinha();
    				carregaInfomacoes(escolhaMAn);
    				$(".continuaJogo").show();
    				$(".selecionaJogada").hide();
    		
    			}else{
			
					carregaInfomacoes(escolhaMAn);
					$(".continuaJogo").show();
					$(".selecionaJogada").hide();
				}
			});


		});


