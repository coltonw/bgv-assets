'use strict';

(function ($) {
    var startRow = '<div class="row new" style="display: none"><ul class="tieable"></ul></div>';
    var endRow = '<div class="row new" style="display: none"><ul class="tieable"></ul></div>';
    $.fn.tieable = function (options) {
        var sortable, onSortUpdate;
        this.closest('.row').before(startRow).after(endRow).siblings().show().removeClass('new');
        sortable = this.sortable.apply($(this.selector), arguments);
        
        onSortUpdate = function(e, ui) {
            var reload = false, sortable;
            /*

            This event is triggered when the user stopped sorting and the DOM position has changed.

            ui.item contains the current dragged element.
            ui.item.index() contains the new index of the dragged element
            ui.oldindex contains the old index of the dragged element
            ui.startparent contains the element that the dragged item comes from
            ui.endparent contains the element that the dragged item was added to

            */
            // If the start is now empty, remove that row
            if($(ui.startparent).children().length === 0) {
                $(ui.startparent).closest('.row').hide('fast', function(){ $(ui.startparent).closest('.row').remove(); })
                //$(ui.startparent).closest('.row').remove();
                reload = true;
            }
            
            // If you filled the first row, add a new first row
            if($('.tieable').index(ui.endparent) === 0) {
                $(ui.endparent).closest('.row').before(startRow);
                $(ui.endparent).closest('.row').siblings().show('fast');
                reload = true;
            }
            
            if($('.tieable').index(ui.endparent) >= $('.tieable').length - 1) {
                $(ui.endparent).closest('.row').after(endRow);
                $(ui.endparent).closest('.row').siblings().show('fast');
                reload = true;
            }
            
            if(reload) {
                $('.tieable').off('sortupdate.tie')
                sortable = $('.tieable').sortable($.extend({
                    method: 'reload'
                }, options));
                sortable.bind('sortupdate.tie', onSortUpdate);
            }
        };
        
        sortable.bind('sortupdate.tie', onSortUpdate);
        return sortable;
    };
})($);