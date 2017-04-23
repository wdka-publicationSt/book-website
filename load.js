function generate_toc(headings){
    console.log('menu');
    var menu = '' //an empty menu to start
    headings.each( function(h){ //for each heading
	var el_id = $(this).attr('id'); //get its id
	var el_text = $(this).text(); //get its text
	var menu_item = '<li><a href="#' + el_id + '">' + el_text + '</a></li>' //build a <li> with <a> pointing to each <h1> in text 
	menu = menu + menu_item;
    })
	menu = '<ul>'+menu+'</ul>'; //wrap all <li>s inside <ul> </ul>
    return menu
}

var sections = [];
var h1s ;
$(document).ready(
    function(){
	// maybe content should not be loaded onto the DOM
	// but to a variable that can be parsed
	$.get('./content.html', function(content){
	    html = $.parseHTML( content );
	    $('div#content').append( content );
//	    cont = content; 
	    h1s = $('div#content').find('h1');
	    
	    h1s.each( function(h1){
		var el_id = $(this).attr('id'); //get its id		    
		//wrap chpters into divs
		var h1_next = $(this).nextUntil('h1'); //els from h1 to next h1
		h1_next = h1_next.add($(this)); //include h1
		sections.push(h1_next);
	    })
		console.log( sections );
	    $('div#content').text('');
	    sections_length = sections.length;
	    for (var i=0; i < sections_length; i++) {   
		$('div#content').append('<div class="section" id="section_'+i +'" ></div>');
		$('div#section_'+i).append( sections[i] );
	    }
	    } , 'html' )
	
	
	////// Creating menu
	$('h1').css('color','#000');
	var menu = generate_toc(h1s); //create menu by running generate_toc(all_h1s) 
	$('div#content').before(menu); //insert menu before div#content

    }
)

