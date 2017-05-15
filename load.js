
function create_sections(content){
    // wraps <h1> & elments that follow, until next <h1>, within a <div class="section" id="section_N'>...  
    var sections = [];
    h1s = content.find('h1');	    
    h1s.each( function(h1){
    	var el_id = $(this).attr('id'); //get its id		    
    	var h1_next = $(this).nextUntil('h1'); //els from h1 to next h1
    	h1_next = h1_next.add($(this)); //include h1
    	sections.push(h1_next);
    });    
    $('div#content').text('');
    var sections_length = sections.length;
    for (var i=0; i < sections_length; i++) {   
	$('div#content').append('<div class="section" id="section_'+i +'" ></div>');
	$('div#section_'+i).append( sections[i] );
    }    
    return [sections, h1s]
}

function generate_toc(headings){
    var menu = '' // start w/ empty menu
    headings.each( function(h){ //for each heading
	var el_id = $(this).attr('id'); //get its id
	var el_text = $(this).text(); //get its text
	var menu_item = '<li><a href="#' + el_id + '">' + el_text + '</a></li>' //build a <li> with <a> pointing to each <h1> in text 
	menu = menu + menu_item;
    });	
    menu = '<ul>'+menu+'</ul>'; //wrap all <li>s inside <ul> </ul>
    $('div#content').html(menu); //insert menu before div#content
    return menu
}


$(document).ready(
    function(){
	// can content not be loaded into the DOM
	// but to a variable that can be parsed?
	$.get('./content.html', function(content){
	    html = $.parseHTML( content );
	    $('div#content').append( content );
	    var sections_h1s= create_sections( $('div#content') );
	    var sections = sections_h1s[0];
	    var h1s = sections_h1s[1];
	    console.log( sections, h1s  );
	    var menu = generate_toc(h1s); //create menu by running generate_toc(all_h1s) 
	} , 'html' )
	
    }
)
