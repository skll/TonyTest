//===============================================                        
// 2011-8-24 添加的新版的商品规格的显示控制 by myx
var GuigeTitles= "";
$("#GuigeNewStyle dl dt").each(function(i){
	GuigeTitles += $(this).text() + " " ;
});
if ($(".guige").children("span").length == 0) { // 如果是新的商品样式
	$("#styleIdShow").html(GuigeTitles);//提示选择什么
}                        
var GuigeTempArr = new Array(); // 临时保存选中的规格
$("#GuigeNewStyle dd").bind('click', function() {
	if($(this).attr("class") == "emputy")
	{
	    $("#ifEmputyGuige").show();// 提示没有商品规格
		return;
	}
	$("#ifEmputyGuige").hide();
	// 清楚同类规格的其他选中状态
	if($(this).parent("dl").find("dd[class=selected]").length > 0){
		$(this).parent("dl").find("dd").removeClass("selected");
	}
	$(this).addClass("selected"); // 选中自己
	$("#GuigeTishiTitle").html("已选择：");
	$("#GuigeTishiTitle").css("color","#333333");
	var GuigeShowSelected = "";//保存选中的规格
	$("#GuigeNewStyle dl dd[class=selected]").each(function(){
	    GuigeShowSelected += "“"+ $(this).text() +"” ";
	});
	$("#styleIdShow").html(GuigeShowSelected);
	$("#styleIdShow").css("color","red");
	var thisValue = $(this).parent("dl").find("dt").text() + ":" + $(this).text() + ' ';// 组合选中内容
	GuigeTempArr[$(this).parent().index()] = thisValue;
	// 如果没有库存的显示为灰色
	var GuigeTempStrArr = "";
	var GuigeOtherStr = "";
	GuigeTempStrArr = $(this).parent("dl").find("dt").text() + ":" + $(this).text();
	for(var i = 0 ;i < GuigeJson.length; i++) // 遍历json数据
	{
		var JsonTempValue = GuigeJson[i].name;
			if(GuigeJson[i].name.indexOf(GuigeTempStrArr) > -1 && GuigeJson[i].kucun > 0){ // 如果json中有这条记录,并且库存大于0
				JsonTempValue = JsonTempValue.replace(GuigeTempStrArr,"");
				GuigeOtherStr += JsonTempValue;
			}
	}
	var pindex = $(this).parent("dl").index(); // 当前的规格index
	$("#GuigeNewStyle dl").each(function(i){
		if($(this).index() != pindex) // 判断除点击的其他类别规格
		{
			$(this).children("dd[class!=selected]").each(function(){
				if(GuigeOtherStr.indexOf($(this).parent("dl").find("dt").text() + ":" + $(this).text()) == -1){
					$(this).addClass("emputy"); //没有该项规格的
				}else{
					$(this).removeClass("emputy");//有该项规格的
				}
			});
		}
	});
	// 如果全部选择，会生成指定规格，可判断库存。
	if($("#GuigeNewStyle dl dd[class=selected]").length == $("#GuigeNewStyle dl").length){ 
		var GuigeTempAll = "";
		for(var i = 0 ; i < GuigeTempArr.length ; i++)
		{
			GuigeTempAll += GuigeTempArr[i] ;
		}
		GuigeTempAll = $.trim(GuigeTempAll);
		var selectIndex = -1;
		for(var i = 0 ; i < GuigeJson.length; i++)
		{
			if(GuigeJson[i].name == GuigeTempAll){
				selectIndex = i;
			}
		}
		if(selectIndex == -1){
			if(GuigeJson[selectIndex].kucun == 0){
				$("#ifEmputyGuige").show(); // 库存不足
			}else{
				$("#ifEmputyGuige").show(); //没有此项规格
			}
		}else { // 选择成功后赋值
			$("#styleId").val(GuigeJson[selectIndex].id);
		}
	}
		
});
//===============================================                        
// 老的商品规格                 
$(".guige span").bind('click', function() {
	if ($(this).attr("title") == "库存不足") {
		$("#ifEmputyGuige").show();
	} else {
		$("#ifEmputyGuige").hide();
		$(".guige span[id!=emputy]").removeAttr("id");
		//$(".guige span[id!=emputy]").css("border-width", "1px");
		$(this).attr("id", "onlickSelSize");
		//$(this).css("border-width", "2px");
		$("#styleIdShow").html($(this).text());
		$("#styleId").attr("value", $(this).attr("name"));
		$("#styleIdShow").css("color", "red");
	}
});
$(".guige span[title=库存不足]").attr("id", "emputy");
if ($(".guige").children("span").length == 1) {
   $(".guige span[title != 库存不足]").trigger("click");
}
if($(".guige").children("span[title='']").length == 0 && $(".guige span").length > 0) {
$("#ifEmputyGuige").show();
}