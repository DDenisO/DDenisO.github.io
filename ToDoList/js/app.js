require.config({
    paths: {
        'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery',
    },
    shim: {
        'jquery': {
            exports: 'jQuery',
        }
    }
});

require(
    [
    'model',
    'view',
    'controller',
    'jquery'
    ],
    function (model, view, controller,  $) {
        var firstToDoList = ['Learn','Learn','Work'];
        var modelObj = new model.model(firstToDoList);
        var viewObj = new view.view(modelObj);
        var controllerObj = new controller.controller(modelObj, viewObj);
     });
       
