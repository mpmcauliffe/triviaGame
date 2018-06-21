
$(document).ready(() => {
    let dataController = (() => {

        return {
            creatObject: function() {
                dataQuestions = [
                    {
                        question: "What is the largest bear on earth?",
                        choices:["Brown Bear","Polar Bear","Grizzly Bear","Spectacled Bear"],
                        answer: 1
                    },
                    {
                        question: "This bear comes in a variety of colors",
                        choices: ["Polar Bear", "Spectacled Bear", "Black Bear", "Prism Bear"],
                        answer: 2
                    },
                    {
                        question: "What region are Polar Bears NOT found?",
                        choices: ["Beaufort Sea","Hudson Bay","Baffin Bay","Ice Land"],
                        answer: 3
                    },
                    {
                        question: "What bear species can be found on 3 continents?",
                        choices: ["Black Bear","Moon Bear","Brown Bear","Sloth Bear"],
                        answer: 2
                    },
                    {
                        question: "The grizzly bear is a sub species of which bear?",
                        choices: ["Polar Bear","Brown Bear","Grisly Bear","Giant Panda"],
                        answer: 1
                    },
                    {
                        question: "In what month are bear cubs born?",
                        choices: ["December","January","February","March"],
                        answer: 1
                    },
                    {                               
                        question: "This Asian bear sometimes fights tigers to protect its young.",
                        choices: ["Moon Bear", "Sun Bear", "Brown Bear", "Sloth Bear"],
                        answer: 3
                    },
                    {
                        question: "This person established relationsips with grizzly bears.", //
                        choices: ["Kurt Russell","Charlie Russell","Charlie Rose","Jeff Bridges"],
                        answer: 1
                    },
                    {
                        question: "This is the only bear that lives in the southern hemisphere?",
                        choices: ["Spectacled Bear", "Polar Bear", "Sloth Bear", "Sun Bear"],
                        answer: 0               
                    },
                    {
                        question: "This rare brown bear lives on the Iberian peninsula",
                        choices: ["Kodiak Bear","Marsican Bear","Pyrenees Bear","Carpathian Bear"],
                        answer: 2
                    },
                    {
                        question: "How many bear species exists in the world today?",
                        choices: ["8","6","5","10"],
                        answer: 0
                    }
                ]
                // console.log(dataQuestions.length)
                return dataQuestions;
            }
        }
    })();

    let UIcontroller = (() => {
        return {
            updateButtons: function(choiceArr) {
                $(".reset").hide();
                $("form").fadeTo(1000, 1);
                //$(".gif").fadeTo(1000, .001);
    
                for (i = 0; i < $("input").length; i++) {
                    // console.log(choiceArr[i]);
                    $("input").eq(i).val(choiceArr[i]);
                }
            },
            loadQuestion: function(question) {
                $(".question").text(question);
            },
            updateNumber: function(num) {
                $(".number").text(num);
            },
            showResult: function(code, answer) {

                $("form").fadeTo(1000, 0).hide();
                setTimeout(() => {
                    $("form").hide();
                }, 1000);
                let toggleTxt = $(".toggle-result");
                
                if(code === 0) {
                    setTimeout(() => {
                        toggleTxt.fadeTo(1000, 1);
                        toggleTxt.html(`Incorrect...the correct answer was ${"<br>"} ${answer}`);
                        toggleTxt.css("color", "#ff3434",
                            "font-size", "2rem");
                    }, 1200);
                } else if (code === 1) {
                    setTimeout(() => {
                        toggleTxt.fadeTo(1000, 1);
                        toggleTxt.html(`${answer} is correct!!!`);
                        toggleTxt.css("color", "#34aa53",
                            "font-size", "2rem");
                        
                    }, 1200);
                } else {
                    setTimeout(() => {
                        toggleTxt.fadeTo(1000, 1);
                        toggleTxt.html(`Time's up...the correct answer was ${"<br>"} ${answer}`);
                        toggleTxt.css("color", "#ff3434",
                            "font-size", "2rem");
                    }, 1200);
                }
                setTimeout(() => {
                    toggleTxt.fadeTo(1000, 0);
                    setTimeout(() => {
                        toggleTxt.hide();
                    }, 1000);
                }, 3800);
            },
            finalResult: function (score, incorrect, out) {
                $(".reset").fadeTo(1000, 1).text("Reset Game");

                let toggleTxt = $(".toggle-result");
                toggleTxt.fadeTo(1000, 1);
                setTimeout(() => {
                    toggleTxt.fadeTo(1000, 1);
                    toggleTxt.html(`You got${"<br>"}${score} correct${"<br>"}${incorrect} incorrect${"<br>"} ${out} unanswered`);
                    toggleTxt.css("color", "#3454ff",
                        "font-size", "2rem",
                        "text-align", "left");
                }, 1200);
            },
            reset: function () {
                $(".toggle-result").fadeTo(1000, 0);
                $(".reset").fadeTo(1000, 0);
            },
            stageGif: function (url) {
                // $(".gif").fadeTo(1000, 1);
                // $.ajax({
                //   url: url,
                //   method: "GET"  
                // })
                // .then(function (response) {
                //     var imageUrl = response.data.image_original_url;
                //     $(".gif").css("background-image", imageUrl);            
                // });
            }
        }
    })();

    let mainController = ((dataCon, UIcon) => {

        let cursor, score, out, wrong, questions, queryURL;

        let setup = () => {
            gameObject = dataCon.creatObject();
            //console.log(gameObject);
            cursor = 0;
            score = 0;
            out = 0;
            wrong = 0;
            questions = 11;
            queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=bears";
        }

        let uiInitiate = (cursor) => {
            UIcon.updateButtons(gameObject[cursor].choices);
            UIcon.loadQuestion(gameObject[cursor].question);
            UIcon.updateNumber(questions);
            
            timer.set();  
            console.log(`Answer ${gameObject[cursor].choices[gameObject[cursor].answer]}`);
        }

        
        //eq($("input").index(this)).val();
        $(".btn").on("click", function() {
            let result = $("input").eq($("input").index(this)).val();
            //console.log($("input").index(this))
            checkAnswer(result);
        });
        $(".reset").on("click", function() {
            UIcon.reset();
            setTimeout(() => {
                mainController.initialize();
            }, 1000);
        });
        let checkAnswer = (result) => {
            if (result !== -1) {
                if (result == gameObject[cursor].choices[gameObject[cursor].answer]){
                    score++;
                    UIcontroller.showResult(1, result);
                    UIcontroller.stageGif(queryURL)
                } else {
                    UIcontroller.showResult(0, gameObject[cursor].choices[gameObject[cursor].answer]);
                    wrong++;
                }
            } else {
                UIcontroller.showResult(-1, gameObject[cursor].choices[gameObject[cursor].answer]);
            }
            cursor++;
            timer.stop();
            cursor == gameObject.length ? finalResult() : nextQuestion();    
        }
        
        let nextQuestion = () => {
            setTimeout(() => {
                questions--;
                uiInitiate(cursor);
            }, 4000);
        }

        let finalResult = () => {
            setTimeout(() => {
                UIcon.finalResult(score, wrong, out);
            }, 4000);
        }
    
        let timer = {
            time: 0,
        
            set: function () {
                counter = setInterval(timer.count, 1000);
                $('#countdown').text('20');
                $('#countdown').css("color", "#50aa3b")
                timer.time = 20;
            },
            stop: function () {
                clearInterval(counter);
            },
            count: function () {
                if (timer.time < 1) {
                    out++;
                    timer.stop();
                    checkAnswer(-1);
                } else {
                    timer.time--;
                    var convert = timer.timeConverter(timer.time);
                    $('#countdown').text(convert);
                    //console.log(convert);
                }
                if (timer.time < 6) {
                    $('#countdown').css("color","#ff5656");
                }
            },
            timeConverter: function (t) {
                let seconds = t;
                if (seconds < 10) {
                    seconds = "0" + seconds;
                }
                return seconds;
            }
        }

        return {
            initialize: function() {
                setup(); 
                uiInitiate(0);        
            }
        }
    })(dataController, UIcontroller);


    document.querySelector(".cover-btn").addEventListener("click", () => {
        let screenDOM = document.querySelector(`.cover`);
        screenDOM.style.animation = `1.5s fadeout .5s forwards`;
        setTimeout(() => {
            screenDOM.style.display = `none`;
            mainController.initialize();
        }, 1000);
    }, { once: true });
});