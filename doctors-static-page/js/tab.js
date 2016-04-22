$(function() {
    (function() {
        $('#tabNav > li > a').attr('class', '');
        $('#tabNav > li:first > a').attr('class', 'current');
        $('#tabContent > div').hide();
        $('#tabContent > div:first').fadeIn();

        $('#tabNav > li > a').on('click', function(e) {
            e.preventDefault();
            if ($(this).attr('class') == 'current') {
                return
            } else {
                $('#tabNav > li > a').attr('class', '');
                $('#tabContent > div').hide();
                $(this).attr('class', 'current');
                $($(this).attr('name')).fadeIn()
            }
        })
    })();
})