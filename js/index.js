/*
* Tim Hass, Zakir Butte, Daniel Heyward
*/

var score = 0;
var count = 0;
var qArray = [];
var qAnswers = [];
var qTitle = $('#questionbox');
var qOptions = $('#questionform');
var aCorrect = [];
var aIncorrect = [];
var random = Math.floor(Math.random() * 5);
var aSelect = function() {
  $('input[type=radio]').change(function(){
    $('input[type=radio]').addClass('selDone');
  });
};



var displayQuestion = function() {
  qTitle.html(qArray[count].question);
  qAnswers = [];
  aCorrect = qArray[count].correct_answer; //String
  qAnswers = qArray[count].incorrect_answers; //Array
  qAnswers.splice(random, 0, aCorrect);
  for (i = 0; i < qAnswers.length; i++) {
    qOptions.append("<p class='left-align' id='q" + i + "'><input class='with-gap' type='radio' name='answer' id='" + i
    + "' value='" + qAnswers[i] + "' />" + "<label for='" + i + "' class='answers'>"
    + qAnswers[i] + "</label></p>");
  };
  aSelect();
};

var checkForEnd = function() {
  if (count >= qArray.length) {
    $('.container').toggleClass('hide');
    $('.scorebox').toggleClass('hide').html('<span class="white-text">Score: ' + score + "</span>");
  }
};


var addScore = function() {
  var correct = qArray[count].correct_answer;
  var incorrect = qArray[count].incorrect_answers;

  for (i=0; i < qArray.length; i++) {
    if ($('#' + i).val() === correct && $('#' + i).is(':checked')) {
      score++
    }
  };
  count++
  checkForEnd();
};


var nextQuestion = function() {
  if ($('.selDone').length > 0) {
    addScore();
    random = Math.floor(Math.random() * 5);
    $('input').remove();
    $('.answers').remove();
    displayQuestion();
  };
};

var getQuestions = function() {
  $.get('https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple').done(function(data) {
    qArray = data.results;
    displayQuestion();
    $('.btn').on('click', nextQuestion);
});
};

$(document).ready(function() {
  getQuestions();


});
