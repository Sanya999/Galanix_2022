var ImageView = class{
	imageList= null

	constructor() {

	}
	InitializeControls() {
        var self = this;
		self.imageList = Array.from({length: 12}, (_, i) => i + 1);
        self.SubscribeEvents();
    }

    SubscribeEvents() {
    	var self = this;
    	
    	self.ContainerHeigth(self.imageList.length);
    	self.FillGrid();
    	self.CountImgAndOutputDate();

    	$("img").click(function() {
    		self.ShowFullImage($(this).attr("src"));
    	});

    	$("#helper").click(function() {
    		self.ReadMe();
    	});
    }

    ReadMe () {
    	alert("По часу не встигаю добавити 9-те завднання, але якщо ви подивитесь на код, особливо на JS," + 
    		" то ви побачите що він писався спеціально продумуючи наперед видалення картинок (висота контейнера наприклад)\n" +
    		"А речі по типу адаптації в 2 і 1 ряд краще було зробити бутстрапом, але написано для попапів не використовувати " +
    		"готове, то я і тут не використола готове, а написала сама");
    }

	ClosePopUp() {
		$("#imagePlaceholder").html('');
		$("#imagePlaceholder").css("display", "none");
	}

    ShowFullImage (src) {
		var self = this;

    	$("#imagePlaceholder").css("display", "flex");
    	$("#imagePlaceholder").append("<img src=\"" + src + "\" class=\"imageFilePlaceholder\">");
    	$("#imagePlaceholder").append("<button id=\"buttonClose\">Close</button>");
    	$("#buttonClose").css("left", ($(".imageFilePlaceholder").width() + $(".imageFilePlaceholder").offset().left  - 50) + "px");
    	$("#buttonClose").click(function() {
    		self.ClosePopUp();
    	});
    }

    FillGrid () {
    	var self = this;

    	$.each(self.imageList, function (index, value){
			if (index % 4 == 0){
				
				$(".container").append("<div class=\"row\"></div>");

				if (index % 2 == 0){
					$(".container div.row:last").append("<div class=\"row_900\"></div>");

				}
				$(".container div.row:last div.row_900:last").append("<div class=\"imageBlock\"></div>");

				$(".container div.row:last div.row_900:last div.imageBlock:last")
					.append("<img class=\"imageFile firstImage\" src=\"img/"+ value + ".jpg\">");
			}
			else if (index % 2 == 0){
				$(".container div.row:last").append("<div class=\"row_900\"></div>");
				$(".container div.row:last div.row_900:last").append("<div class=\"imageBlock\"></div>");

				$(".container div.row:last div.row_900:last div.imageBlock:last")
					.append("<img class=\"imageFile\" src=\"img/"+ value + ".jpg\">");
			}
			else{
				$(".container div.row:last div.row_900:last").append("<div class=\"imageBlock\"></div>");

				$(".container div.row:last div.row_900:last div.imageBlock:last")
					.append("<img class=\"imageFile\" src=\"img/"+ value + ".jpg\">");
			}
			
			
	    });
	}

	CountImgAndOutputDate() {
		var self = this;
		var date = new Date(Date.now());
		var dateFormat = self.ToTwoSymbols(date.getDate()) + '.' + self.ToTwoSymbols(date.getMonth()) 
		+ '.' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
		$(".text_data").append($("img").length + ", " + dateFormat);
	}

	ContainerHeigth(imagesCount) {
		var windowsize = $(window).width();
		if (windowsize > 900){
			$(".container").css("height", (Math.floor(imagesCount/4) * 250)  + "px");
		}
		else if (windowsize > 500) {
			$(".container").css("height", (Math.floor(imagesCount/2) * 250)  + "px");
		}
		else{
			$(".container").css("height", (Math.floor(imagesCount) * 250)  + "px");
		}
	}

	ToTwoSymbols (dd) {
		dd = dd.toString();
		if (dd.length == 1) {
			return "0" + dd;
		}
		return dd;
	} 
}






