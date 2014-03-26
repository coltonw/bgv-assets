(function ($) {
    'use strict';
    var betweenRow = '<div class="row" style="display: none"><ul class="tieable"></ul></div>';
    $.fn.tieable = function (options) {
        var sortable, onSortUpdate;
        this.closest('.row').before(betweenRow).after(betweenRow).siblings().show();
        $('ul.tieable').removeClass('first last').first().addClass('first').end().last().addClass('last');
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
            // If the start is now empty, remove that row and one of the adjacent between rows
            if($(ui.startparent).children().length === 0) {
                // This looks at both the next and previous between row and gets the first empty one to hide
                $(ui.startparent).closest('.row').next().not(':has(li)').add($(ui.startparent).closest('.row').prev().not(':has(li)')).first().addClass('hiding').hide('fast', function(){ $(this).remove(); });
                $(ui.startparent).closest('.row').addClass('hiding').hide('fast', function(){ $(this).remove(); });
                reload = true;
            }
            
            // If you added to a previously empty row, add the new between rows for that.
            if($(ui.endparent).children().length === 1 && !$(ui.endparent).is(ui.startparent)) {
                $(ui.endparent).closest('.row').before(betweenRow);
                $(ui.endparent).closest('.row').after(betweenRow);
                $(ui.endparent).closest('.row').siblings().not('.hiding').show('fast');
                reload = true;
            }

            if(reload) {
                $('ul.tieable').removeClass('first last').not('.hiding ul').first().addClass('first').end().last().addClass('last');
                $('.row').removeClass('vote').has('ul li').first().addClass('vote');
                $('.tieable').off('sortupdate.tie');
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