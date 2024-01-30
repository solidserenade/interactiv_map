window.onload = function()
{
	paintMap("need_Have", mainMunicipal);	//"maxOfAll" | "need_Have" | "targeted" | "threshold"
	getStat (1,1,0, mainMunicipal);
	$('.hBtn').bind('click', switchBtn);

	for(var key in mainMunicipal)
	{	// вывод списка регионов с цифрами (боковая панель)
		$('.regioHere').append('<li class='+ mainMunicipal[key] +'><input disabled class="regNotBtn" type="button" value='+ mainMunicipal[key][0] +'></input><input class="regInp" type="number" value='+ mainMunicipal[key][1] +'></input><input class="regInp" type="number" value='+ mainMunicipal[key][2] +'></input><input class="regInp" type="number" value='+ mainMunicipal[key][3] +'></input><input class="regInp" type="number" value='+ mainMunicipal[key][4] +'></input></li>');
	}
}

let municipalitiesArrVal = Object.values(mainMunicipal);


function changeRigioNum ()
{	// кнопка "Сохранить" в боковом меню.
	alert(1);
}

function showHideNames(targetToHide)
{
	if ($(targetToHide).css('display') == 'block')
	{
	$(targetToHide).css('display','none');
	} else {
	$(targetToHide).css('display','block');
	}
}

function switchBtn ()
{
	if($(this).css('background-color') == 'rgb(0, 204, 0)')
	{
		$(this).css('background-color','rgb(170, 170, 170)').css('color', 'grey');
	} else {
		$(this).css('background-color','rgb(0, 204, 0)').css('color', 'black');
	}
}

function transNumber(defNum, max, maxPers)
{
	if (defNum == 0) { defNum = 1; }	// <- под вопросом
	percent = Math.floor(defNum/max*maxPers);	// инверсия процента
	//console.log(percent);
	if (percent < 0 || percent == Infinity) { percent = maxPers; };	//  <- под вопросом
	return percent;
}; 

function paintMap(paintStyle, municipalitiesArr)
{// ........... покраска областей карты ...........
	let municipalMax = 0;
	
	for(var key in municipalitiesArr)
	{// определение максимального значения по муниципалитетам
		if (municipalMax < municipalitiesArr[key][1]) { municipalMax = municipalitiesArr[key][1] };
	}

	for(var key in municipalitiesArr)
	{
		if (municipalitiesArr[key][2] === null){
			$('#'+key).attr("style", "fill: white");
		} else {
			
			let redSeg = 0;
			let greenSeg = 0;
			let blueSeg = 0;
			
			switch (paintStyle)
			{
				case "maxOfAll":
			actPerc = transNumber(municipalitiesArr[key][1], municipalMax, 255);	// max -> min по всем округам
			$('.colorFAQ').html("Трудоустройство Max / Min");
			break;
				case "need_Have":
			actPerc = transNumber(municipalitiesArr[key][2], municipalitiesArr[key][1], 255);	// разница потребность/трудоустройство
			$('.colorFAQ').html("Потребность / Трудоустройство");
			break;
				case "targeted":
			actPerc = transNumber(municipalitiesArr[key][3], municipalitiesArr[key][1], 255);	// по целевикам
			$('.colorFAQ').html("Потребность / Целевое трудоустройство");
			break;
				case "have_tergeted":
			actPerc = transNumber(municipalitiesArr[key][3], municipalitiesArr[key][2], 255);	// с порогом
			$('.colorFAQ').html("Трудоустройство: Общее / Целевое");
			break;
				case "threshold":
			actPerc = transNumber(municipalitiesArr[key][4], municipalitiesArr[key][1], 255);	// с порогом
			$('.colorFAQ').html("Потребность с max порогом");
			break;
			
				case "extra":
			actPerc = transNumber(municipalitiesArr[key][4], municipalitiesArr[key][1], 255);	// с порогом
			$('.colorFAQ').html("Планируемая потребность / Текущие кол-во целевиков");
			break;
			
			default:
				alert ("Не установлен стиль закраса карты!");
			}
			
			redSeg = 255-actPerc;
			greenSeg = actPerc;		//	255-actPerc - если разница в потреб/трудоустр
			$('#'+key).attr("style", "fill: rgb("+redSeg+","+greenSeg+","+blueSeg+")");
		}
	}; 
// ^^^^^^^^^^ покраска областей карты ^^^^^^^^^^
}

function getStat (needVisib, haveVisib, celVisib,municipalitiesArr)
{//	........... вывод значений на карту ...........
	for (var key in municipalitiesArr)
	{
		if (municipalitiesArr[key] === null){
			alert ("municipalitiesArr[key] === null");
		} else {
			if (needVisib == 1 && haveVisib == 1 && celVisib == 1) // Все показатели
			{
				$('.'+key).text(municipalitiesArr[key][1]+" / " +municipalitiesArr[key][2]+" / " +municipalitiesArr[key][3]);
			} else if (needVisib == 1 && haveVisib == 1 && celVisib == 0) // Потребность / Трудоустройство
			{
				$('.'+key).text(municipalitiesArr[key][1]+" / " +municipalitiesArr[key][2]);
			} else if (needVisib == 1 && haveVisib == 0 && celVisib == 1) // Потребность / Целевое
			{
				$('.'+key).text(municipalitiesArr[key][1]+" / " +municipalitiesArr[key][3]);
			} else if (needVisib == 1 && haveVisib == 0 && celVisib == 0) // Потребность
			{
				$('.'+key).text(municipalitiesArr[key][1]);
			} else if (needVisib == 0 && haveVisib == 1 && celVisib == 1) // Трудоустройство/Целевое
			{
				$('.'+key).text(municipalitiesArr[key][2]+" / " +municipalitiesArr[key][3]);
			} 
		}
	}
	//	^^^^^^^^^^ вывод значений на карту ^^^^^^^^^^
}


// +++++++++++++++++++++++++++ Всплывающее описание +++++++++++++++++++++++++++
$('.part').hover (
	function() {
	let part = "<table>";
	for (i=1; i<need_obj['Subject'].length;i++){
		part += ('<tr><td>' + need_obj['Subject'][i] + '</td><td>' + need_obj[$(this).attr('id')][i] + '</td></tr>');
	}
	part += "</table>"
	
	$('.description_window').html('<h3>' + $(this).attr('description-data') + " (2026г.)</h3>Потребность: " + mainMunicipal[$(this).attr('id')][1] + " чел.<br>Целевое: " + mainMunicipal[$(this).attr('id')][3] + '<p>' + part);
	
		$('.description_window').fadeIn(1);
	},
	function() {
		$('.description_window').fadeOut(1);
	}
)


$('.title').click(function(){$('.title').attr("hidden",true);});
$('.vuz').click(function(){$('.vuz').attr("hidden",true);});