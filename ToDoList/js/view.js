define(
     'view',
   [ 'jquery'],function(){
     return {       view: view = function (model){
                      var self = this;
                     function init () {
                        var html = $('#frame-tmpl').html();
                        var wrapper = tmpl(html);
                         $('body').append(wrapper);
                        self.elements = {
                          input: $('.frame-tmpl__header-item-values'),
                          listContainer: $('.frame-tmpl__item-list'),
                        };
                        self.renderList(model.data);
                      };
                      self.renderList = function(data){
                       var list  = tmpl($('#frame-tmpl__list-tmpl').html(), {data: data});
                       self.elements.listContainer.html(list);
                      };
                          init();
                    }
            };

});