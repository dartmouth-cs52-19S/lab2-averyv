
$.getJSON("data.json",function(data) {
    /* Looked at https://api.jquery.com/jquery.getjson/ for the below code, which reads data in from a .json file and appends it to an HTML
    structure*/
    $("<img src='"+data.quiz_header_image+"'/><h1>"+data.quiz_header_text+"</h1>").appendTo("header");
    var questions = [];
    for (var i=0; i< data.questions.length; i++) {
        var question = data.questions[i];
        var question_header = question.question_title;
        questions.push("<div class='question-container'><div class='question-header'><img src='"+question.question_image_url+"'/><h2>"+question_header+"</h2></div><div class='answer-container'>");
        question_name = question.question_name;
        var answers = question.answers;
        
        for (var j=0; j<answers.length;j++) {
            var answer=answers[j];
            if (j===0) {
                questions.push("<div class='row'>")
            } 
            if (j==3) {
                questions.push("</div><div class='row'>")
            }
            question_value = answer.answer_value;
            if (question.type == "image-only") {
                question_image = answers[j].answer_image_url;
                questions.push("<label class='image-label'> <input type='radio' name='"+question_name+"' value='"+question_value+"'>");
                questions.push("<img src='"+question_image+"'/> </label>");
            } else if (question.type=="text-only") {
                question_text = answers[j].text;
                questions.push("<label class='text-label'> <input type='radio' name='"+question_name+"' value='"+question_value+"'>");
                questions.push("<p>"+question_text+"</p> </label>");
            }
        }
        questions.push("</div></div></div>");
    }
    var outcomes = [];
    
    for (var i = 0; i<data.outcomes.length; i++) {
        var outcome = data.outcomes[i];
        outcome_id = outcome.outcome_id;
        outcome_image = outcome.outcome_image;
        outcome_text = outcome.text;
        outcomes.push("<div class='modal-option' id='"+outcome_id+"-modal'> <p class='modal-text'>"+outcome_text+"</p><img class='modal-gif' src='"+outcome_image+"'/></div>");
    }
    
    $(questions.join("")).appendTo(".all-question-container");
    $("<button type='button' id='submit-button'>"+ data.submit_button_text+"</button>").appendTo(".button-container");
    $(outcomes.join(" ")).appendTo("#modal-content");

    image_names = [];
    text_names = [];
    for (var i=0; i<data.questions.length; i++) {
        var question=data.questions[i];
        if (question.type == "image-only") {
           image_names.push(question.question_name);
        } else if (question.type == "text-only") {
            text_names.push(question.question_name);
        }
    }
    $.each(image_names,function(index,value) {
        $("input[name='"+value+"']").change(function () {
            $("input[name='"+value+"']:checked+img").css({
                "opacity":"1",
                "transform":"scale(1.1,1.1)"
            });
            $("input[name='"+value+"']:not(:checked)+img").css({
                "opacity":".5",
                "transform":"scale(1,1)"
            });
        });
    });
    $.each(text_names,function(index,value) {
        $("input[name='"+value+"']").change(function () {
            $("input[name='"+value+"']:checked+p").css({
                /*Text shadow inspired by https://www.codesdope.com/blog/article/adding-outline-to-text-using-css/ */
                "text-shadow":"-2px 2px 0 red",
                "font-size":"1.5rem"
            
            });
            $("input[name='"+value+"']:not(:checked)+p").css({
                "text-shadow":"none",
                "font-size":"1em"
            });
        });
    });
  
    /* Inspired by https://www.w3schools.com/howto/howto_css_modals.asp
    This method creates a modal using CSS and JavaScript.
    */
    $('#submit-button').on('click', function(e) {
        
        var choices = $("input[type=radio]:checked").map(function(i,radio) {
            return $(radio).val();
        }).toArray();
    
        
        var outcome_modals = [];
        var values= [];
    
        for (var i = 0; i<data.outcomes.length;i++) {
            var outcome=data.outcomes[i];
            outcome_id = outcome.outcome_id;
            if (outcome.type == "outcome") {
                outcome_modals.push("#" + outcome_id+"-modal");
                values.push(outcome_id);
            } 
        }
        /*Scoring process nspired by https://codeactually.com/examples.html
        This method links each answer to a specific episode, and then shows the user which
        the most common answer.*/
        if (choices.length == data.questions.length) {
            $("#error-modal").hide();
            var weights = new Array(values.length).fill(0);
            
            for (var i=0; i<choices.length;i++) {
                for (var j=0; j<values.length; j++) {
                    if (choices[i] === values[j]) {weights[j] = weights[j] + 1};
                }
            }

            var find_max = Math.max.apply(Math, weights);
            for (i = 0; i<weights.length; i++) {
                if(weights[i] == find_max) {
                    highest = i;
                }
            }
            for (i=0; i<outcome_modals.length;i++) {
                $(".modal").css("display","flex");
                $(".flex-container").css("opacity",".5");
                $("#reset").css("display","flex");
                if (i == highest) {
                    $(outcome_modals[i]).css("display","flex"); 
                } else {
                    $(outcome_modals[i]).hide();
                }  
            }
        } else {
            $(".modal").css("display","flex");
            $(".flex-container").css("opacity",".5");
            $("#error-modal").css("display","flex");
            for (i =0;i<outcome_modals.length;i++) {
                $(outcome_modals[i]).hide();
            }
        }
    });
});

$("#close-modal").click(function() {
    $(".modal").hide();
    $(".flex-container").css("opacity","1"); 
});

$("#reset").click(function() {
    $(".modal").hide();
    $(".flex-container").css("opacity","1");
    location.reload();
});