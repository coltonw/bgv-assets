// ballot.dust main js
$(document).ready(function() {
    
    $('form').submit(function(event) {
        var id, ballot = [], reqData = {}, action = '/api/ballot';
        event.preventDefault();
        
        $(':checked').each(function(i, checkbox) {
            id = $(checkbox).attr('id');
            ballot.push({
                id: id,
                name: $('#' + id + '-name').val(),
                thumbnail: $('#' + id + '-thumbnail').val(),
            });
        });
        console.log(ballot);
        reqData.ballot = ballot;
        action = $('[name=action]').val();
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