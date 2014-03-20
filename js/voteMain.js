// index.dust main js
$(document).ready(function() {
    $('.tieable').tieable({
        connectWith: '.tieable',
        placeholder: '<li class="col-sm-2 sortable-placeholder">'
    });
    
    $('form').submit(function(event) {
        var li, tier, vote = [], reqData = {}, action = 'vote';
        event.preventDefault();
        
        $('.tieable').each(function(i, list) {
            li = $(list).children();
            console.log
            if(li.length > 0) {
                tier = [];
                li.each(function(i, el){
                    var tmpId = $(el).attr('id');
                    if(tmpId && tmpId !== '') {
                        tier.push(tmpId);
                    }
                });
                vote.push(tier);
            }
        });
        console.log(vote);
        reqData.vote = vote;
        reqData.nickname = $('#inputNickname').val();
        reqData.ballot = $('[name=ballot]').val();
        action = $('[name=action]').val();
        if(!reqData.nickname || reqData.nickname === '') {
            alert("Don't forget to add a nickname!");
            return;
        }
        $.ajax({
            type: "POST",
            url: action,
            data: reqData,
            dataType: "json",
            success: function(data, textStatus) {
                if (data.redirect) {
                    // data.redirect contains the string URL to redirect to
                    window.location.href = data.redirect;
                }
            }
        });
    });
});