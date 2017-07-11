function miPrende() {
	$.get('/Pc_On');
};	

function miSave() {
	var miarr = [];
    $("li").each(function(){
        miarr.push($(this).text());
    });	
	$.ajax({type: 'DELETE',url: '/data',success: function(result) {} });
	$.ajax({type:'POST', url:'/data',
	    data:JSON.stringify({ elArr: miarr }), contentType:"application/json"
	});
}

function miLoad() {
	$('ul').empty();  //necesario para RELOAD
	$.get("/data", function(data, status){
		for (var key in data) {
			var newLi = $('<li>' + data[key].descr + '</li>');
			newLi.on('click', function() {
				$(this).remove(); 
			});
			$('ul').append(newLi); 		
		}
	});
};

function miShow() {
    $("li").each(function(){
        alert($(this).text())
    });
};

$(document).ready(function() {
    $('form').submit(function() {
        if ($('#task').val() !== '') {
            var newTask = $('#task').val();
			
			var miarr = [];
			miarr.push(newTask);
			$.ajax({type:'POST', url:'/data',
					data:JSON.stringify({ elArr: miarr }), contentType:"application/json"
			});			
			
            var newLi = $('<li>' + newTask + '</li>');
            newLi.on('click', function() {
            		$(this).remove(); 
            });
            $('ul').append(newLi); 
            $('#task').val('');
            return false; 
        }
    });
    $('ul').sortable(); 
	miLoad();
});