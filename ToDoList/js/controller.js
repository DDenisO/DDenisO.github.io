define(
       'controller',
    ['jquery'],function(){
    return {  controller: controller = function (model, view){
                    var self = this;
                    view.elements.input.keyup(function(event) {
                                if(event.keyCode==13) {
                                    addItem();
                                   }  
                           });
                           
                    view.elements.listContainer.on('click', '.list-tmpl__item-delete', removeItem);
                    view.elements.listContainer.on('dblclick', '.list-tmpl__item-label', editItem);
                    function addItem(){
                        var newItem = view.elements.input.val();
                        model.addItem(newItem);
                        view.renderList(model.data);
                        view.elements.input.val('');
                    }
                    function removeItem(){
                        var item = $(this).attr('data-value');
                        model.removeItem(item);
                        view.renderList(model.data);
                    }
                    function editItem () {
                         if(!$('.list-tmpl__item-edit').is( ":focus" )){ $('.list-tmpl__item').removeClass('editing'); }
                           var i;
                          document.addEventListener('dblclick', function(event){
                            if(event.target.tagName !== 'LABEL') return false;
                             i=event.target.id;
                          $('.list-tmpl__item[id='+i+']').addClass('editing'); 
                          
                          $('.list-tmpl__item-edit[id='+i+']').val( $('.list-tmpl__item-label[id='+i+']').text()).focus();
                          $('.list-tmpl__item-label[id='+i+']').hide();
                          $('.list-tmpl__item-label:not([id='+i+'])').show();
                            $('.list-tmpl__item-edit[id='+i+']').keyup(function(event) {
                                if(event.keyCode==13) { 
                                  var renewItem = $('.list-tmpl__item-edit[id='+i+']').val();
                                 var empty =renewItem.replace(/\s+/g,'');
                                  if(empty == ''){
                                      $('.list-tmpl__item[id='+i+']').remove();
                                  }
                            $('.list-tmpl__item-label[id='+i+']').text(renewItem);  
                             $('.list-tmpl__item-label[id='+i+']').show();
                              $('.list-tmpl__item[id='+i+']').removeClass('editing'); 
                                   }  
                           });
                           });
                    }
                }
};
});