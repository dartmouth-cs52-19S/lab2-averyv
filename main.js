$('#submit-button').on('click', function(e) {
    var choices = $("input[type=radio]:checked").map(function(i,radio) {
        return $(radio).val();
    }).toArray();
    
    /*Inspired by https://codeactually.com/examples.html
    This method links each answer to a specific episode, and then shows the user which
    the most common answer.*/
    modals = ["#dinner-party-modal","#niagara-modal","#stress-relief-modal","#the-injury-modal","#goodbye-michael-modal","#money-modal"]

    if (choices.length == 5) {
        $("#error-modal").hide();
        var weights = [0,0,0,0,0,0]
        
        for (i=0; i<choices.length;i++) {
            if(choices[i]==="dinner-party") {weights[0] = weights[0] + 1}
            if(choices[i]==="niagara") {weights[1] = weights[1] + 1}
            if(choices[i]==="stress-relief") {weights[2] = weights[2] + 1}
            if(choices[i]==="injury") {weights[3] = weights[3] + 1}
            if(choices[i]==="goodbye-michael") {weights[4] = weights[4] + 1}
            if(choices[i]==="money") {weights[5] = weights[5] + 1}
        } 
        
        var find_max = Math.max.apply(Math, weights);
        for (i = 0; i<weights.length; i++) {
            if(weights[i] == find_max) {
                highest = i;
            }
        }
        
        for (i=0; i<modals.length;i++) {
            if (i == highest) {
                $(modals[i]).show(); 
            } else {
                $(modals[i]).hide();
            }  
        }
    } else {
        $("#error-modal").show();
        for (i =0;i<modals.length;i++) {
            $(modals[i]).hide();
        }
    }
});

/* Inspired by https://www.w3schools.com/howto/howto_css_modals.asp
This method creates a modal using CSS and JavaScript.
*/
var screen = document.getElementById('full-screen');
var modal = document.getElementById('response-modal');
var btn = document.getElementById('submit-button');
btn.onclick = function() {
    modal.style.display = "flex";
    screen.style.opacity = ".5";
    $("body").css("background-color","#ffd699");
}

window.onclick = function(event) {
    if (event.target==modal) {
        $(".modal").hide();
        screen.style.opacity = "1";
        $("body").css("background-color","blanchedalmond");
    }
}

$('input[name="current-emotion"]').change(function() {
    $('input[name="current-emotion"]:checked+img').css({
        "opacity":"1"
    });
    $('input[name="current-emotion"]:not(:checked)+img').css({
        "opacity":".5"
    })
});

$('input[name="favorite-character"]').change(function() {
    $('input[name="favorite-character"]:checked+p').css({
        "color":"white",
        "font-size":"20px",
        "opacity":"1"
    });
    $('input[name="favorite-character"]:not(:checked)+p').css({
        "color":"rgb(242, 244, 247)",
        "font-size":"inherit",
        "opacity":".5"
    })
});

$('input[name="random-object"]').change(function() {
    $('input[name="random-object"]:checked+img').css({
        "opacity":"1"
    });
    $('input[name="random-object"]:not(:checked)+img').css({
        "opacity":".5"
    })
});

$('input[name="random-place"]').change(function() {
    $('input[name="random-place"]:checked+img').css({
        "opacity":"1"
    });
    $('input[name="random-place"]:not(:checked)+img').css({
        "opacity":".5"
    })
});

$('input[name="random-object-2"]').change(function() {
    $('input[name="random-object-2"]:checked+img').css({
        "opacity":"1"
    });
    $('input[name="random-object-2"]:not(:checked)+img').css({
        "opacity":".5"
    })
});