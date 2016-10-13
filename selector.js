//
function $(str){
	var arr = str.split(" ");
	var obj = document;			
	var lastBol = false;	//是否最后一个
	//名字数组
	for (var i = 0; i < arr.length; i++) {			
		obj = getObj(obj,arr[i]);
	};
	var len = obj.length;//名字个数
	if(len==undefined){//如果是ID则在第一位
		obj[0] = obj;
	}
	//获取元素
	function getObj (target,str) {
		var re_tag = /^[a-zA-Z]\w*$/;	//tag
		var re_id = /^#[a-zA-Z_]\w*$/;	//ID
		var re_class = /^\.[a-zA-Z_]\w*$/;	//class
		if (re_id.test(str)) {
			str = str.substring(1);//去#号
			target = document.getElementById(str);
		}else{
			var fnlArr = [];//目标数组
			var tempArr = [];//标签或类名临时数组
			if (target.length==undefined) {
				target=[target];// target[0]=document
			}			
			for (var i = 0; i < target.length; i++) {
				if (re_tag.test(str)) {
					tempArr = target[i].getElementsByTagName(str);
				};
				if (re_class.test(str)) {
					str = str.substring(1);//去点
					tempArr = getClass(target[i],str);
				};	
				for (var j = 0; j < tempArr.length; j++) {
						fnlArr.push(tempArr[j]);
					};
			};		
			target = fnlArr;
		}
		//class名
		function getClass(obj2,className) {
		 	if (obj2.getElementsByClassName) {
		 		return obj2.getElementsByClassName(className);
		 	}else{
		 		var all = document.getElementsByTagName("*");
		 		var arr = [];
		 		var reg = new RegExp("\\b"+className+"\\b")
		 		for (var i = 0; i < all.length; i++) {
		 			if (reg.test(all[i].className)) {
		 				arr.push(all[i]);
		 			};
		 		};
		 		return arr;
		 	}
 		}
		return target;
	}
	//css
	obj.css = function(styles){	
		if(lastBol){//最后一个
			for(var key in styles){
				this.style[key] = styles[key];
			}
			return this;
		}
		for(var i=0;i<len;i++){
			for(var key in styles){
				this[i].style[key] = styles[key];
			}
		}	
	}
	//last
	obj.last = function (){		
		lastBol=true;			
		obj[len-1].hide = this.hide;
		obj[len-1].show = this.show;
		this.css = this.css;
		return obj[len-1];
	} 
	//hide
	obj.hide =  function (){
		if(!len || lastBol){
			if(!this.initDisplay){
				this.initDisplay = window.getComputedStyle(this).display || this.currentStyle.display;
			}
			this.style.display = "none";
		}else{
			for(var i=0;i<len;i++){
				if(!this[i].initDisplay){
					this[i].initDisplay = window.getComputedStyle(this[i]).display || this[i].currentStyle.display;
				}
				this[i].style.display = "none";
			}		
		}		
	}
	//show
	obj.show = function(){
		if(!len ||lastBol){
			this.style.display = this.initDisplay || "block";
		}else{
			for(var i=0;i<len;i++){
				this[i].style.display = this[i].initDisplay || "block";			
			}
		}
		this.css = this.css;
		return this;
	}
	return obj;
}