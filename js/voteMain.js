// index.dust main js
$(document).ready(function() {
    $('.tieable').rankem({
        ties: true
    });

    $('form').submit(function(event) {
        var li, tier, vote = [], reqData = {}, action = '/api/vote';
        event.preventDefault();

        $('.tieable .kem-rank').each(function(i, list) {
            li = $(list).children();
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
