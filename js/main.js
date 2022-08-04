window.onload = function()
{
	paintMap("maxOfAll");	//"maxOfAll" | "need_Have" | "threshold"
	getStat (1,0);
	$('.hBtn').bind('click', switchBtn);

	for(var key in municipalitiesArr)
	{	// вывод списка регионов с цифрами (боковая панель)
		$('.regioHere').append('<li class='+ municipalitiesArr[key] +'><input disabled class="regNotBtn" type="button" value='+ municipalitiesArr[key][0] +'></input><input class="regInp" type="number" value='+ municipalitiesArr[key][1] +'></input><input class="regInp" type="number" value='+ municipalitiesArr[key][2] +'></input><input class="regInp" type="number" value='+ municipalitiesArr[key][3] +'></input><input class="regInp" type="number" value='+ municipalitiesArr[key][4] +'></input></li>');
	}
}

let municipalitiesArrVal = Object.values(municipalitiesArr);


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
	percent = maxPers - (Math.floor(defNum/max*maxPers));	// инверсия процента
	if (percent < 0 || percent == -Infinity) { percent = 0; };	//  <- под вопросом
	return percent;
}; 

function paintMap(paintStyle)
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
			let blueSeg = 0;	// 255 - любимый Ромочкин
			
			switch (paintStyle)
			{
				case "maxOfAll":
			actPerc = transNumber(municipalitiesArr[key][1], municipalMax, 255);	// max -> min все округа
			break;
				case "need_Have":
			actPerc = transNumber(municipalitiesArr[key][2], municipalitiesArr[key][1], 255);	// разница потребность/трудоустройство
			break;
				case "threshold":
			actPerc = transNumber(municipalitiesArr[key][1], municipalitiesArr[key][4], 255);
			break;
			default:
				console.log ("Не установлен стиль закраса карты!");
			}
			
			redSeg = 255-actPerc;
			greenSeg = actPerc;		//	255-actPerc - если разница в потреб/трудоустр
			$('#'+key).attr("style", "fill: rgb("+redSeg+","+greenSeg+","+blueSeg+")");
		}
	}; 
// ^^^^^^^^^^ покраска областей карты ^^^^^^^^^^
}

function getStat (needVisib, haveVisib)
{//	........... вывод значений на карту ...........
	for (var key in municipalitiesArr)
	{
		if (municipalitiesArr[key] === null){
		} else {
			if (needVisib == 1 && haveVisib == 1) {console.log (1)
				$('.'+key).text(municipalitiesArr[key][1]+" / " +municipalitiesArr[key][2]);
			} else if (needVisib == 1 && haveVisib == 0){
				$('.'+key).text(municipalitiesArr[key][1]);
			} else if (needVisib == 0 && haveVisib == 1){
				$('.'+key).text(municipalitiesArr[key][2]);
			} else if (needVisib == 0 && haveVisib == 0){
				$('.'+key).text("");
			}
		}
	}
	//	^^^^^^^^^^ вывод значений на карту ^^^^^^^^^^
}


// +++++++++++++++++++++++++++ Всплывающее описание +++++++++++++++++++++++++++
$('.part').hover (
	function() {
	$('.description').html($(this).attr('description-data') + "<br><br>Кол-во: " + municipalitiesArrVal[$(this).attr('id')]);
		$('.description').fadeIn(1);
	},
	function() {
		$('.description').fadeOut(1);
	}
)

/* $('.regioName, .regioNamber').hover (
	function() {// КАК ЭТО РАБОТАЕТ, БДЯ!
		$('.description').html($(this).css('visibility', 'hidden;'));
		setTimeout(()=>{
		$('.description').html($(this).css('visibility', 'visible;'));
		}, 1000);
	},
	function() {
		$('.description').html($(this).css('visibility', 'visible;'));
	}
) */


$('.title').click(function(){$('.title').attr("hidden",true);});
$('.vuz').click(function(){$('.vuz').attr("hidden",true);});