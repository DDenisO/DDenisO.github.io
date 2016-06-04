$(function() {
 'use strict';
var testObj = {
      name: 'Тест по программированию!', 
      elemDivLeft: document.createElement('div'),
      elemDivWrapper: document.createElement('div'),
      elemScriptTmpl: document.createElement('script'),
      elemDivRight: document.createElement('div'),
      elemH1: document.createElement('h3'),
      elemForm: document.createElement('form'),
      elemOl: document.createElement('ol'),
      elemP: document.createElement ('p'),
      elemButtonSubmit: document.createElement('input'),

    divLeft: function(){
        this.elemDivLeft.classList.add('aside_left');
        this.elemDivLeft.classList.add('col-md-3');
        document.body.insertBefore(this.elemDivLeft, document.body.childNodes[0]);
    },
    
    divCenter: function(){
        this.elemDivWrapper.classList.add('content_wrapper');
        this.elemDivWrapper.classList.add('col-md-6');
        document.body.insertBefore(this.elemDivWrapper, document.body.childNodes[1]);
    },
       
    divRight: function(){
        this.elemDivRight.classList.add('aside_right');
        this.elemDivRight.classList.add('col-md-3');
        document.body.insertBefore(this.elemDivRight, document.body.childNodes[2]);
    },
    
    script_tmpl: function() {
        this.elemScriptTmpl.setAttribute('type','text/template');
        this.elemScriptTmpl.id = 'my_tmpl';
        this.elemDivWrapper.appendChild(this.elemScriptTmpl);
    },
    
    nameTest: function() {
        this.elemH1.classList.add('h3');
        this.elemH1.classList.add('text-center');
        this.elemH1.innerHTML = this.name;
        this.elemScriptTmpl.appendChild(this.elemH1);
    },
    
    form: function(){
        this.elemForm.setAttribute('action','action.php');
        this.elemForm.setAttribute('method','POST');
        this.elemForm.classList.add('test');
        this.elemScriptTmpl.appendChild(this.elemForm);
    },
    
    ol: function(){
       this.elemOl.classList.add('list-questions');
       this.elemForm.appendChild(this.elemOl); 
    },
    
    QuesAndAnswers: function(){
        
        for ( var i = 0, questions = 3, countQ = 1, elemLi=[]; i < questions; i++, countQ++){
            elemLi[i] = document.createElement('li');
            elemLi[i].classList.add('question_' + countQ);
            elemLi[i].innerHTML = '<strong>#=question' + countQ +'.question#</strong></br>';
            this.elemOl.appendChild(elemLi[i]);
                for ( var j = 0, answers = 3, countA = 1, elemInput=[], elemLabel=[], elemDiv=[]; j < answers; j++, countA++){
                    elemDiv[j] = document.createElement('div');
                    elemDiv[j].classList.add('radio');
                    elemLi[i].appendChild(elemDiv[j]);
                    elemLabel[j] = document.createElement('label');
                    elemLabel[j].setAttribute ('for', 'answer_'+ countQ + countA);
                    elemInput[j] = document.createElement('input');
                    elemDiv[j].appendChild(elemLabel[j]);
                    elemLabel[j].innerHTML = '#=question' + countQ +'.answer' + countA + '#';
                    elemInput[j].classList.add('input');
                    elemInput[j].setAttribute('type','radio');
                    elemInput[j].setAttribute('name','question' + countQ );
                    elemInput[j].setAttribute('value','answer' + countA );
                    elemInput[j].setAttribute('id','answer_'+ countQ + countA);
                    elemLabel[j].insertBefore(elemInput[j], elemLabel[j].childNodes[0]);
                } 
            }
    },
    p: function(){
        this.elemP.classList.add('text-center');
        this.elemForm.appendChild(this.elemP);
    },
    button_submit: function(){
        this.elemButtonSubmit.setAttribute('id','button-result');
        this.elemButtonSubmit.classList.add('btn');
        this.elemButtonSubmit.classList.add('btn-success');
        this.elemButtonSubmit.setAttribute('type','button');
        this.elemButtonSubmit.setAttribute('data-toggle','modal');
        this.elemButtonSubmit.setAttribute('data-target','.bs-example-modal-sm'); 
        this.elemButtonSubmit.setAttribute('value','Проверить мои результаты');
        this.elemP.appendChild(this.elemButtonSubmit);

    },
    allCall:function() {
        this.divLeft();
        this.divCenter();
        this.script_tmpl();
        this.divRight();
        this.nameTest();
        this.form();
        this.ol();
        this.QuesAndAnswers();
        this.p();
        this.button_submit();

    }

};
    testObj.allCall();
});



